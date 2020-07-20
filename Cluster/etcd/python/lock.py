#coding:utf-8
import datetime
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
#LOCK_TYPE=etcd3.stateful.lock.Lock.THREAD
#LOCK_TYPE=etcd3.stateful.lock.Lock.HOST

response = client.lease_grant(10)
print(response.ID)

command_lock = "/wepaytest/alteration/2"


client.lock(command_lock, lease=response.ID)

print(datetime.datetime.now(), "locked")
time.sleep(5)
client.lease_keep_alive_once()

client.lease_revoke(response.ID)
print(datetime.datetime.now(), "unlocked")

"""
with client.Lock("alteration/2", lock_ttl=10, lock_prefix="/wepaytest") as lock:

    lock.lease.cancel_keepalive()

    print("lock start")
    #print(lock.lease)
    #print(lock.lease.keeping)
    time.sleep(30)
    print("lock end")
"""


#该锁会keepalived, 不能避免死锁
"""
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
"""

#lease = client.lease_grant(10)
#lock = client.lock("/wepaytest/alteration/1", lease.ID)

print("unlocktwo")
