## Oganizing Complex Interfaces ##

- Note that when we're talking about complexity in this chapter, it's not the underlying technical complexity of how the program is put together, but how it's presented to the user. A user interface can be pulled together from many different modules, be built up from multiple canvas widgets and deeply nested frames, but thant doesn't necessarily mean the user perceives it to be complex.

### Multiple windows ###

- 使用多窗口是为了简化分类应用程序接口，不过在不同窗口之间切换焦点，可能会让用户感觉不方便。

### White space ###

- If you do need to display a large number of widgets onscreen at the same time, you have to think about how to organize them visually. You've seen how grid can help by making it easy to align widgets with each other. White space is another useful aid. Placing related widgets quite close to each other (possible with an explanatory label immediately above) and separated from other less-related widgets by white space helps the user organize the user interface in their own mind.

### Separator ###

- 利用Separator部件，可以将接口上的部件以组的形式分开显示，这种方法常常比white space更有效的利用空间， 能够相对紧凑的显示。

		s = ttk.Separator(parent, orient=HORIZONTAL)

		orient ： "horizontal" or "vertical"

- 要结合sticky和rowconfigure, columnconfigure来利用gird布局。

### Label Frames###

- 一个labelframe的功能和frame一样，作为容纳其他部件的容器，只是其提供了额外的标签，来局部说明该frame的作用。

		lf = ttk.Labelframe(parent, text='Label')

		当frame内有部件时，标签才显示

### Paned windows ###

- 一个panedwindow部件可以让你按上下顺序（或者左右顺序），**放置可调整大小的frame到其上**，用户可以通过拖动frame部件的边缘线来调整高度（或者宽度），Typically the widgets you're adding to a panedwindow will be frames containing many other widgets。

		p = ttk.Panedwindow(parent, orient=VERTICAL)
		# first pane, which would get widgets gridded into it:
		f1 = ttk.Labelframe(p, text='Pane1', width=100, height=100)
		f2 = ttk.Labelframe(p, text='Pane2', width=100, height=100); # second pane
		p.add(f1)
		p.add(f2)

- “add”方法按照orient方法增加pane到尾部，可以用"insert position subwindow"方法将pane插入到panes列表的指定位置(0..n-1)；如果这个pane已经被panedwindow管理，可以将其移动到新的位置。 你也可以通过"foregetsubwindow"来从panedwindow移除该pane; you can also pass a position instead of a subwindow.

- Other options let you sign relative weights to each pane so that if the overall panedwindow resizes, certain panes will get more space than others. As well, you can adjust the position of each sash between items in the panedwindow. See the command reference for details.


### Notebook ###

- notebook部件提供分页能力，使用index tab来进行分页显示。

		n = ttk.Notebook(parent)
		f1 = ttk.Frame(n); # first page, which would get widgets gridded into it
		f2 = ttk.Frame(n); # second page
		n.add(f1, text='One')
		n.add(f2, text='Two')

- 通过"add"方法（"add subwindow ?option value...?"）增加一个subwindow到tabs列表尾部，text option用来设置tab的标签。

-“state”选项用来设置tab状态"normal","disabled"(not selectable), or "hidden"

- "insert"方法(insert position subwindow ?option value...?) 插入一个标签

- "forget"方法移除指定tab，参数为position(0..n-1)

- 通过"tabs"方法获取tab列表  

- “select”方法获取当前的subwindow, 当select传递参数的话将重新选定tab.

- 改变或者获取tab选项：  To change a tab option (like the text label on the tab or its state), **you can use the "tab(tabid, option=value" method (where "tabid" is again the tab's position or subwindow);**omit the "=value" to return the current value of the option.