##  Extending Python with C or C++

### 

Such `extension modules` can do two things that can’t be done directly in Python: they can implement new built-in object types, and they can call C library functions and system calls.


All user-visible symbols defined by Python.h have a prefix of `Py` or `PY`, except those defined in standard header files. For convenience, and since they are used extensively by the Python interpreter, "Python.h" includes a few standard header files: `<stdio.h>`, `<string.h>`, `<errno.h>`, and `<stdlib.h>`. If the latter header file does not exist on your system, it declares the functions `malloc()`, `free()` and `realloc()` directly.

For module functions, the `self` argument is `NULL` or a pointer selected while initializing the module (see `Py_InitModule4()`). For a method, it would point to the object instance.

The args argument will be a pointer to a Python tuple object containing the arguments. Each item of the tuple corresponds to an argument in the call’s argument list. The arguments are Python objects — in order to do anything with them in our C function we have to convert them to C values. The function `PyArg_ParseTuple()` in the Python API checks the argument types and converts them to C values. It uses a **template string** to determine the required types of the arguments as well as the types of the C variables into which to store the converted values. More about this later.

	static PyObject *
	spam_system(PyObject *self, PyObject *args)
	{
	    const char *command;
	    int sts;
	
	    if (!PyArg_ParseTuple(args, "s", &command))
	        return NULL;
	    sts = system(command);
	    return Py_BuildValue("i", sts);
	}

### Intermezzo: Errors and Exceptions

An important convention throughout the Python interpreter is the following: when a function fails, it should set an exception condition and return an error value (usually a `NULL` pointer). Exceptions are stored in a static global variable inside the interpreter; if this variable is NULL no exception has occurred. A second global variable stores the “associated value” of the exception (the second argument to `raise`). A third variable contains the stack traceback in case the error originated in Python code. These three variables are the C equivalents of the Python variables `sys.exc_type`, `sys.exc_value` and `sys.exc_traceback` (see the section on module sys in the Python Library Reference). It is important to know about them to understand how errors are passed around.

When a function f that calls another function g detects that the latter fails, f should itself return an error value (usually NULL or -1). It should not call one of the `PyErr_*()` functions — one has already been called by g. f’s caller is then supposed to also return an error indication to its caller, again without calling PyErr_*(), and so on — the most detailed cause of the error was already reported by the function that first detected it. Once the error reaches the Python interpreter’s main loop, this aborts the currently executing Python code and tries to find an exception handler specified by the Python programmer.

	解释器内的函数调用失败时，需要设定异常条件，并且返回一个错误值(常常是NULL指针), 进行异常处理
	
	异常条件:
	
		static global variable one : 存储异常类型，没有异常时为NULL。
		
		static global variable two : 存储异常相关信息, 常常为raise的第二个参数。
		
		static global variable three : 存储异常堆栈信息。
		
	错误处理，大致流程由以下三点组成:
	
		异常函数设定异常条件
	
		层层呢返回NULL直到main loop
		
		python解释器捕获到有异常，中止代码执行，基于异常条件进行异常处理
	
You can also define a new exception that is unique to your module. For this, you usually declare a static object variable at the beginning of your file:

	//定义一个新的异常类型
	static PyObject *SpamError;
	
and initialize it in your module’s initialization function (`initspam()`) with an exception object (leaving out the error checking for now):

	
	PyMODINIT_FUNC
	initspam(void)
	{
	    PyObject *m;
	
	    m = Py_InitModule("spam", SpamMethods);
	    if (m == NULL)
	        return;
	
	    SpamError = PyErr_NewException("spam.error", NULL, NULL);
	    Py_INCREF(SpamError);
	    PyModule_AddObject(m, "error", SpamError);
	}
	
The spam.error exception can be raised in your extension module using a call to PyErr_SetString() as shown below:

	static PyObject *
	spam_system(PyObject *self, PyObject *args)
	{
	    const char *command;
	    int sts;
	
	    if (!PyArg_ParseTuple(args, "s", &command))
	        return NULL;
	    sts = system(command);
	    if (sts < 0) {
	        PyErr_SetString(SpamError, "System command failed");
	        return NULL;
	    }
	    return PyLong_FromLong(sts);
	}
	
