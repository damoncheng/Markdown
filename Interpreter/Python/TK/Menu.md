## Menus ##

- 这一章讨论怎样处理menubars和popup menus in Tk. 这两个区域是一个完美应用程序的必备部分。 
- Menu的实现与平台相关，用`root.tk.call('tk','windowingsystem')`来判断当前系统。

### Menubars ###

- In this section we'll look at menubars ： how to create them, how they're used, and so on.

- menubars => submenus

### Before you Start ###

- 将`root.option_add('*tearOff', FALSE)`放在应用程序某处，without it, each of your menus(on Windows and X11) will start with what looks like a dashed line, and allows you to "tear off" the menu so it appears in its own window. You really don't want that there.

### Creating a Menubar ###

- In Tk, menubars与individual windows关联，每个toplevel window最多能有一个menubar. On Windows and X11上，这个视觉效果更明显，menus是每个window的一部分，在title bar的下面。

- **As noted, the menu widget must be a child of the toplevel window.** 
  **root 也是一个顶级窗口，所以root可以充当win的角色**

		案例1：
		win = Toplevel(root)
		menubar = Menu(win)
		win['menu'] = menubar

		案例2：
		#!C:\Users\damoncheng\AppData\Local\Programs\Python\Python35\python.exe

		from tkinter import *
		from tkinter import ttk
		
		
		def newFile():
		    pass
		
		root = Tk()
		root.option_add('*tearOff', FALSE)
		
		menubar = Menu(root)
		root['menu'] = menubar
		
		menubar.add_command(label='New', command=newFile)
		
		root.mainloop()

- Adding Menu

		menu_file = Menu(menubar, name="file")
		menubar.add_cascade(menu=menu_file,label="File")

- Adding Menu Items

		menu_file.add_command(label='New', command=newFile)
		menu_file.add_command(label='Open...', command=openFile)
		menu_file.add_command(label='Close', command=closeFile)

		So adding menu items to a menu is essentially the same as adding a submenu, 
		but rather than adding a menu item of type "cascade", 
		we're adding one of type "command"

- 除了追加items到尾部，还可以通过"insert index type ?option value...?"方法将item插入到“index”位置(0..n-1), 也可以使用"delete index"方法删除指定item

- Types of Menu Items

	- "command" menu items : 被点击后触发响应事件。
	- "cascade" menu items : 作为一个子菜单被增加到menubar。
	- "separator" menu items :　用于分开不同menu items的dividing line。
 
			menu_file.add_separator()

	- "checkbutton" and "radiobutton" menu items : 与"checkbutton"和"radiobutton" 部件类似，这些菜单项有一个variable关联，and depending on the value of that variable, will display an indicator (i.e. a checkmark or a selected radiobutton) next to the item's label

			check = StringVar()
			menu_file.add_checkbutton(label='Check', variable=check, onvalue=1, offvalue=0)
			radio = StringVar()
			menu_file.add_radiobutton(label='One', variable=radio, value=1)
			menu_file.add_radiobutton(label='Two', variable=radio, value=2)

		**As with command items, checkbutton and radiobutton menu items do accept a "command" configuration option**

- Accelerator Keys : "accelerator" option被使用指示一个与该menu关联的menu accelerator, 该选项仅仅在menu item旁边放置一个accelerator说明，并不创建加速器. **You still need to create a binding for the accelerator yourself**.

	Accelerators are very platform specific, not only in terms of which keys are used for what operation, but what modifier keys are used for menu accelerators (e.g. on Mac OS X it is the "Command" key, on Windows and X11 it is usually the "Control" key). Example of valid accelerator options are "Command-N", "Shift+Ctrl+X", and"Command-Option-B". Commonly used modifiers include "Control", "Ctrl", "Option", "Opt", "Alt", "Shift", "Command", "Cmd" and "Meta").

### More on Item Options ###

- 下面是menu items更常用的选项

- Underline

    While all platforms support keyboard traversal of the menubar via the arrow keys, on Windows and X11, you can also use other keys to jump to particular menus or menu items. The keys that trigger these jumps are indicated by an underlined letter in the menu item's label. If you want to add one of these to a menu item, you can use the "underline" configuration option for the item. The value of this option should be the index of the character you'd like underlined (from 0 to the length of the string - 1).

- Images

	It is also possible to use images in menu items, either beside the menu item's label, or replacing it altogether. To do this, you can use the "image" and "compound" options, which work just like in label widgets. The value for "image" must be a Tk image object, while "compound" can have the values "bottom", "center", "left","right", "top" or "none".

- State

	It is also possible to disable a menu, so that the user cannot select it. This can be done via the "state" option, setting it to a value of "disabled", or a value of "normal" to reenable the item.

### Querying and Changing Item Options ###

- 获取menu items当前option状态，方法1：通过相对索引来获取指定option，方法2：通过label关联具体的menu item，来修改或者获取指定option的值。
	
		print( menu_file.entrycget(0, 'label'))
		menu_file.entryconfigure('Close', state=DISABLED)
		print( menu_file.entryconfigure(0))


### Contextual Menu ###

- Contextual menus("popup" menus)是一个鼠标右击产生menu，A menu pops up at the location of the mouse cursor, and the user can select from one of the items in the menu (or click outside the menu to dismiss it without choosing any item).

- 要激活popup menu, 需要进行事件绑定，在不同的平台上绑定的事件不一样, **On Windows and X11, this is the right mouse button being clicked (the third mouse button).** On Mac OS X, this is either a click of the left (or only) button with the control key held down, or a right click on a multi-button mouse. Unlike Windows and X11, Mac OS X refers to this as the second mouse button, not the third, so that's the event you'll see in your program.

- 平台通用案例

		from tkinter import *
		root = Tk()
		menu = Menu(root)
		for i in ('One', 'Two', 'Three'):
			menu.add_command(label=i)
		if (root.tk.call('tk', 'windowingsystem')=='aqua'):
			root.bind('<2>', lambda e: menu.post(e.x_root, e.y_root))
			root.bind('<Control-1>', lambda e: menu.post(e.x_root, e.y_root))
		else:
			root.bind('<3>', lambda e: menu.post(e.x_root, e.y_root))