- replace argument: string and key-value

		"{0} {1} {other}".format(1,2,other=3)

- replace and format argument:

		"{0:10d} {1:10d}".format(1,2)

- replace argumetns from dict:

		table = {'Sjoerd': 4127, 'Jack':4098}
		"{Sjoerd:d} {Jack:d}".format(**table)

- operate file

	- open method

			f = open(filename, mode)
			···
			mode参数：
				default : r
				read : r
				write : w
				read && write: r+
				append: a
			···
			f.read(size) #size可选，默认读整个文本
			f.readline() #如果为文件结束行，返回""
			f.write()
			f.tell()返回文件对象当前位置
			f.close()

	- open and with cooperate

			with open("workfile", "r") as f:
				read_data = f.read()

			#auto close and deal with exception

- **interchange format called JSON: handle lists and dictionaries**

- pickle : only for python, serialization complex python object