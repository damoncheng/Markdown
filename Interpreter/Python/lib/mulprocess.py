import time
from multiprocessing import Pool

#---------example one--------#
"""
def f(x):
	return x*x;

if __name__ == '__main__':
	with Pool(5) as p:
		print(p.map(f, [1,2,3]))
"""

#---------example two--------#
"""
from multiprocessing import Process
import os

def info(title):
    print(title)
    print('module name:', __name__)
    print('parent process:', os.getppid())
    print('process id:', os.getpid())

def f(name):
    info('function f')
    print('hello', name)

if __name__ == '__main__':
    info('main line')
    p = Process(target=f, args=('bob',))
    p.start()
    p.join()
"""

import multiprocessing as mp

#--------example three-------#
'''
def foo(q):
	time.sleep(3)
	q.put('hello')

if __name__ == '__main__':
	mp.set_start_method('spawn')
	q = mp.Queue()
	p = mp.Process(target=foo, args=(q,))
	p.start()
	print("before get")
	print(q.get())
	print("after get")
	p.join()
'''

#--------multiprocess Queues-------#
'''
from multiprocessing import Process,Queue

def f(q):
	q.put([42, None, 'hello'])

if __name__ == '__main__':
	q = Queue()
	p = Process(target=f, args=(q,))

	p.start()
	print(q.get())
	p.join()
'''

#--------multiprocess Pipeline-------#
'''
from multiprocessing import Process,Pipe

def f(conn):
	conn.send([42, None, 'hello'])
	conn.close()

if __name__ == "__main__":
	parent_conn,child_conn = Pipe()
	p = Process(target=f, args=(child_conn,))
	p.start()
	print(parent_conn.recv())
	p.join()
'''

#--------multiprocess Sync---------#
'''
from multiprocessing import Process,Lock

def f(l, i):
	l.acquire()
	try:
		print('hello world', i)
	finally:
		l.release()

if __name__ == '__main__':
	lock = Lock()

	for num in range(10):
		Process(target=f, args=(lock, num)).start()

	print("main process end")
'''

#--------multiprocess Share memory---------#
"""
from multiprocessing import Process,Value,Array

def f(n,a):
	n.value = 3.1415927
	for i in range(len(a)):
		a[i] = -a[i]

if __name__ == '__main__':
	num = Value('d', 0.0)
	arr = Array('i', range(10))

	p = Process(target=f, args=(num, arr))
	p.start()
	p.join()

	print(num.value)
	print(arr[:])
"""

from multiprocessing.pool import Pool,ThreadPool
import os

x = 123

def f():
	global x
	print("start f x:", x)
	x = 456
	print("end f x:", x)

if __name__ == '__main__':

	print("main pid:", os.getpid())

	with Pool(processes=4) as pool:

		res = pool.apply_async(f, ())
		print("pool worker pid:", res.get(timeout=1))

	print("main x:",x)

	with ThreadPool(processes=4) as threadpool:

		res = threadpool.apply_async(f, ())
		print("theadpool worker pid:", res.get(timeout=5))

	print("main x:",x)



