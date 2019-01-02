## More Widgets ##

- 这章介绍几个更多的部件：listbox，scrollbar，text，progressbar，scale and spinbox。 这些部件在功能上更强大。

### Listbox ###

- 一个listbox显示一个列表的单行文本选项，常常比较长，允许用户通过列表浏览，选择一个或者多个。

- Listboxes are part of the classic Tk widgets; there is not presently a listbox in themed Tk widget set.

- Populating the Listbox Items

	- 有一个容易的方式和一个困难的方式来管理listbox中的items.
	
	- 容易的方式：每个listbox都有一个`listvariable` configure option, 从而允许其关联一个列表变量，列表中的每一项都是一个字符串，且作为listbox中的一个item。对listbox的add，remove，or rearrange可以通过多列表变量操作来实现。
	
	- 更老且困难的方式：使用listbox关联的方法来来操作其中的项：

		- The "insert idx item ?item... ?" method is used to add one or more items to the list; "idx" is a 0-based index indicating the position of the item before which the item(s) should be added; specify "end" to put the new items at the end of the list.
		 
		- Use the "delete first ?last?" method to delete one or more items from the list; "first" and "last"are indices as per the "insert" method.

		- Use the "get first ?last?" method to return the contents of a single item at the given position, or a list of the items between "first" and "last".

		- The "size" method returns the number of items in the list.


- 通过"selectmode" option来控制listbox是否支持多选，默认只支持单选（即"browse"模式），“extended”模式支持多选。

	- 使用"curselection"方法来获取当前的选择项，该方法返回当前选择项的下标（indices）。
	
	- 也可以使用"selection includesindex"方法来检查被给下标（index）的项是否被选择。

	- 可以通过“selection clear first ?last?”来改变选定，取消一部分选定。

	- 可以通过“selection set first ？last？”来重新选定。
	
	- 当重新选择的时候，应该保证被选择的对象在视野范围内。 具体的看："see index"方法。
	
	- 当选择被改变时，一个"ListboxSelect"虚拟事件会被触发， 可以将其与行为绑定，Depending on your application, you may also want to bind to a double-click"Double-1" event, and use it to invoke an action with the currently selected item。


- Stylizing the List ： Like most of the "classic" Tk widgets, 可以灵活的修改listbox的呈现， font，forground(text) and background colors for items in their normal state, when selected, when the widget is disabled, and so on.

	
	- 也有一个“itemconfigure”方法来该表单独项的foreground and background colors.
	

- Keeping Extra item Data : 常常可能需要将listbox中的项与一个具体的对象关联，有两种方法。

	- 方法一：通过map对象来关联，listbox中的项负责提供key
	- 方法二：通过双list来关联，相同索引号的对象关联

- 案例：

			#!C:\Users\damoncheng\AppData\Local\Programs\Python\Python35\python.exe
			
			from tkinter import *
			from tkinter import ttk
			
			root = Tk()
			
			countrycodes=('ar', 'au', 'be', 'br', 'ca', 'cn', 'dk', 'fi', 'fr', 'gr', 'in', 'jp',
			        'mx', 'nl', 'no', 'es', 'se', 'ch')
			
			countrynames=('Argentina', 'Australia', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', \
			        'Finland', 'France', 'Greece', 'India', 'Italy', 'Japan', 'Mexico', 'Netherlands', \
			        'Norway', 'Spain', 'Sweden', 'Switzerland')
			
			cnames = StringVar(value=countrynames)
			populations = {'ar':41000000, 'au':21179211, 'be':10584534, 'br':185971537, \
			'ca':33148682, 'cn':1323128240, 'dk':5457415, 'fi':5302000, 'fr':64102140, 'gr':11147000, \
			'in':1131043000, 'it':59206382, 'jp':127718000, 'mx':106535000, 'nl':16402414, \
			'no':4738085, 'es':45116894, 'se':9174082, 'ch':7508700}
			
			# Names of the gifts we can send
			gifts = { 'card':'Greeting card', 'flowers':'Flowers', 'nastygram':'Nastygram'}
			# State variables
			gift = StringVar()
			sentmsg = StringVar()
			statusmsg = StringVar()
			
			def showPopulation(*args):
			    idxs = lbox.curselection()
			    if len(idxs)==1:
			        idx = int(idxs[0])
			        code = countrycodes[idx]
			        name = countrynames[idx]
			        popn = populations[code]
			        statusmsg.set("The population of %s (%s) is %d" % (name, code, popn))
			    sentmsg.set("")
			
			def sendGift(*args):
			    idxs = lbox.curselection()
			    if len(idxs)==1:
			        idx = int(idxs[0])
			        lbox.see(idx)
			        name = countrynames[idx]
			        # Gift sending left as an exercise to the reader
			        sentmsg.set("Sent %s to leader of %s" % (gifts[gift.get()], name))
			
			c = ttk.Frame(root, padding=(5,5,12,0))
			c.grid(column=0, row=0, sticky=(N,W,E,S))
			root.grid_columnconfigure(0, weight=1)
			root.grid_rowconfigure(0, weight=1)
			
			lbox = Listbox(c, listvariable=cnames, height=5)
			lbox.grid(column=0, row=0, rowspan=6, sticky=(N,S,E,W))
			lbox.selection_set(0)
			lbox.bind("<<ListboxSelect>>", showPopulation)
			lbox.bind("<Double-1>", sendGift)
			root.bind("<Return>", sendGift)
			for i in range(0, len(countrynames), 2):
			    lbox.itemconfigure(i, background="#f0f0ff")
			
			
			lbl = ttk.Label(c, text="Send to country's leader")
			lbl.grid(column=1, row=0, padx=10, pady=5)
			
			
			g1 = ttk.Radiobutton(c, text=gifts['card'], variable=gift, value="card")
			g2 = ttk.Radiobutton(c, text=gifts["flowers"], variable=gift, value="flowers")
			g3 = ttk.Radiobutton(c, text=gifts["nastygram"], variable=gift, value="nastygram")
			g1.grid(column=1, row=1, sticky=W, padx=20)
			g2.grid(column=1, row=2, sticky=W, padx=20)
			g3.grid(column=1, row=3, sticky=W, padx=20)
			gift.set('card')
			
			send = ttk.Button(c, text="Send Gift", command=sendGift, default='active')
			send.grid(column=2, row=4, sticky=E)
			
			sentlbl = ttk.Label(c, textvariable=sentmsg, anchor="center")
			sentlbl.grid(column=1, row=5, columnspan=2, sticky=N, pady=5, padx=5)
			sentmsg.set("")
			
			status = ttk.Label(c, textvariable=statusmsg, anchor=W)
			status.grid(column=0, row=6, columnspan=2, sticky=(W,E))
			showPopulation()
			
			
			c.grid_columnconfigure(0, weight=1)
			c.grid_rowconfigure(5, weight=1)
			root.mainloop()
			
- 上面的案例如果有一个scrollbar就能够更好的反映listbox中数据的大小和方便拖动定位，下面的部件就用来补充这个功能。

### Scrollbar ###

- 当其他部件只能显示部分，且数据较大时，Scrollbar帮助用户看其他部件的所有部分。

		s = ttk.Scrollbar( parent, orient=VERTICAL, command=listbox.yview)
		listbox.configure(yscrollcommand=s.set)
	
- scrollbar和其关联的部件交流，需要通过调用scrolled widget的方法，而scrolled widget也需要调用scrollbar的方法。

- scrollbar的“orient”配置选项用于判定scroll是否使用"horizontal" or "vertical".

- 通过"command"配置选项和scrolled widget交流，来调用scrolled widget的方法。**而每个部件都有一个"yview"方法来支持垂直滚动（同理xview为横向滚动）。**

- scrolled widget需要将滚动信息反馈回scrollbar, 传递当前可见区域的状态，因此每个可滚动的部件（scrollable widget）都有**两个配置选项“yscrollcommand”和“xscrollcommand”来支持关联scrollbar的set方法，从而实现信息的反馈。**

- 如果需要将scrollbar滚动到一个指定的位置，可以通过调用"set first last"来实现，fisrt指向显示区域的开始，last指向结束。（**经过实验验证，在和listbox关联后，单独调用set方法没有效果，通过listbox的see方法，scrollbar会自动滚动到相应的位置**）

### SizeGrip ###

- We actually snuck in one new widget in that last example, the sizegrip. This is the little box at the bottom right corner of the window that allows you to resize it.

		ttk.Sizegrip(parent).grid(column=999, row=999, sticky=(S,E))

- While you'll notice that on some platforms (e.g. Mac OS X), Tk will automatically put the size grip there for you, it doesn't hurt to explicitly add it yourself. We'll discuss how to change the window size, determine if it's resizable, etc. in a later chapter.

### Text ###

- 一个text部件给用户提供一个多行文本输入框。 Text widgets are part of the classic Tk widgets, not the themed Tk widgets.

		t = Text(parent, width=40, height=10)

- The "width" and "height" options specify the requested screen size of the text widget, in characters and rows respectively. The contents of the text can be arbitrarily large. You can use the "wrap" configuration option to control how line wrapping is handled: values are "none" (no wrapping, text may horizontally scroll), "char" (wrap at any character), and "word" (wrapping will only occur at word boundaries).

- 可以设定text不可编辑，但是由于text部件不是a themed widget,所以不能用"state"和“instate”方法，而只能使用"sate"配置选项，设定它为"disabled" or "normal"。


- Scrolling works the same way as in listboxes. The "xscrollcommand" and "yscrollcommand" configuration options are available to attach the text widget to horizontal and/or vertical scrollbars, and the "xview" and"yview" methods are available to be called from scrollbars. To ensure that a given line is visible (i.e. not scrolled out of view), you can use the "see index" method, where index is in the form "line number.character number", **e.g. "5.0" for the first (0-based) character of line 5 (1-based).**


- text部件没有关联变量，通过get方法来获取文本，例如"get 1.0 end"，意思是从第一行第一个字符到文本最后，end是一个快捷标签表示最后一行最后一个字符。

- text部件也可以通过"insert index string"方法来增加内容，其中index是"line.char"格式，标记文本插入位置，end标签表示文本最后。

- text部件通过"delete start end"来删除文本 


### Progressbar ###

- progressbar用于反映一个长操作的进度：

		p = ttk.Progressbar(parent, orient=HORIZONTAL, length=200, mode='determinate')

- “orient”选项 ： “horizontal” or "vertical"。 

- "length"选项 : 呈现进度条所占像素

- “mode”选项 :  "determinate"表示可以确定相对进度。“indeterminate”表示可以不能确定相对进度，只能反映正在运行。

- determinate progress ： 通过"maximum"来设定总步骤数，默认是浮点数100。 通过“value”配置选项来反映当前进展数。 其以0开始，然后升高到maximum。 具体实现有两种方式，第一可以通过variable配置选项关联变量来更新value，第二可以通过"step ?amount?"方法来增加value的值(amount默认是1.0).

- indeterminate progress :　通过"start"方法来开始，通过"stop"方法来结束。


### Scale ###

- 一个scale部件提供一个方式来直接选择一个数值。


		s = ttk.Scale(parent, orient=HORIZONTAL, length=200, from_=1.0, to=100.0)

		Because 'from' is a reserved keyword, you'll need to add a trailing 
		underscore when using it as a configuration option.

- 上面option的作用显而易见，不用多说。有两种方式设置scale当前的值（这个值必须是在from和to之间），方式一是设定“value”配置选项，方式二是关联“variable”配置选项。
（或者调用“set value”方法改变值，“get”方法读取当前值）

- “command”配置选项来关联一个调用，当scale被改变的时候，该调用被触发。Tk will automatically append the current value of the scale as a parameter each time it invokes this script (we saw a similar thing with extra parameters being added to scrollbar callbacks and those on the widgets they scroll).

- As with other themed widgets, you can use the "state disabled", "state !disabled" and "instate disabled" methods if you wish to prevent the user from modifying the scale.

### Spinbox ###

- spinbox部件允许用户选择一个数（事实上可以选择一个列表中的任意项）。它需要和一个entry-like 部件绑定，entry-like部件负责显示当前的值，并拥有上下箭头来提供选择。

- Spinboxes是 part of the classic Tk widgets; there is not presently a spinbox in the themed Tk widget set.

		spinval = StringVar()
		s = Spinbox(parent, from_=1.0, to=100.0, textvariable=spinval)

- 其他option与scale相似，但是Spinbox有一个“increment”选项，来指定每次加减的跳跃值。

- 与listbox or combobox一样，spinbox可以通过"values"选项来规定一个选择列表，而忽略from和to配置选项。 （即spinbox也可以用于选择字符串）

- “warp”选项接受一个boolean类型的值，and determines whether the value should wrap around when it goes beyond the starting or ending values. You can also specify a "width" for the entry holding the current value of the spinbox.

- textvariable，set value方法，get方法，都可以对当前部件的值进行操作。

- “command”配置选项用于关联调用，当spinbox改变时，触发该调用。

		 The command has a couple of percent substitutions, %s = current 
		value, and %d = up or down. Need to figure out the right way to 
		specify this in Ruby. Also need to add stuff about validation.

- Because spinbox is not a themed widget, the "state" and "instate" methods are not available. Instead, you can change its state using the "state" configuration option. This may be "normal", "disabled" to prevent any changes.


