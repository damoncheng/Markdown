## Basic Widgets ##

- 这一章介绍在任何用户接口都能看见的基本TK部件：frame, labels, buttons, checkbuttons, radiobuttons, entries and comboboxes. 在最后，你将知道怎样使用所有的widgets you'd ever need for a typical fii-in form type of user interface. 

### Frame ###

- Frame是一个矩形容器，被使用放置其他部件，它可以被geometry manager控制布局 such as grid.

- Frame创建方式：frame = ttk.Frame(parent)

- Frame配置选项：

	- Requested Size:一般Frame的大小由其包含的控件大小和布局有决定。 当想要精确的设定frame的大小时，可以通过设定"width"和 "height"配置选项来设定。
	
	- Padding:该选项一般用于要求额外的空间inside of the widget, 例如，如果将此选项用于frame，frame里面的部件周围就会有一些空白。 a single number规定所有方向的空白，a list of two numbers中，第一个数规定横向padding, 第二个数规定竖向padding, a list of four number 规定 the left, top, right and bottom padding, in that order.
	
			frame['padding'] = (5,10) 


	- Borders:`borderwidth`选项和`relief`共同决定边框风格，relief风格有："flat"(default), "raised", "sunken", "solid", "ridge", or "groove".

			frame['borderwidth'] = 2
			frame['relief'] = 'sunken'

	- Changing Styles: There is also a "style" configuratoin option, which is common to all of the themed widgets, which can let you control just about any aspect of their appearance or behavior. This is a bit more advanced, so we won't go into it right now.

			正式由于过度的使用选项，导致Tk的应用下降，因此，
			在当前Tk的themed version中，许多选项（foreground 
			color,background color,font,highlight 
			thickness,selected foreground color, padding,etc）
			都没有了，通过style选项来完成任务。

### Label ###

- a label是一个用于显示text或者images的部件，通常label只用于看，不用于交互。Labels are used for such things as identifying controls or other parts of the user interface, providing textual feedback or ersults, etc.

- label = ttk.Label(parent, text="Full name:")

- label的配置选项: 

	- Displaying Text: 可以通过textvariable变量来关联Label,进行label的访问和修改。
		
			resultContents = StringVar()
			label["textvariable"] = resultContents
			resultsContents.set("New value to display")

	- Displaying Images: 
	
			image = PhotoImage(file="myimage.gif")
			label['image'] = image

			可以文本和图片一起使用，通过"compound"选项来实现，这个选
			项的默认值是none, 意味着如果图片呈现，仅仅显示图片，否则
			显示"text"或者"textvariable"呈现的文本。另外的选项还有：
			"text(text only)", "image"(image only), "center"
			(text in center of image), "top"(image above text),
			"left", "bottom" and "right"。
	
	- Layout: Label宏观上的布局由geometry manager控制，有几个选项来控制其在GM中微观显示（within the box the geometry manager gives it）。 
	
		如果被给的box比label要求的内容更大，可以使用"anchor"选项规定
		what edge or corner the label should be attached to, 
		which would lwave any empty space in the opposite edge or corner. 被规定的可能罗盘方向有："n"(north, or top edge), 
		"ne"(north-east, or top right corner), "e", "se", "s"
		"sw", "w", "nw" or "center".

		当Label内的text有多行的时候，可以使用“\n”来在"text"/"textvariable" string中换行，也可以使用“wraplength”选项来规定一个长度，使得text多行显示。

		也可以使用“justify”选项来控制文本的缩进，“left”, "center",
		"right", 如果仅仅是单行文本，使用"anchor"选项是足够的，但是
		当多行的时候，该选项是非常有用的。	

	- Fonts, Colors and More : Like with frames, normally you don't want to touch things like the font and colors directly, but if you need to change them(e.g. to create a special type of label), this would be done via creating a new style, which is then used by the widget **with the "style" option**.

		与其他部件不同，label可以提供一些额外的option, 而不用依赖于style配置选项：
	
			font选项：
				TkDefaultFont
					The default for all GUI items not otherwise specified.
				TkTextFont
					Used for entry widgets, listboxes, etc.
				TkFixedFont
					A standard fixed-width font.
				TkMenuFont
					The font used for menu items.
				TkHeadingFont
					The font typically used for column headings in lists and tables.
				TkCaptionFont
					A font for window and dialog caption bars.
				TkSmallCaptionFont
					A smaller caption font for subwindows or tool dialogs
				TkIconFont
					A font for icon captions.
				TkTooltipFont
					A font for tooltips.

		   	"foreground" and "background" 选项.

				Colors 选项 as either color names (e.g. "red") or hex RGB codes (e.g. "#ff340a").

			relief 选项



### Button ###

- A button, 不像a frame or a label, 常常以和用户交互的角色来被设计，来实现一些行为。和Labels一样，其可以显示text or images, 但是其也有一些新的选项来控制其行为。

- button = ttk.Button(oparent, text='Okay', command=submitForm) 

- Button的配置选项

	- Text or Image : Button同样通过"text", "textvariable"（raely used）,"image" and "compound" configuration options 来控制button是显示文本还是图片。

		button有一个“default” option, 该选项默认是"normal"值， 当该选项被设置为“active”时，该选项的border会高亮，响应事件方面，无论“default”选项为什么值都没有影响，因此想要该button在"active"时，可以响应Enter or Return按钮操作，需要自己关联处理。	

	- The Comamand Callback : "command"选项被使用在button的行为和你的应用之间提供一个接口。当用户点击button的时候，the script provided by the option is evaluated by the interpreter.

			button.invoke()


	- Button State : Buttons and many other widgets can be in normal state where they can be pressed, 但是也可以被设置为disabled state, where the button is greyed out and cannot be pressed. This is done the button's command is not applicable at a given point in time.

		**All themed widgets carry with them an internal state,which is a series of binary flags. you can set or clear these flags,** 也可以通过"state"和"instate"方法检查当前的设定。 Button make use of the "disabled" flag to control whether or not the user can press the button. For example：

			button.state(['disabled']) ;# set the disabled flag, disabling the button
			button.state(['!disabled']) ;# clear the disabled flag
			button.instate(['disabled']) ;# return true if the button is disabled, else false
			button.instate(['!disabled']) ;# return true if the button is not disabled, else false
			button.instate(['!disabled'], cmd) ;# execute 'cmd' if the button is not disabled

		ttk::widgets里面对state有详细的描述，既有配置选项的描述，也有方法的描述。

### Checkbutton ###

- A checkbutton 就像a regular button一样，能够被按并触发事件，但是它也持有一个二进制值。 **因此checkbutton一直作为二选一的部件使用（1 or 0）**。

		measureSystem = StringVar()
		check = ttk.Checkbutton(parent, text='Use Metric',
				command=metricChanged, variable=measureSystem,
				onvalue='metric', offvalue='imperial')

- checkbutton使用许多与a regular button一样的option,`textvariable`选项与text显示关联，前面已经描述过，`variable`选项指定关联checkbutton触发状态的变量，默认情况下，1 for checked, 0 for not checked, 但是默认值可以被改变，通过"onvalue"选项和"offvalue"选项。

- checkbutton有三种状态，即除了checked, not checked, 还有一个第三状态`tristate`状态，该状态下，checkbutton holds a single dash rather than being empty or holding a check mark. 当处在这种状态时，checkbutton的`alternate`标志被设定，因此可以通过该标志来检查checkbutton是否处于第三状态：

		check.instate([‘alternate’])

		because the checkbutton won't automatically set(or create) the 
		linked variable, your program needs to make sure it sets the 
		variable to the approprite starting value.

### Radiobutton ###

- Radiobutton负责作为多选一的，且只能选一个（checkbutton支持多选），Raiobuttons常常基于一个集合使用，当集合中的选项数量是较少的时候，是一个好的选择。

		phone = StringVar()
		home = ttk.Radiobutton(parent, text='Home', variable=phone, value='home')
		office = ttk.Radiobutton(parent, text='Office', variable=phone, value='office')
		cell = ttk.Radiobutton(parent, text='Mobile', variable=phone, value='cell')

- Radiobuttons与checkbutton的大多数配置选项是一样的，一个例外是，Radiobuttons使用"value"代替"onvalue"和"offvalue"选项，集合中的每个元素都关联同一个变量，但是对应不同的值。 当对应的值被赋值给关联变量时，对应的Radiobutton也会被选则。 **当关联的变量没有被设定的时候，radiobutton会处于"tristate"状态，可以通过"alternate"标志来检查，此时该标志位状态为1**

### Entry ###

- entry给用户呈现一个单行文本区域，用于输入a string value. These can be just about anything: their name, a city, a password, social security number, and so on.

		username = StringVar()
		name = ttk.Entry(parent, textvariable=username)

- "width"配置选项可以用来规定entry能够容纳的字符数。

-  Note that unlike the various buttons, entires don't have a separate text or image beside them to identify them; use a separete label widget for that.

-  也可以直接get or change entry部件中的值，不用关联textvariable变量，"get"方法返回the current value, and the "delete"和"insert"方法让你改变内容。

		print('current value is %s' % name.get())
		name.delete(0,'end') ; # delete between two indices, 0-based
		name.insert(0, 'your name') ; # insert new text at a given index

- Note that entry widgets do not have a "command" option which will invoke a callback whenever the entry is changed. To watch for changes, you should watch for changes on the linked variable. See also "Validation", below.

- Entries可以被作为密码使用，通过show配置选项规定显示的字符。

- 和其他button一样，entries可以被设置为disabled状态，**通过"state"命令(and queried with "instate")**。 entires can also use the state flag **"readonly"**；如果设定，用户不能改变entry, 但是可以选择性粘贴文本。 还有一个"invalid"状态，

- Validation（事件响应）

		validate (controls overall validation behavior)
		none(default)
		key(on each keytroke, runs before prevalidation)
		focus/focusin/focusout(runs after revalidation)
		all
			* validatecommand script(script must return 1 or 0)
			* invalidcommand script(runs when validate command returns 0)
				- various substitutions in scripts...most useful %P(new 
					value of entry), %s(value of entry prior to editing)
				- the callbacks also modify the entry using insert/	
					delete, or modify-textvariable, which means the in 
					progress edit is rejected in any case(since it would 
					overwrite what we just set)
			*.e validate to force validation now 

### Combobox ###
- A combobox combines an entry with *a list of choices available to the user. 

		countryvar = StringVar()
		country = ttk.Combobox(parent, textvariable=countryvar)

- 和entires一样， "textvariable"选项关联一个变量，然后该变量关联当前具体的选择值，与其他部件一样，这个linked variable不将自动的被设定，要通过get, set方法来获取或者改变当前的值。

- **A combobox will generate a "<ComboboxSelected>" virtual event that you can bind to whenever its value changes.**
 
		country.bind('<<ComboboxSelected>>', function)

- Predefined Values :你能够通过`values`配置选项，提供一个预先设定好的list列表来：

		country["value"]=('USA', 'Canada', 'Australia')

- 如果设定"readonly" state flag将限制用户只能选择不能修改。

- 也可以通过"get" 和 "set"方法完成相关操作，也可以使用"current"方法获取当前选择的值，(call "current" with no arguments, it will return a 0-based index into the list, or -1 if the current value is not in the list), or **select one of the items in the list (call"current" with a single 0-based index argument).**