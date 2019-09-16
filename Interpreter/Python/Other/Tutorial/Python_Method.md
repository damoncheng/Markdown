- This import all names except those begining with an underscroe

		from fibo import *

- interpreter中要重新导入模块， 需要是使用reload(modulename)

- python fibo.py <arguments>

		if __name__ == "__main__":
			import sys
			print int(sys.argv[1])

- sys.path通过下面这些路径来进行初始化：

	- the directory containing the input script(or the current directory)

	- PYTHONPATH(a list of directory names, with the same syntax as the shell variable PATH)
	 
	- the installation-dependent default

- It is possible to have a file canned spam.pyc(or spam.pyo when -O is used) without a file spam.py for the same module. This can be used to distribute a library of Python code in a form that is moderately hard to reverse engineer.


- The module compileall can create .pyc files(or .pyo files when -O is used) for all modules in a directory


- without arguments, dir() lists the names you have defined currently(dir list all types of names: varaibles, modules, functions, etc). dir does not list the names of build-in functions and variables.

- if you want a list of build_in functions and variables, they are defined in standard module `__builtin__`.

- Packages are a way of structuring Python's module namespace by using "dotted module names"


- from package import item: the item can be either a submodule(or subpackage) of the package, or some other name defined in the package, like a function, class or variable. **The import statement first tests whether the item is defined in the package; if not, it assumes it is a module and attempts to load it**, if it failed to find it. an importError exception is raised.

 

