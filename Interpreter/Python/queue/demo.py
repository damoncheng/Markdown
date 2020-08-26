#coding:utf-8

import queue
import threading

num_worker_threads = 2

def worker(num):
    while True:
        item = q.get()
        if item is None:
            break
        print(num, ":", item)
        q.task_done()

q = queue.Queue()
threads = []
for i in range(num_worker_threads):
    t = threading.Thread(target=worker, args=(i,))
    t.start()
    threads.append(t)

for item in range(10):
    q.put(item)

# block until all tasks are done
q.join()

# stop workers
for i in range(num_worker_threads):
    q.put(None)
for t in threads:
    t.join()
