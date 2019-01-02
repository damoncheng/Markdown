## Introduction ##

- Tk 8.5 版本，较之前的Tk版本，差距较大，是Tk的一个里程碑。

- Tk 8.5 版本后，可以做出现代化的桌面，且不会很复杂。

- 许多Tk Extensions不支持最新版本的conventions or styles,因此选用Tk Extensions的时候，一定要慎重确定该Tk extensions是否支持最新版本，否则会引起桌面不和谐。

## TK Concepts ##

- Tk有三个主要的概念 ：　widgets, geometry management, and event handling.

### Widgets ###

- 我习惯称它为部件，a button, and entry, a few labels, and a frame, ckeckboxes, tree views, scrollbars, text areas. 这些都是部件。

- 部件常常被作为"controls"。 常常也被作为"windows" ，paricularly in Tk's documentation, a holdover from its X11 roots(so under that terminology, both a toplevel window and things like a button would be called windows)。

- widgets对象，是类的实例化。

- 每个widget都是一个Python对象，当创建一个widget时，必须传递它的parent作为参数来创建该对象。 “root” window除外，由于它是顶级窗口。

- 当一个widgets会发生文本改变的时候，常常会和一个textvariable关联。

- 所有的部件都有许多配置选项（configuration options），来决定显示(displayed) 和 行为(behave)。 这些options的可用性依赖于widget的类别。

### Geometry Management ###

- 如果只是创建widgets是不能将其显示到屏幕上的，还需将精确的指定其呈现在窗口的什么位置， 这是一个分开的步骤，称其为geometry management。

- grid是Tk中最常用的geometry manager. 

- 一个geometry manager的工作是精确的指定widgets如何被放置，一个好的geometry manager提供flexibility, power and case of use that makes programers happy。 Tk的grid毫无疑问是最好中的一个。

- 在Geometry manager中，如何将所有的widgets合适的放入window中是一件比较复杂的事情，其需要做以下这些事情来平衡冲突：

	- The widgets may have a "natural" size(e.g. the natural width of a label would normally be determined by the text and font in it), 但是顶层所有widgets自适应，将导致其不是足够大来容纳他们，geometry manager必须决定哪些widgets收缩来适应整个页面的布局。
	
	-  如果顶层窗口是比所有widgets的自然大小还大，其额外的空间如何被使用？这些额外的空间需要被分配给各widgets吗？如果需要，这些空间怎样被分配？Is it used to make certain widgets bigger than they mormally want to be?
	
	- 如果顶层窗口（toplevel window）被重新刷新大小(resize)了，widgets的大小和位置如何改变？ will certain areas(e.g. a text entry area)expand or shrink, while other parts stay the same size, or is the area distributed differently? Do certain widgets have a minimum(or maxmum) size that you want to avoid going under(over).
	
	- How can widgets in different parts of the user interface be aligned with each other, to present a clean layout and match platform guidelines to do with inter-widget spacing?  
	
	- For a complex user interface, which may have many frames nested in other frames nested in the window(etc.), how can all the above be accomplished, trading off the conflicting demands of different parts of the entire user interface? 

- How it Works : Geometry management in Tk 依赖于master and slave widgets的概念. 一个master是一个widget, 典型的是一个toplevel window or a frame, which will contain other widgets, which are called slaves. 你可以理解为，a geometry manager是为了控制master widget, 决定其如何显示内部widgets。

- Geometry management ask each slave widget for its natural size,  or how large it would ideally like to be displayed. 它然后它结合程序提供的参数来管理特别的slave widget如何被显示。 在我们的案例中，我们传递column和row来指定每个widget的显示位置，也通过sticky参数来决定widget如何被aligned或者possibly streched。我们也使用columnconfigure和rowconfigure来指示指定的columns和rows，来扩展窗口中额外的空间。 当然，这些参数都适用于grid。 另外的geometry managers将使用不同的参数来进行管理。

- The geometry manager 获取关于slaves的所有信息，as well as the information about how large the master is, and uses its internal algorithms to determine the area each slave will be  allocated(if any!). The slave is then responsible for drawing etc. within that particular rectangle. 任何时候master大小的改变（顶级窗口大小的改变），the natureal size of a slave changes将改变，或者any of geometry manager parameters change(e.g. like "row", "column", or“sticky”)we repeat the whole thing.

### Event Handling ###

- In Tk, 大多数user interface toolkits, 有一个event loop接收来自操作系统的事件. 这些事件包括button presses, keystrokes, mouse movement, window resizing, and so on. 一般由TK管理这个event loop。

- Command Callbacks : often though you want your program to handle particular events, for example doing something when a button is pushed. For those events that are pretty much essential to customize(what good is a button without something happening when you press it?), the widget will provide a callback as a widget configuration option. we saw this in the example with the **"command"** option of the button.

- Event Bindings: 对于一些事件，没有命令回调与他们关联，你能够使用Tk's "bind"来捕捉任何事件，然后（like with callbacks）执行任意一块代码，下面以label作为实例，来呈现对不同事件的响应绑定：

		from tkinter import *
		from tkinter import ttk
		root = Tk()
		l =ttk.Label(root, text="Starting...")
		l.grid()
		l.bind('<Enter>', lambda e: l.configure(text='Moved mouse inside'))
		l.bind('<Leave>', lambda e: l.configure(text='Moved mouse outside'))
		l.bind('<1>', lambda e: l.configure(text='Clicked left mouse button'))
		l.bind('<Double-1>', lambda e: l.configure(text='Double clicked'))
		l.bind('<B3-Motion>', lambda e: l.configure(text='right button drag to %d,%d' % (e.x, e.y)))
		root.mainloop()

- Virtual Events :　Beyone the low-level operating system events like mouse clicks and window resizes, many widgets generate higher level events called virtual events. For example, a listbox widget will generate a "ListboxSelect" virtual event anytime the selection changes, regardless of whether that was because the user clicked on an item, moved to it with the arrow keys, or whatever. This avoids the problem of setting up multiple, possibly platform-specific event bindings to capture the change. **Virtual events for a widget, if any, will be listed in the widget's documentation.**

- Multiple Bindings : Widgets can actually have a number of different event bindings trigger for a single event. Normally, events can be set up for: the individual widget itself, all widgets of a certain class(e.g.buttons), the toplevel window containing the widget, and all widgets in the application. Each of these will fire in sequence.

	we saw this in our example when we set up a binding for the Return key on the toplevel window, and that applied to every widget within that window.

		The default behavior of each widget class in Tk is 
		itself defined with script-level event bindings, 
		and so can be introspected and modified to alter 
		the behavior of all widgets of a certain class. 
		You can even completely modify the handling of 
		this multiple sequence of events for each widget; 
		see the "bindtags" command reference if you're 
		curious.