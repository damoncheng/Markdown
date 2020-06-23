package etcd

import (
	"fmt"
	"log"
	//"strings"
	"testing"
	"time"
)

func DeltaSeconds(before string, now string) float64 {

	var timeLayoutStr = "2006-01-02 15:04:05"

	beforeTime, _ := time.ParseInLocation(timeLayoutStr, before, time.Local)
	nowTime, _ := time.ParseInLocation(timeLayoutStr, now, time.Local)
	fmt.Println("before Time : ", beforeTime)
	fmt.Println("now Time : ", nowTime)
	return nowTime.Sub(beforeTime).Seconds()

}

func TestEtcdOperator(t *testing.T) {

	h := mmpaytestEtc{nil, nil}
	h.init()

	if h.err != nil {

		fmt.Println(h.err)
		return
	}

	key := "foo"
	m := h.get(key)
	log.Println(m[key])

	nowTime := time.Now()

	msg := nowTime.Format("2006-01-02 15:04:05")
	m = h.put(key, msg)

	if m[key] != msg {
		t.Errorf("got %s, want %s", m[key], msg)
	} else {
		log.Println(m[key])
	}

}

func TestEtcdWatch(t *testing.T) {

	h := mmpaytestEtc{nil, nil}
	h.init()

	if h.err != nil {

		fmt.Println(h.err)
		return
	}

	key := "foo"
	m := h.get(key)

	lastDate := m[key].(string)
	msg := make(chan map[string]string)

	go func(msg <-chan map[string]string) {
		for {
			record := <-msg

			/*
				allArr := strings.Split(str, ":")
				etcdHead := allArr[0]
				etcdValue := strings.Join(allArr[1:], ":")

				keyArr := strings.Split(etcdHead, " ")
				etcdType := keyArr[0]
				etcdKey := keyArr[1]
				fmt.Println("etcdType : ", etcdType)
				fmt.Println("etcdKey : ", etcdKey)
				fmt.Println("etcdValue : ", etcdValue)

				fmt.Println("lastDate : ", lastDate)
				etcdValue = strings.ReplaceAll(etcdValue, "\"", "")
				etcdValue = strings.TrimSpace(etcdValue)
				fmt.Println("etcdValue : ", etcdValue)
			*/

			etcdValue := record["value"]

			fmt.Println("Date : ", etcdValue)
			fmt.Println("LastDate : ", lastDate)
			fmt.Println("delaSeconds : ", DeltaSeconds(lastDate, etcdValue))

			lastDate = etcdValue
		}
	}(msg)

	h.watch(key, msg)

}

func TestMain(m *testing.M) {
	fmt.Println("begin")
	m.Run()
	fmt.Println("end")
}
