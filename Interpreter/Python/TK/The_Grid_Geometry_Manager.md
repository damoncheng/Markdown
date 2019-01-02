## The Grid Geometry Manager ##

- We'll take a bit of a break from talking about different widgets(what to put onscreen), and focus instead on geometry management(where to put it).

- Grid is one of several geometry managers available in Tk, but it's mix of power, flexibility and ease of use, along with natural fit with today's layouts(that rely on alignment of widgets) **make it the best choice for general use.** There are other geometry managers: "pack" is also quite powerful, but harder to use and understand; "place" gives you complete control of positioning each element;** we'll see even widgets like paned windows, notebooks, canvas and text can act as geometry managers.**

- 作者认为grid是place的升级版，完全可以用grid代替place.

### Columns and Rows ###

- 部件被分配一个"column" number和一个"row" number, 从而指定其在容器中的相对位置。

- 第一列和第一行都以0开始，可以留下空隙列和行，从而在后面的时间更容易增加部件。

- 每列的宽度或者高度依赖于其中部件的宽度和高度。 This means when sketching out your user interface, and dividing it into rows and columns, you don't need to worry about each column or row being equal width.

  
### Spanning Multiple Cells ###

- **Widgets can take up more than a single cell in the grid;** you'll use the "columnspan" and "rowspan" options when gridding the widget. 

- 案例：

		from tkinter import *
		from tkinter import ttk
		root = Tk()
		content = ttk.Frame(root)
		frame = ttk.Frame(content, borderwidth=5, relief="sunken", width=200, height=100)
		namelbl = ttk.Label(content, text="Name")
		name = ttk.Entry(content)
		onevar = BooleanVar()
		twovar = BooleanVar()
		threevar = BooleanVar()
		onevar.set(True)
		twovar.set(False)
		threevar.set(True)
		one = ttk.Checkbutton(content, text="One", variable=onevar, onvalue=True)
		two = ttk.Checkbutton(content, text="Two", variable=twovar, onvalue=True)
		three = ttk.Checkbutton(content, text="Three", variable=threevar, onvalue=True)
		ok = ttk.Button(content, text="Okay")
		cancel = ttk.Button(content, text="Cancel")
		content.grid(column=0, row=0)
		frame.grid(column=0, row=0, columnspan=3, rowspan=2)
		namelbl.grid(column=3, row=0, columnspan=2)
		name.grid(column=3, row=1, columnspan=2)
		one.grid(column=0, row=3)
		two.grid(column=1, row=3)
		three.grid(column=2, row=3)
		ok.grid(column=3, row=3)
		cancel.grid(column=4, row=3)
		root.mainloop()

### Layout within the Cell ###

- 因为Cell的宽度和高度取决于里面的部件，因此可能产生各个cell和row的高度和宽度不一样的情况。

- By defualt, if a cell is larger than the widget contained in it, the widget will be centered within it, both horizontally  and vertically, with the master's background showing in the empty space around it. **The "sticky" option can be used to change this default behavior.**

- The value of the "sticky" option is a string of 0 or more of the compass directions "nsew", specifying which edges of the cell the widget should be "stuck" to. So for example, a value of "n"(north) will jam the widget up against the top side, with any extra vertical space on the bottom; the widget will still be centered horizontally. A value of "nw"(north-west) means the widget will be stuck to the top left corner, with extra space on the bottom and right.

- Most widgets have options that can control how they are displayed if they are larger than needed. For example, **a label widget has an "anchor" option which controls where the text of the label will positioned.**

### Handling Resize ###

- sticky选项用于部件如何填充cell额外空间， 即部件在cell中显示的位置
- 而weight选项则用于当窗口重绘大小的时候，或者说master中有额外的空间空间的额时候，cell宽度和高度的变化情况。

		If two columns have the same weight, they'll expand at the same 
		rate; if one has a weight of 1, another of 3, the latter one will 
		expand three pixels for every one pixel added to the first.

		Both "columnconfigure" and "rowconfigure" also take a "minsize" grid 
		option, which specifies a minimum size which you really don't want 
		the column or row to shrink beyond.

### Padding ###

- padding用于填充在cell内，容器四周空闲空间大小。

- frame的padding选项，让frame自身内边缘有一些额外的空间。 

- 另一种方式可以通过"padx","pady" grid options when adding the widget. "padx"选项用于填充额外空闲空间到部件的左边和右边，"pady"选项用于填充额外空闲空间到部件的上边和下边。 当赋值单值给"padx"或者"pady"时，部件两边填充同样的空间，当赋值两个值的列表时，部件两边填充不同大小的空间。

- **If you want to add padding around an entire row or column, the "columnconfigure" and "rowconfigure"methods accept a "pad" option, which will do this for you.**

### Addtional Grid Features ###

- Querying and Changing Grid Options

	- "Slaves"方法将告诉你所有widgets that have been grided inside a master, or optionally those within just a certain column or row.

	- "info"方法will geive you a list of all the grid options for a widget and their values. 

	- "configure"方法lets you change one or more grid options on a widget.
	
			These are illustrated in this interactive session:
			>>> content.grid_slaves()
			<map object at 0x00C3F470>
			>>> for w in content.grid_slaves(): print(w)
			...
			.14597008.14622128
			.14597008.14622096
			.14597008.14622064
			.14597008.14622032
			.14597008.14622000
			.14597008.14621872
			.14597008.14621840
			.14597008.14621808
			>>> for w in content.grid_slaves(row=3): print(w)
			...
			.14597008.14622128
			.14597008.14622096
			.14597008.14622064
			.14597008.14622032
			.14597008.14622000
			>>> for w in content.grid_slaves(column=0): print(w)
			...
			.14597008.14622000
			.14597008.14621808
			>>> namelbl.grid_info()
			{'rowspan': '1', 'column': '3', 'sticky': 'nw', 'ipady': '0', 'ipadx': '0', 'columnspan': '2',
			'in': <tkinter.ttk.Frame object at 0x00DEBB90>, 'pady': '0', 'padx': '5', 'row': '0'}
			>>> namelbl.grid_configure(sticky=(E,W))
			>>> namelbl.grid_info()
			{'rowspan': '1', 'column': '3', 'sticky': 'ew', 'ipady': '0', 'ipadx': '0', 'columnspan': '2',
			'in': <tkinter.ttk.Frame object at 0x00DEBB90>, 'pady': '0', 'padx': '5', 'row': '0'}
	
- Internal Padding

		You saw how the "padx" and "pady" grid options added extra space 
		around the outside of a widget. There's also a less used type of 
		padding called "internal padding", which is controlled by the grid 
		options "ipadx" and"ipady".
		
		The difference can be subtle. Let's say you have a frame that's 
		20x20, and specify normal (external) padding of 5 pixels on each 
		side. The frame will request a 20x20 rectangle (its natural size) 
		from the geometry manager. Normally, that's what it will be granted, 
		so it'll get a 20x20 rectangle for the frame, surrounded by a 5 
		pixel border.
		
		With internal padding, the geometry manager will effectively add the 
		extra padding to the widget when figuring out its natural size, as 
		if the widget has requested a 30x30 rectangle. If the frame is 
		centered, or attached to a single side or corner (using "sticky"), 
		you'll end up with a 20x20 frame with extra space around it. If 
		however the frame is set to stretch (i.e. a "sticky" value of "we", 
		"ns", or "nwes") it will fill the extra space, resulting in a 30x30 
		frame, with no border.

		（如果用ipad会增加部件的宽度或高度，即部件内的宽度或高度，
		  如果用pad会增加部件周围的空隙，即部件外的宽度或高度。）
		（pad和ipad都是grid选项）

- Forget and Remove

	- forget方法： 移除但不摧毁，可以重新通过manager放置, 但grid options丢失
	- Remove方法： 移除并且不摧毁，并且还记得grid options

- Nested Layouts

	- frame可以嵌套在frame里，创造复杂的用户接口
	
