### Sequence ###

- all slice operations return a new list containing the requested elements

- assignment to slices is also possible(list)

- in Python, like in c, any non-zero integer value is true; zero is false.

- anything with a non-zero length is true, empty sequences are false.

- a trailing comma avoids the new line after the output:

		a,b = 0,1
		while b < 1000:
			print b,
			a,b = b, a+b

		1 1 2 3 5 8 13 21 34 55 89 144 233

- Note that interpreter inserts a newline before it prints
 the next prompt if the last line was not completed

- range(): The given end point is never part of the generated list

- **loop statements may have an else closure**, it is excuted when the loop terminates through exhaustion of the list (with for) or when the condition becomes false(with while), **but not when the loop is terminated by a break statement**.


- a try statemtent's else clause runs when no break occurs.


- pass is used when a statement is required syntactically but the program requires no action:

		while True:
			pass

		class MyEmptyClass:
			pass

- global variables cannot be directly assigned a value within a function(unless named in a global statement), although they may be referenced.


- function return without an expression argument returns None


- It is also possible to define functions with a variable number of argument, Three forms:

	- Define Argument Values
	 
	- Keyword argument:

	- Arbitary Argument Lists
	
			def func(kind, *arguments, **keywords):
			kind: normal argument
			arguments: positional arguments
			keywords: the keywords positional arguments


- Unpacking Argument Lists

		>>> range(3,6)
		[3,4,5]
		>>> args = [3,6]
		>>> range(*args)
		[3,4,5]

- *对list/tuple 进行unpack(实参) or pack(形参)

- **对dict进行unpack(实参) or pack(形参)

- PEP 8了解python编码风格

- **list作为stack是极快的， 但是作为queue是非常慢的， 因此通常用collections.deque来处理队列数据结构**

- filter(function, sequence), map(function,sequence) and reduce(function, sequence)是非常有用处理list的三个函数

- tuple packing and unpacking

		t = 12345, 54321, 'hello!'  packing
		x,y,z = t unpacking

- a set is an unordered collection with no duplicate elements

		basket = ['apple', 'orange', 'apple']
		fruit = set(bascket)
		a = set('abracadabra')

- del 可以对list和dict按index/key进行删除


- enumerate(list) 返回(key, value)对

- dict.iteritems()返回(key,value)对

- zip, reversed, sorted


- **list can be modifield in place using index assignments, slice assignments, or methods like append and extend**
