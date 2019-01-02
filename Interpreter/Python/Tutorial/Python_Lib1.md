### Build-in command ###

- dir() and help() functions are useful as interactive aids for working with large module.

### File Wildcards ###

- match current directory file

		import glob
		glob.glob('*.py')

### Command Line Argument ###

- from sys module get argument

		import sys
		print sys.argv

### Error output redirection and programe termination ###


- The sys module also has attributes for stdin, stdout, and stderr, we can reassign them to redirect.

		sys.stderr.write("Warning, log file not found")
		sys.exit()


### String Pattern Matching ###

- re module provides regular expression tools for advanced string process.

		>>> import re
		>>> re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest')
		['foot', 'fell', 'fastest']
		>>> re.sub(r'(\b[a-z]+) \1', r'\1', 'cat in the the hat')
		'cat in the hat'

- we only simple capabilities are needed, string models are preferred because they are easier to read and debug.

		>>> 'tea for too'.replace('too', 'two')
		'tea for two'

### Mathematics ###

- The math module gives access to the unserlying C library functions for floating point math.

		>>> import math
		>>> math.cos(math.pi / 4.0)
		0.70710678118654757
		>>> math.log(1024, 2)
		10.0

- The random module provides tools for making random slections:

		>>> import random
		>>> random.choice(['apple', 'pear', 'banana'])
		'apple'
		>>> random.sample(xrange(100), 10)   # sampling without replacement
		[30, 83, 16, 4, 8, 81, 41, 50, 18, 33]
		>>> random.random()    # random float
		0.17970987693706186
		>>> random.randrange(6)    # random integer chosen from range(6)
		4

### Internet Access ###

- There are a number of modules for accessing the internet and processing internet protocols. Two of the simplest are urllib2 for retrieving data from URLs and smtplib for sending mail:

		>>> import urllib2
		>>> for line in urllib2.urlopen('http://tycho.usno.navy.mil/cgi-bin/timer.pl'):
		...     if 'EST' in line or 'EDT' in line:  # look for Eastern Time
		...         print line
		
		<BR>Nov. 25, 09:43:32 PM EST

		>>> import smtplib
		>>> server = smtplib.SMTP('localhost')
		>>> server.sendmail('soothsayer@example.org', 'jcaesar@example.org',
		... """To: jcaesar@example.org
		... From: soothsayer@example.org
		..
		... Beware the Ides of March.
		... """)
		>>> server.quit()


### Dates and Times ###

- datetime module supples classes for manipulating dates and time in both simple and complex ways.

		>>> # dates are easily constructed and formatted
		>>> from datetime import date
		>>> now = date.today()
		>>> now
		datetime.date(2003, 12, 2)
		>>> now.strftime("%m-%d-%y. %d %b %Y is a %A on the %d day of %B.")
		'12-02-03. 02 Dec 2003 is a Tuesday on the 02 day of December.'
		
		>>> # dates support calendar arithmetic
		>>> birthday = date(1964, 7, 31)
		>>> age = now - birthday
		>>> age.days
		14368

### Data Compression ###

- Common data archiving and compression formats are directly supported by modules including:

		>>> import zlib
		>>> s = 'witch which has which witches wrist watch'
		>>> len(s)
		41
		>>> t = zlib.compress(s)
		>>> len(t)
		37
		>>> zlib.decompress(t)
		'witch which has which witches wrist watch'
		>>> zlib.crc32(s)
		226805979

### Performance Measurement ###

- Some Python users develop a deep interest in knowing the **relative performance of different approaches to the same problem**. Python provides a measurement tool that answers those questions immediately.

- compare performance : tuple packing and unpacking feature VS traditional approach to swapping arguments. 

		>>> from timeit import Timer
		>>> Timer('t=a; a=b; b=t', 'a=1; b=2').timeit()
		0.57535828626024577
		>>> Timer('a,b = b,a', 'a=1; b=2').timeit()
		0.54962537085770791	

- In constrast to timeit's final level of granularity, the **profile** and **pstats** module provide tools for identifying time critical sections in larger blocks of code.

		import cProfile,pstats,StringIO
		def performance_test():
			x = 2
			for i in range(10 ** 6):
				x = x + 2

		pr = cProfile.Profile()
		pr.enable()

		performance_test()
	
		pr.disable()
		s = StringIO.StringIO()
		sortby = "cumulative"
		ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
		ps.print_stats(regx, 20)
		print s.getvalue()

		# function description #
		cumulative ： 函数自身+子函数调用花费时间

		print_stats 参数支持三种过滤方式，且依赖参数顺序来过滤
			*integer : select a count of lines
			*a decimal fraction (between 0.0 and 1.0 inclusive): select a percentage of lines
			*a regular expression: to pattern match the standard name that is printed.

		# the output #
		C:\windows\system32\cmd.exe /c (.\lib.py)
         3 function calls in 0.067 seconds

  		 Ordered by: cumulative time

   		ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.049    0.049    0.067    0.067 D:\test\lib.py:21(performance_test)
        1    0.018    0.018    0.018    0.018 {range}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}

### Quality Control ###

- One approach for developing high quality software is to write tests for each function as it is developed and run those tests frequently during the development process.

- **doctest** module provides a tool for scanning a module and validating tests embedded in program's docstrings.

		def average(values):
		    """
		    Computes the arithmetic mean of a list of numbers. 
		
		    >>> print average([20, 30, 70])
		    50.0
		    """
		    return sum(values, 0.0) / len(values)
		
		import doctest
		doctest.testmod()

- **unittest** module is not as effortless as the doctest module, but is allows a more comprehensive set of tests to be mantained in a separate file:

		import unittest
		
		class TestStatisticalFunctions(unittest.TestCase):
		
		    def test_average(self):
		        self.assertEqual(average([20, 30, 70]), 40.0)
		        self.assertEqual(round(average([1, 5, 7]), 1), 4.3)
		        with self.assertRaises(ZeroDivisionError):
		            average([])
		        with self.assertRaises(TypeError):
		            average(20, 30, 70)
		
		unittest.main()  # Calling from the command line invokes all tests

### Batteries Include ###

- Python has a "Batteries included" philosophy. This is best seen through the sophisticated and robust capabilities of its larger packages.

- The **xmlrpclib** and **SimpleXMLRPCServer** modules make implementing remote procedure calls into an almost trivial task. Despite the modules names, no direct knowlege or handling of XML is needed.

- The **email** package is a library for managing email messages, including MIME and other RFC 2822-based message documents. Unlike **smtplib** and **poplib** which actually send receive messages, the **email** package has a complete toolset for building or decoding complex message structures(including attachments) and for implementing internet encoding and header protocols

- The **xml.dom** and **xml.sax** packages provide robust support for parsing this popular data interchange format. Likewise, the **csv** module supports direct reads and writes in a common database format. Together, These module and packages greatly simplify data interchange between Python applicatons and other tools.

- Internationlizaition is supported bu a number of modules including **gettext, locale, and the codecs package**.