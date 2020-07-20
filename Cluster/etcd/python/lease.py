import time
import datetime
import threading
import etcd3

client = etcd3.Client(
    "192.168.64.2",        
    2379,
    verify="/Users/hongxi/vboxShare/certs/etcd/ca.crt",
    cert=("/Users/hongxi/vboxShare/certs/etcd/healthcheck-client.crt", "/Users/hongxi/vboxShare/certs/etcd/healthcheck-client.key"),
    headers={"HOST" : "127.0.0.1"}
)

"""
with client.Lease(ttl=5) as lease:

    command = "/wepaytest/alteration/command/name"
    command_lock = "/wepaytest/alteration/command/name/lock"

    response = client.lock(command_lock, lease=lease.ID)
    client.put(command, "test")
    client.put("foo", "foo")
    print(response)

    print(datetime.datetime.now(), "locked")

    time.sleep(10)

    client.unlock(command_lock)

    print(datetime.datetime.now(), "unlocked")

    #client.put('foo', 'bar', lease=lease.ID)
    #client.put('fizz', 'buzz', lease=lease.ID)

    #print(client.range(key="foo"))
    #time.sleep(30)
    #print(client.range(key="foo"))

    #r = lease.time_to_live(keys=True)
    #print(r)
    #assert set(r.keys) == {b'foo', b'fizz'}
    #assert lease.alive()
    #time.sleep(15)
    #r = lease.time_to_live(keys=True)
    #print(r)

"""

lease1 = client.lease_grant(5)
lease2 = client.lease_grant(5)


client.put('/foo', 'bar', lease=lease1.ID)
client.put('/foo1', 'bar', lease=lease1.ID)
print("len(key)", client.range(key='/foo', prefix=True, count_only=True).count)
client

#client.put('fizz', 'buzz', lease=lease.ID)
print("before sleep", client.range(key="foo"))
time.sleep(10)
print("after sleep", client.range(key="foo"))

#r = lease.time_to_live(keys=True)
#print(r)
#assert set(r.keys) == {b'foo', b'fizz'}
#assert lease.alive()
#time.sleep(15)
#r = lease.time_to_live(keys=True)
#print(r)


print("end")


