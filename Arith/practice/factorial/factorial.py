#!/usr/bin/python
#coding: utf8

import math
import time
import datetime
import argparse

parser = argparse.ArgumentParser(description='computer factorial for integer N ')
parser.add_argument('--method', default='bsplit', nargs='?',choices=['simple', 'dconquer', 'drecursion', 'builtin', 'bsplit'], 
                    help='factorial method, default bsplit')
parser.add_argument('--output', default='', nargs='?',help='filename that save output, default no output')
parser.add_argument('integer', metavar='N', type=int, help='an integer for factorial')

global_percent = None

def print_percent(total, producted, rounded=4, force=False):

    global global_percent
    left = total - producted
    percent = round(producted / float(total), rounded) * 100

    if percent == float(100) and left:

        percent = 99.99

    if (not global_percent or percent >= global_percent) and ((global_percent != percent) or force):
        print("%s %s%% - %s lefted" % (datetime.datetime.now(), percent, left))
        global_percent = percent
        return True

    return False

#method : simple method
def factorial_simple(N):

    result = 1

    for i in range(1, N + 1):
        #result = result * i
        result = i * result
        print_result = print_percent(N, i, rounded=1, force=False)

    return result

#method : divide and conquer
def factorial_divide_conquer(N):
    N2=N
    a=list(range(1,N+1))
    while N2>1:
        N1=N2%2; N2=N2//2+N1
        for i in range(N2-N1):
            a[i]*=a[N2+i]
        print_result = print_percent(N ,N - 2 * (N2 - N1), force=True)
        a=a[0:N2]

    print_result = print_percent(N ,N, force=True)
    return a[0]

def factorial_divide_conquer_recursion(N, start=1, total=None):

    if not total:

        total = N

    delta = N - start
    factorial = 1

    if delta < 0:
        return factorial

    elif delta == 0:
        return factorial*N

    elif delta < 5:

        for i in range(start, N + 1):

            factorial = factorial * i

        return factorial

    result = factorial_divide_conquer_recursion(N, (N + start)/ 2 + 1 , total) * \
             factorial_divide_conquer_recursion( (N + start) / 2 , start, total)

    print_percent(total, delta + 1)

    return result

#method : binary split
def factorial_binary_split(N):

    result = {
        "p" : 1, 
        "r" : 1
    }

    loop(N, result, N)

    return result["r"] << (N - nminussumofbits(N));

def loop(n, result, total):

    if n <= 2:
        return;

    loop(n//2, result, total)

    result["p"] = result["p"] * partProduct(n // 2 + 1 + ((n // 2) & 1), n - 1 + (n & 1))

    result["r"] = result["r"] * result["p"]

    print_result = print_percent(total, n, force=True)

def partProduct(n, m):

    if m <= (n + 1):
        return n;

    if m <= (n + 2):
        return n * m;

    k = (n + m) // 2;

    if ( (k & 1) != 1):
        k = k - 1;

    return partProduct(n, k) * partProduct(k + 2, m);

def nminussumofbits(n):

    count = 0;
    while (n != 0):
        count += 1;
        n &= n - 1; 

    return count;


factorial_method = {

    "simple" : factorial_simple,

    "drecursion" : factorial_divide_conquer_recursion,

    "dconquer" : factorial_divide_conquer,

    "bsplit" : factorial_binary_split,

    "builtin" : math.factorial
        
}

args = parser.parse_args()
integer = args.integer
method = args.method
output = args.output

t=time.clock()
result=factorial_method[method](integer)
t=time.clock()-t

print("time cost: %10.5fs" % (t))


if output:

    print("converting result to string")

    result = "%s" % result

    print("saving result in file %s" % (output))

    with open(output, "w") as f:
        f.write(result)

    print("the %s! is saved in file %s" % (integer, output))

else:

    print("no output filename and exit")
