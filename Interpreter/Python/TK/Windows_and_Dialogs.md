## Windows and Dialogs ##
- 在之前，我们一直基于单窗口来操作。这一章的知识点将覆盖多窗口，改变窗口的各种属性，and use some of the standard dialog box windows that are available in Tk.

### Creating and Destroying Windows ###

- 创建new toplevel windows的方式和创建新的widgets方式一样。

		t = Toplevel(parent) 

- 摧毁一个window:

		window.destroy()

- 可以利用destroy摧毁任意一个部件，当摧毁一个窗口的时候，窗口的所有孩子会被摧毁。 so if you happen to destroy the root window(that all other widgets are descended from), that will normally end your application.

### Changing Window Behavior and Styles ###

- Window Title :　To examine or change the title of the window

		oldtitle = window.title()
		window.title('New title')

- Size and Location: In Tk, a window's position and size on the screen is known as its geometry. A full geometry specification looks like this:

		width*height(+ or -)x(+ or -)y

	- width和height含义是明显的
	- “x”（horizontal position）with a leading plus or minus, "+25"表示窗口的左边缘距离屏幕左边25pixels，“-50”表示窗口的右边缘距离屏幕右边50pixels。
	- “y”（vetical），“+10”表示窗口的上边缘距离屏幕顶部10pixels，“-100”表示窗口的下边缘距离屏幕底部100pixels。


			window.geometry("300*200-5+40")

### Stacking Order ###

- 通过栈顺序排序windows are "placed" on the screen, from bottom to top. 栈上面的window将覆盖栈下面的窗口（默认后创建的在顶部，满足栈属性）。

- 获取当前的栈顺序： 列出指定窗口下的所有子顶级窗口，并能够反映出堆栈关系

		root.tk.eval('wm stackorder '+str(window))

- 检查是否一个窗口是在另一个的上方（above） 或者 下方（below）。

		if (root.tk.eval('wm stackorder '+str(window)+' isabove '+str(otherwindow))=='1') ...
		if (root.tk.eval('wm stackorder '+str(window)+' isbelow '+str(otherwindow))=='1') ...

- 也可以上升或者下降window的堆栈顺序:

		window.lift()
		window.lift(otherwin)
		window.lower()
		window.lower(otherwin)


- 对部件也可以同lift和lower函数，这个在做分页的时候非常酷，很强大的功能：

	Wondering why you needed to pass a window to get the current 
	stacking order? **It turns out that stacking order, raise and lower, 
	etc. work not only for toplevel windows, but with any "sibling" 
	widgets (those having the same parent).** So if you have several 
	widgets gridded together but overlapping, you can raise and lower 
	them relative to each other. For example:

		from tkinter import *
		from tkinter import ttk
		root = Tk()
		little = ttk.Label(root, text="Little")
		bigger = ttk.Label(root, text='Much bigger label')
		little.grid(column=0,row=0)
		bigger.grid(column=0,row=0)
		root.after(2000, lambda: little.lift())
		root.mainloop()

		The "after" command schedules a script to be executed at a certain 
		number of milliseconds in the future, but allows normal processing 
		of the event loop to continue in the meantime.

### Resizing Behavior ###

- 默认情况下，顶级窗口都能够被重设大小，可以通过函数关闭它：
	
		window.resizable(FALSE,FALSE)

- Remember that if you've added a ttk::sizegrip widget to the window, that you should remove it if you're making the window non-resizable.

- 在允许重设大小环境下，也可以通过规定minimum或者maximum来设定窗口的最小值或者最大值。

		window.minsize(200,100)
		window.maxsize(500,500)

### Iconifying and Widthdrawing ###

- 控制当前窗口的状态

	“normal” 最小化状态
	“withdrawn” 隐藏状态，在状态栏都不可见
	“icon” 隐藏状态，在状态栏可见
	“zoomed” 最大化状态

On most systems, you can temporarily remove the window from the screen by iconifying it. In Tk, whether or not a window is iconified is referred to as the window's state. The possible states for a window include"normal" and "iconic" (for an iconified window), as well as several others: "withdrawn", "icon" or"zoomed".

You can query or set the current window state, and there are also the methods "iconify" and "deiconify"which are shortcuts for setting the "iconic" or "normal" states respectively.

	thestate = window.state()
	window.state('normal')
	window.iconify()
	window.deiconify()