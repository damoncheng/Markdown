## Tree ##

- 一个treeview部件能通过层次的方式来显示和浏览items，并且在每项右边的列显示item的属性。

		tree = ttk.Treeview(parent)

- Horizontal and vertical scrollbars can be added in the usual manner, if desired.

### Adding Items to the Tree ###

- 增加到treeviews的每项相当于一个单节点，无论是叶子节点(leaf node)或者是中间节点(internal node). 都被一个唯一id参考(a unique id)，**这个id可以由programmer创建，也可以由部件自动选择。**

- treeview部件自动创建一个root节点(which is not displayed), having the id of "{}" (ie. the empty string). 其作为第一层项的父节点。 父节点的孩子通过index被参考(0 being the first, with the special "end" index meaning inserting after all existing children).

- 一般情况下，需要规定每个item的name。有选项支持：在name旁边增加image，是否node是open or closed, and so on。

		# Inserted at the root, program chooses id:
		tree.insert('', 'end', 'widgets', text='Widget Tour')
		
		# Same thing, but inserted as first child:
		tree.insert('', 0, 'gallery', text='Applications')
		
		# Treeview chooses the id:
		id = tree.insert('', 'end', text='Tutorial')
		
		# Inserted underneath an existing node:
		tree.insert('widgets', 'end', text='Canvas')
		tree.insert(id, 'end', text='Tree')

		Inserting the item returns the id of the newly created item

### Rearranging Items ###

- A node(和他的后代)可以被移动到树中不同位置，唯一的限制一个节点不能被移动到它的后代节点。 目标位置通过parent and index来定位，与insert方法一样:

		tree.move('widgets', 'gallery', 'end'); #move widgets unser gallery

- 将item和它的后代从tree中分离，但是不摧毁：

		tree.detach('widgets')

- 将item移除并摧毁：

		tree.delete('widgets')

- 通过"parent"方法获取item的父节点，通过"next"和"prev"方法获取item的兄弟，通过"children"方法获取item的孩子列表。

- 通过"open"控制选项，控制或者查询item是否打开。

		tree.item('widgets', open=TRUE)
		isopen = tree.item('widgets', 'open')


### Displaying information for each item ###

- treeview部件可以显示每项更多额外的信息，其被作为单独的列置于主树的右边。

- 通过columns配置选项来创建列:

		tree = ttk.Treeview(root, columns=('size', 'modifier'))
		tree['columns'] = ('size', 'modified', 'owner')

- 也可以规定列的宽度，在列中每项信息如何排列，等等。 **也可以给列的头部提供额外的信息：text to display, an optional image, alignment, and a script to invoke when the item is clicked(e.g. to sort the tree)**

		tree.column('size', width=100, anchor='center')
		tree.heading('size', text="Size")

- 对每item额外信息的赋值，可以单独给具体的column赋值，也可以提供一个列表来给多个column赋值。

		tree.set('widgets', 'size', '12KB')
		size = tree.set('widgets', 'size')
		tree.insert('', 'end', text=‘Listbox’, values=('15KB Yesterday mark'))

### item Appearance and Events ###

- 和text and canvas部件一样，treeview部件使用tags来修改树中的显示。 你能够通过"tags"配置选项，将一列表tags赋值给该item。

- tag的配置选项用于将被应用到相关的所有items. 可用的options包括"foreground"(text color), "background", "font", and "image"(not used if the item specifies its own image).

- 也可以基于tags创建事件绑定，来捕捉mouse clicks和keyboard events.

		tree.insert('', 'end', text='button', tags=('ttk', 'simple'))
		tree.tag_configure('ttk', background='yellow')
		tree.tag_bind('ttk', '<1>', itemClicked); #the item clicked can be found via tree.focus()

- treeview将生成virtual events"<TreeviewSelect>", "<TreeviewOpen>", "<TreeviewClose>"，可以通过这些事件来监控用户操作。

 
- 也可以使用"selection"方法来判定当前选择（the selection can also be changed from your program).


### 案例 ###

	#!C:\Users\damoncheng\AppData\Local\Programs\Python\Python35\python.exe

	from tkinter import *
	from tkinter import ttk
	
	def tree_event(event):
	    label_string.set(tree.selection())   
	
	root = Tk()
	
	label_string = StringVar()
	label = ttk.Label(root, text="label", textvariable=label_string)
	label_string.set("label")
	label.grid(column=0, row=0)
	
	tree = ttk.Treeview(root)
	tree['columns'] = ('size', 'text')
	tree.column('size', anchor='center')
	tree.column('text', anchor='center')
	tree.heading("size", text="Size")
	tree.heading("text", text="Text")
	
	tree.insert('', 'end', 'widgets', text='Widget Tour', values=(1, "123"))
	tree.insert('', 0, 'gallery', text='Applications')
	id = tree.insert('', 'end', text="Tutorial")
	tree.insert('widgets', 'end', text='Canvas')
	
	tree.bind('<<TreeviewSelect>>', tree_event)
	
	
	tree.grid(column=0, row=1)
	root.mainloop()

