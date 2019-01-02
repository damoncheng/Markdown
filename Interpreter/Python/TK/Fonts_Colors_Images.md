## Fonts,Colors,Images ##

- 这一章描述Tk如何处理fonts, colors and images. 前面我们已经提到过，但是这个我们做更深入的处理。

### Fonts ###

- 不要使用硬编码，代码不易维护

- 几个部件（label，text，canvas等）允许规定显示文本的字体，通过"font"配置选项。在通常情况下，默认字体是比较合适的，但是在某些具体的情况下，需要重新对字体进行配置。

- ttk部件没有"font"配置选项，与classic Tk widgets不一样。 ttk规定"font"的方法与css stylesheets相似。

- Rather than modifying individual widgets, the correct approach in the themed widgets is to specify the fonts used in a style, and then use that style for the individual widget. This is akin to the difference between hardcoding display-oriented markup like font tags inside HTML pages,vs. using CSS stylesheets that keep all the display specific information in one place.

- Standard Fonts :　标准字体抽象了平台的不同

		TkDefaultFont        The default for all GUI items not otherwise specified.
		TkTextFont		     Used for entry widgets, listboxes, etc.
		TkFixedFont		     A standard fixed-width font.
		TkMenuFont	         The font used for menu items.
		TkHeadingFont	     The font typically used for column headings in lists and tables.
		TkCaptionFont	     A font for window and dialog caption bars.
		TkSmallCaptionFont   A smaller caption font for subwindows or tool dialogs
		TkIconFont			 A font for icon captions.
		TkTooltipFont		 A font for tooltips.

- Platform-Specific Fonts

- Named Fonts(创建自己的字体)

		from tkinter import font
		appHighlightFont = font.Font(family='Helvetica', size=12, weight='bold')
		ttk.Label(root, text='Attention!', font=appHighlightFont).grid()

		"font"规定字体名：Courier, Times, and Helvetica被保证支持，其他的必须要被安装才支持：
		可以用font.families()来定位。

		"size"选项规定字体的大小。

		“weight”选项可以是bold or normal.

		"slant"选项为roman(normal) or italic.

		 "underline"和"overstrike"是布尔类型.

- Font Descriptions

	Another way to specify fonts is via a list of attributes, starting with the name of the font, and then optionally including a size, and optionally one or more style options. Some examples of this are "Helvetica", "Helvetica 12", "Helvetica 12 bold", and "Helvetica 12 bold italic". These font descriptions are then used as the value of the "font" configuration option, rather than a predefined or named font.

### Colors ###

- 与字体一样，有各种方式来规定颜色。 在大多数情况下，系统提供正确的颜色。

- 可以通过RGB("#3FF" or "#FF016A"). 最后，Tk认识一组color names，除了非常常用的
“red”，“black“被较频繁的使用，其他一般不被使用。

- For themed Tk widgets, colors are often used in defining styles that are applied to widgets, rather than applying the color to a widget directly.

### Images ###
- 我们已经看见怎样使用images, 并且在labels或者buttons中显示他们。

		imgobj = PhotoImage(file='myimage.gif')
		label['image'] = imgobj

- Out of the box, Tk includes support for GIF and PPM/PNM images. However, **there is a Tk extension library called "Img" which adds support for many others: BMP, XBM, XPM, PNG, JPEG, TIFF, etc. Though not included directly in the Tk core,** Img is usually included with other packaged distributions (e.g. ActiveTcl).



### 案例 ###
	#!C:\Users\damoncheng\AppData\Local\Programs\Python\Python35\python.exe
	
	from tkinter import *
	from tkinter import ttk
	from tkinter import font
	
	root = Tk()
	
	appHighlightFont = font.Font(family="time", size=12, weight="bold")
	l = ttk.Label(root, text="Label", font=appHighlightFont, foreground="#3FF")
	l.grid(column=0, row=0)
	
	imgobj = PhotoImage(file='img/desktop.png')
	b = ttk.Button(root, compound="none", image=imgobj)
	
	b.grid(column=0, row=1)
	
	root.mainloop()




