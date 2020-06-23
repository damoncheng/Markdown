import time
import etcd3

client = etcd3.Client(
    "192.168.64.2",        
    2379,
    verify="/Users/hongxi/vboxShare/certs/etcd/ca.crt",
    cert=("/Users/hongxi/vboxShare/certs//etcd/healthcheck-client.crt", "/Users/hongxi/vboxShare/certs/etcd/healthcheck-client.key")
)

#LOCK_TYPE=None
#LOCK_TYPE=etcd3.stateful.lock.Lock.PROCESS
LOCK_TYPE=etcd3.stateful.lock.Lock.THREAD
#LOCK_TYPE=etcd3.stateful.lock.Lock.HOST

with client.Lock("alteration/2", lock_ttl=5, reentrant=LOCK_TYPE, lock_prefix="/wepaytest"):

    print("lock one")
    time.sleep(30)
    print(client.range("/wepaytest/alteration/2").kvs)
    with client.Lock("alteration/2", lock_ttl=5, reentrant=LOCK_TYPE, lock_prefix="/wepaytest"):

        print("lock two")
        print(client.range("/wepaytest/alteration/2").kvs)
        time.sleep(10)

    print("unlockone")
    print(client.range("/wepaytest/alteration/2").kvs)

    time.sleep(10)

print("unlocktwo")
