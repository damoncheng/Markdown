package etcd

import (
	//"errors"
	"fmt"
	"io/ioutil"
	"log"
	"time"

	"crypto/tls"
	"crypto/x509"

	"context"
	"go.etcd.io/etcd/clientv3"
)

type mmpaytestEtc struct {
	cli *clientv3.Client
	err error
}

func (m *mmpaytestEtc) initComplete(err *error) {
	m.err = *err
	fmt.Println("init complete err : ", m.err)
}

func (m *mmpaytestEtc) init() {

	fmt.Println("start init...")
	var etcdCert = "/Users/hongxi/vboxShare/certs//etcd/healthcheck-client.crt"
	var etcdCertKey = "/Users/hongxi/vboxShare/certs/etcd/healthcheck-client.key"
	var etcdCa = "/Users/hongxi/vboxShare/certs/etcd/ca.crt"

	fmt.Println("prepare tls data...")

	var err error

	defer m.initComplete(&err)

	cert, err := tls.LoadX509KeyPair(etcdCert, etcdCertKey)

	if err != nil {
		return
	}

	caData, err := ioutil.ReadFile(etcdCa)
	if err != nil {
		return
	}

	pool := x509.NewCertPool()
	pool.AppendCertsFromPEM(caData)

	_tlsConfig := &tls.Config{
		Certificates: []tls.Certificate{cert},
		RootCAs:      pool,
	}

	m.cli, err = clientv3.New(clientv3.Config{
		Endpoints:   []string{"192.168.64.2:2379", "192.168.64.2:22379", "192.168.64.2:32379"},
		DialTimeout: 5 * time.Second,
		TLS:         _tlsConfig,
	})
	if err != nil {
		// handle error!
		log.Println(err)
		return
	}

	//testerr = errors.New("test")
	//defer cli.Close()

}

func (m mmpaytestEtc) get(key string) map[interface{}]interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	resp, err := m.cli.Get(ctx, key)
	if err != nil {
		// handle error!
		log.Println(err)
	}
	cancel()

	temp := make(map[interface{}]interface{})

	for _, ev := range resp.Kvs {
		temp[string(ev.Key)] = string(ev.Value)
		fmt.Printf("%s : %s\n", ev.Key, ev.Value)
	}

	return temp
}

func (m mmpaytestEtc) put(key string, value string) map[interface{}]interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	_, err := m.cli.Put(ctx, key, value)
	if err != nil {
		// handle error!
		log.Println(err)
	}
	cancel()

	return m.get(key)
}

func (m mmpaytestEtc) watch(key string, msg chan<- map[string]string) {

	rch := m.cli.Watch(context.Background(), key)
	for wresp := range rch {
		for _, ev := range wresp.Events {
			msg <- map[string]string{"type": string(ev.Type), "key": string(ev.Kv.Key), "value": string(ev.Kv.Value)}
			//msg <- fmt.Sprintf("%s %q : %q\n", ev.Type, ev.Kv.Key, ev.Kv.Value)
		}
	}

}
