#!/usr/bin/python
#coding: utf8

import time

def factoria(N):

    result = 1

    for i in range(N, 0, -1):
        result = result * i

    return result

def factoria2(N):
    N2=N
    a=list(range(1,N+1))
    while N2>1:
        N1=N2%2; N2=N2//2+N1
        for i in range(N2-N1):
            a[i]*=a[N2+i]
        a=a[0:N2]
    return a[0]

t=time.clock()
N=100000
a=factoria2(N)
t=time.clock()-t
print (a)
#print("耗时: %10.5f秒" % (t))
