#!/bin/bash

operator=$1

BASE_DIR=/mnt/vda1/var/lib/minikube/certs/etcd/
ENDPOINTS=https://192.168.64.2:2379

case "${operator}" in
    list)
        ./source/bin/etcdctl  --endpoints=$ENDPOINTS  --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key get "" --prefix --keys-only
        ;;
    get)
        ./source/bin/etcdctl  --endpoints=$ENDPOINTS --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key get $2
        ;;
    lease)
        ./source/bin/etcdctl  --endpoints=$ENDPOINTS --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/etcd/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key lease grant $2
        ;;
    put)
        ./source/bin/etcdctl  --endpoints=$ENDPOINTS --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key put $2 $3
        ;;
    put_lease)
        ./source/bin/etcdctl  --endpoints=$ENDPOINTS --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key put --lease=$2 $3 $4
        ;;
    helper_get)
        ./kube-etcd-helper_linux_amd64  --endpoint=$ENDPOINTS --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key get --pretty $2 
        ;;
    helper_list)
        ./kube-etcd-helper_linux_amd64  --endpoint=$ENDPOINTS --cacert=$BASE_DIR/ca.crt --cert=$BASE_DIR/healthcheck-client.crt --key=$BASE_DIR/healthcheck-client.key list 
        ;;
    *)
        echo "UNMATCH"
        ;;
esac
