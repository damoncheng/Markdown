- aliase behave like pointer, when it is passed as an argument the caller will see the change.

- namespace
	
	- a namespace is a mapping from names to objects.
	
	- **Most namespace are currently implemented as python dicnaries.**

	- The important thing to know about namespace is that there is absolutely no relation between names in different namespaces

	- **Namespace are created at different moments and have different lifetimes**

	- **the namespace containg the build-in name is created when the Python nterpreter starts up, is never deleted**

	- the global namespace for a module is created when the module definition is read in; normally, module namespaces also last until the interpreter quit.

- scope

	- a scople is a texual region of a Python program where a namespace is directly accessible.


	- at any time during execution, there are three nested scopes whose namespaces are directly accessible.

		- the scopes of any enclosing functions, which are searched, contains the local names

		- the scopes of any enclosing functions, which are searched starting with the nearest enclosing scope,
		contaings non-local, but also non-global names

		- the next-to-last scope contains the current modules's global names

		- the outermost scope(searched last) is the namespace containing built-in name

- the function in class is called method

		x = MyClass
		Myclass.f(x) is equal to x.f()

- Class and Instance Variables

	- instance variables are for data unique to each instance
	
	- class variables are for attributes and methods shared by al instance of the class

	- class Dog:
	
			kind = "conine" #class variable
			def __init__(self, name):
				self.name = name #instance variable

- Python has two built-in function:

	- isinstance(obj, int) 
			
			return true if obj.__class__ is int

	- issubclass(bool, int)

			return true if bool is a subclass of int

- prefixed with underscore should be treated as no-public part of API

		'''
		为了防止子类因为重载，而影响父类函数方法的调用，可以对父类函数进行特定
		格式的引用，这个时候python重命名__method为class_method来保证父类method
		被唯一标识。

		命名要求：__开头,结尾最多一个_

- m is instance method, it have two magic method

	- m.im_self is the instance object with the method m()

	- m.im_func is the function object(no self argument) corrensponding to the mtehod

- raise exception

		raise Class,instance
		raise instance
		raise instance.__class__, instance

		notice: raise will call __str__ method and return

- Iterators

		'''	
		for statement calls iter() on the container object. it return iterator object that define method next(). method access elements
		in the container one at to end, it return StopIteration exception
		'''

		#------for 实现原理------#
		s = "abc"
		it = iter(s)
		it.next() => a
		it.next() => b
		it.next() => c
		it.next()

		Traceback
		StopIteration

		#---add iterator behavior to your class: Define an __iter__() method which returns an object with a next method---#

- generators:

	- generators are a simple and powerful tool for creating iterator

			yield方法返回一个iterator并在yield处中断执行，for语句或者程序通过next方法提取yield返回的数据后，yield恢复执行，当含有yield的函数执行完成后，会返回StopIteration异常

			def m():
				for x in [1,2,3]:
					yield x

			for x in m():
				print x


	- Generator expressions

		some simple generators can be coded succinctly as expression using a syntax similar to list comprehension. but parenthes instead of brackets.

			(i * i for i in range(10)) 返回generator

			sum(i*i for i in range(10))


		与Generator相比，Generator Expression更简介
		与List comprehensions相比，Generator更节约内存

			sum(x*y for x,y in zip(xvec, yvec))  
			sine_table = dict((x, sin(x*pi/180)) for x in range(0, 91))
			set(word  for line in page  for word in line.split())
			list(data[i] for i in range(len(data)-1,-1,-1))
		
	

	