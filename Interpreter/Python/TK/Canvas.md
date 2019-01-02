## Canvas ##

- 一个canvas部件管理一个2D图像采集对象 - lines，circles，images，other widgets and more.

		canvas = Canvas(parent)

- canvas是Tk中比较强大的一个组件。It is suitable for a wide range of uses, including drawing or diagramming, CAD tools, displaying or monitoring simulations or actual equipment

- Creating Items：画布一开始是空白的，需要向里面添加Item描绘画布。

	- create a line:通过起点坐标和终点坐标决定一条直线，画布的左上角是原始点(0,0)，向左x值增加，向下y值增加。
	
			canvas.create_line(10, 10, 200, 50)

	- “create_line”方法将返回一个item id, 该id唯一关联该item; 每一个item在被创建后都会关联一个own id. 而对于哪些后面不会再继续处理的item，可以选择忽略该返回值。

	- 案例：
	
			#!C:\Users\damoncheng\AppData\Local\Programs\Python\Python35\python.exe
			
			from tkinter import *
			from tkinter import ttk
			
			lastx, lasty = 0, 0
			
			
			def xy(event):
			    global lastx, lasty
			    lastx, lasty = event.x, event.y
			
			def addLine(event):
			    global lastx, lasty
			    canvas.create_line(lastx, lasty, event.x, event.y)
			    lastx, lasty = event.x, event.y
			
			root = Tk()
			root.columnconfigure(0, weight=1)
			root.rowconfigure(0, weight=1)
			
			canvas = Canvas(root)
			canvas.grid(column=0, row=0, sticky=(N,W,E,S))
			canvas.bind("<ButtonPress-1>", xy)
			canvas.bind("<Button1-Motion>", addLine)
			
			root.mainloop()

	- 注意虚拟事件的一般模式为：**<modifier-modifier-type-detail>**， 其中type是核心，在上面是ButtonPress和Motion是type, Button1是modifier, 1是detail, 在Tk文档中bind章节有详细描述。

- Item Attributes : 在创建item的的时候，可以设置相关的属性，来确定其具体的呈现。

		canvas.create_line(10, 10, 200, 50, fill='red', width=3)

	- 具体可修改的属性，由item类型确定
	- 在初始化后，可以在后续修改属性：
	
			id = canvas.create_line(0, 0, 10, 10, -fill red)
			...
			canvas.itemconfigure(id, fill='blue', width=2)

- Bindings ： 可以对画布内的具体item进行事件绑定(or groups of them, as we'll see in the next section using tags)：

		canvas.tag_bind(id, '<1>', ...)

		Note the difference between the item-specific "tag_bind" method, and the widgetlevel"bind" method.

	- 通过rectangle items来验证item bind:

			color = "black"
			def setColor(newcolor):
				global color
				color = newcolor

			def addLine(event):
				global lastx, lasty
				canvas.create_line((lastx, lasty, event.x, event.y), fill=color)
				lastx, lasty = event.x, event.y

			id = canvas.create_rectangle((10, 10, 30, 30), fill="red")
			canvas.tag_bind(id, "<Button-1>", lambda x: setColor("red"))
			id = canvas.create_rectangle((10, 35, 30, 55), fill="blue")
			canvas.tag_bind(id, "<Button-1>", lambda x: setColor("blue"))
			id = canvas.create_rectangle((10, 60, 30, 80), fill="black")
			canvas.tag_bind(id, "<Button-1>", lambda x: setColor("black"))


- Tags : 我们看到每个canvas item都有一个唯一的id number, 但是有另外一个非常有用和强大的方式来引用item, 那就是使用tags.

	- 一个tag是自建的一个标识，将其与canvas items进行关联来标识items，每个item可以有许多tags。 而许多items也可以有同一个tag。

	- 在使用id的地方都可以使用tag。
	
	- tag在处理一组items时很有优势
	
	- tag配置选项分配tag，通过“addtag”增加tags,"dtags"移除tags,"gettags"得到tags列表（或者通过“find”命令获取指定tag对应id numbers列表）   

			For example:
			>>> c = Canvas(root)
			>>> c.create_line(10, 10, 20, 20, tags=('firstline', 'drawing'))
			1
			>>> c.create_rectangle(30, 30, 40, 40, tags=('drawing'))
			2
			>>> c.addtag('rectangle', 'withtag', 2)
			>>> c.addtag('polygon', 'withtag', 'rectangle')
			>>> c.gettags(2)
			('drawing', 'rectangle', 'polygon')
			>>> c.dtag(2, 'polygon')
			>>> c.gettags(2)
			('drawing', 'rectangle')
			>>> c.find_withtag('drawing')
			(1, 2)

	- 利用tag实例:

			Let's use tags first to put a border around whichever item in 
			our color palette is currently selected.
			def setColor(newcolor):
				global color
				color = newcolor
				canvas.dtag('all', 'paletteSelected')
				canvas.itemconfigure('palette', outline='white')
				canvas.addtag('paletteSelected', 'withtag', 'palette%s' % color)
				canvas.itemconfigure('paletteSelected', outline='#999999')
			
			id = canvas.create_rectangle((10, 10, 30, 30), fill="red", tags=('palette', 'palettered'))
			id = canvas.create_rectangle((10, 35, 30, 55), fill="blue", tags=('palette', 'paletteblue'))
			id = canvas.create_rectangle((10, 60, 30, 80), fill="black", tags=('palette', 'paletteblack', 'paletteSelected'))
			
			setColor('black')
			canvas.itemconfigure('palette', width=5)


			Let's also use tags to make the current stroke we're drawing 
			appear more visible; when we release the mouse we'll put it back 
			to normal.

			def addLine(event):
				global lastx, lasty
				canvas.create_line((lastx, lasty, event.x, event.y), fill=color, width=5, tags='currentline')
				lastx, lasty = event.x, event.y

			def doneStroke(event):
				canvas.itemconfigure('currentline', width=1)
				
			canvas.bind("<B1-ButtonRelease>", doneStroke)

- Modifying Items : 在前面的实例中，已经呈现了如何修改一个item的配置选项-its color, width and so on. 还有许多另外的事情可以基于item来做。

	- “delete”方法来删除items
	- "coords"方法来重新定位item的大小和位置。 当没有参数时，该方法放回当前的坐标。
	- “move”方法来基于当前位置移动。
	- items满足stack式显示，当碰到重叠部分的时候，可以通过"raise"方法和"lower"方法来调整stacking order。


- Scrolling :　画布可以比屏幕更大，可以通过设置scrollbar部件来支持。

	- 通过“width”和“height”从布局管理器申请画布初始呈现空间。
	- “scrollregion”配置选项来设定加入滚动条后，画布呈现大小。
	- 解决在加入滚动条后，“bind”命令依赖只能定位屏幕坐标，不能定位相对坐标问题：

         The "canvasx" and "canvasy" methods will translate the position onscreen (which bind is reporting) into the actual point on the canvas, taking into account scrolling.

	- 最终案例
	 
			#!C:\Users\damoncheng\AppData\Local\Programs\Python\Python35\python.exe
			
			from tkinter import *
			from tkinter import ttk
			
			lastx, lasty = 0, 0
			color = "black"
			
			
			def xy(event):
			    global lastx, lasty
			    #lastx, lasty = event.x, event.y
			    lastx, lasty = canvas.canvasx(event.x), canvas.canvasy(event.y)
			
			def addLine(event):
			    global lastx, lasty
			    #canvas.create_line(lastx, lasty, event.x, event.y, fill=color, width=5, tags="currentline")
			    x, y = canvas.canvasx(event.x), canvas.canvasy(event.y)
			    canvas.create_line((lastx, lasty, x, y), fill=color, width=5, tags="currentline")
			    lastx, lasty = x, y
			
			root = Tk()
			root.columnconfigure(0, weight=1)
			root.rowconfigure(0, weight=1)
			
			h = ttk.Scrollbar(root, orient=HORIZONTAL)
			v = ttk.Scrollbar(root, orient=VERTICAL)
			canvas = Canvas(root, scrollregion=(0, 0, 2000, 2000), yscrollcommand=v.set, xscrollcommand=h.set)
			h['command'] = canvas.xview
			v['command'] = canvas.yview
			ttk.Sizegrip(root).grid(column=1, row=1,sticky=(S,E))
			
			canvas.grid(column=0, row=0, sticky=(N,W,E,S))
			h.grid(column=0, row=1, sticky=(W,E))
			v.grid(column=1, row=0, sticky=(N,S))
			canvas.bind("<ButtonPress-1>", xy)
			canvas.bind("<Button1-Motion>", addLine)
			
			'''
			def setColor(newcolor):
			    global color
			    color = newcolor
			
			
			id = canvas.create_rectangle((10,10,30,30), fill="red")
			canvas.tag_bind(id, "<Button-1>", lambda x:setColor("red"))
			id = canvas.create_rectangle((10,35,30,55), fill="blue")
			canvas.tag_bind(id, "<Button-1>", lambda x:setColor("blue"))
			id = canvas.create_rectangle((10,60,30,80), fill="black")
			canvas.tag_bind(id, "<Button-1>", lambda x:setColor("black"))
			'''
			
			def doneStroke(event):
			    canvas.itemconfigure("currentline", width=1)
			
			canvas.bind("<B1-ButtonRelease>", doneStroke)
			
			def setColor(newcolor):
			    global color
			    color = newcolor
			    canvas.dtag("all", "paletteSelected")
			    canvas.itemconfigure("palette", outline="white")
			    canvas.addtag("paletteSelected", "withtag", "palette%s" % color)
			    canvas.itemconfigure("paletteSelected", outline="#999999")
			
			id = canvas.create_rectangle((10, 10, 30, 30), fill="red", tags=('palette', 'palettered'))
			canvas.tag_bind(id, "<Button-1>", lambda x:setColor("red"))
			id = canvas.create_rectangle((10, 35, 30, 55), fill="blue", tags=('palette', 'paletteblue'))
			canvas.tag_bind(id, "<Button-1>", lambda x:setColor("blue"))
			id = canvas.create_rectangle((10, 60, 30, 80), fill="black", tags=('palette', 'paletteblack', 'paletteSelected'))
			canvas.tag_bind(id, "<Button-1>", lambda x:setColor("black"))
			
			setColor('black')
			canvas.itemconfigure('palette', width=5)
			
			
			root.mainloop()


- Other item Types

	Besides lines and rectangles, there are a number of different types of items that canvas widgets support. Remember that each one has its own set of item configuration options, detailed in the reference manual.
	
	Items of type "line" can actually be a bit fancier than what we've seen. A line item can actually be a series of line segments, not just one; in our example, we could have chosen to use a single line item for each complete stroke. The line can also be drawn directly point-to-point, or smoothed out into a curved line.
	
	Items of type "rectangle" we've seen. Items of type "oval" work the same but draw as an oval. Items of type "arc" allow you to draw just a piece of an oval. Items of type "polygon" allow you to draw a closed polygon with any number of sides.
	
	Pictures can be added to canvas widgets, using items of type "bitmap" (for black and white), or type "image"(for full color).
	
	You can add text to a canvas using items of type "text". You have complete control of the font, size, color and more, as well as the actual text that is displayed.
	
	**Perhaps most interestingly, you can embed other widgets (which would include a frame which itself contains other widgets) into a canvas using an item of type "window". When we do this, the canvas in effect acts as a geometry manager for those other widgets. This capability raises all kinds of possibilities for your application.**
	
	There is a lot more to canvas widgets than we've described here; be sure to consult the reference manual, as well as the wide range of example programs included with the Tk distribution.