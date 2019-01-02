## Text ##

- Text部件时支持管理多行文本的区域。 与Canvas部件一样，text部件时强大且灵活的被适用于各个任务（simple multi-line text area as part of a form, to a stylized code editor, to an outliner, to a web browser）。

		text = Text(parent, width=40, height=10)

### Text Basic ###

- 如果仅仅想要text部件支持多行文本，有仅仅很少的事情需要担心：creating and sizing the widget(check), providing an initial value for the text in the form, and retrieving the text in the widget after the user has submitted the form.

- Providing Initial Content

	- 不像entry部件，text部件不支持"textvariable"配置选项

	- 通过“insert”方法初始化text：
		
			text.insert('1.0', 'here is my text to insert')

			1.0是插入位置：第一行的第一个字符。 行是基于1开始，字符基于0开始

	- 在插入文本中利用"\n"转义字符，将添加新行。


- Scrolling ： 与scrollbar部件作用于listbox or canvas部件一样。

- Controlling Wrapping : 当一些行的文本比text部件的宽度更长，默认情况下文本将被wrap（包裹）到下一行。 可以通过修改"warp"配置选项来进行修改，其默认值是"char"，表示wrap一行结束右边的字符。"word"选项造成wrap，但是以单词为粒度warp(e.g.spaces)。 "none"不wrap。

- Disabling the Widget ： 在某些情境下，当条件不满足时，不允许编辑text部件，可以通过"state"配置选项来进行配置，设置"state"配置选项为"disabled"，要重新激活text部件时，设置“state”为"normal"

- Retrieving the Text

		thetext = text.get(1.0, 'end')


### Modifying the Text in Code ###

- 通过程序控制文本部件

- Text Positions and Indices

	Note：end的位置是在换行符前

		3.end
			The newline at the end of line 3.
		1.0 + 3 chars
			Three characters past the start of line 1.
		2.end -1 chars
			The last character before the new line in line 2.
		end -1 chars
			The newline that Tk always adds at the end of the text.
		end -2 chars
			The actual last character of the text.
		end -1 lines
			The start of the last actual line of text.
		2.2 + 2 lines
			The third character (index 2) of the fourth line of text.
		2.5 linestart
			The first character of line 2.
		2.5 lineend
			The position of the newline at the end of line 2.
		2.5 wordstart
			The first character of the word containing the character at index 2.5.
		2.5 wordend
			The first character just past the last character of the word containing index 2.5.

- Text插入定位额外说明：

	- The term "chars" can be abbreviated as "c", and "lines" as "l".
	- You can omit the spaces between the terms, e.g. "1.0+3c".
	- If you specify an index past the end of the widget (e.g. "end + 100c") it will be interpreted as the end.
	- Adding characters will wrap to the next lines as needed; e.g. "1.0 + 10 chars" on a line with only five characters will end up being on the second line.
	- When using indices containing multiple words, make sure to quote them appropriately so that Tk sees the entire index as a single argument.
	- When moving up or down a certain number of lines, this is interpreted as logical lines, where each line is terminated only by the "\n". With long lines and wrapping enabled, this may be represent multiple lines on the display. If you'd like to move up or down a single line on the display, you can specify this as **e.g. "1.0 + 2 display lines".**
	- To determine the actual canonical position of an index, use the **"index" method**, passing it the index expression, and it will return the corresponding index in the form "line.char".
	- You can compare two indices using the **"compare" method**, which lets you check for equality, whether one index is later in the text than the other, etc.

- Deleting Text

		text.delete('1.0', '2.0')

	- There is also a "replace" method, taking a starting index, and ending index and a string as parameters. It does the same as a delete, followed by an insert at the same location.


### Formatting with Tags ###

- 这一部分讲解格式化文本功能：such as bold, italic, striketrough, background colors, font sizes, and much more. 

- Tk text部件使用被称作tags的特征来实现格式化功能

- text中tags和canvas中tags的功能是不一样的，不过都是基于组的概念来做，text中tags组用来组格式，canvas中tags用来组item。

		text.tag_add('highlightline', '5.0', '6.0')

		在应用中生成tag


- 在使用insert方法插入文本时，tag是可选参数：

		text.insert('end', 'new material to insert', ('highlightline', 'recent', 'warning'))

- 在文本被应用了新格式后，新的tag将应用到entire phrase

- Applying Formatting to Tags

	- 创建tags
	
		text.tag_configure('highlightline', background='yellow', font='helvetica 14 bold', relief='raised')

	- “tag cget”方法查询tag的配置选项。

	- 同时应用多个tag可能会引起选项冲突，平台默认用最近tag的相关选项，可以同"tag raise"和"tag lower"方法来调整tag顺序。


### More Tag Manipulations ###

- 利用"tag delete"方法删除tag， 对tag的格式引用也将被移除。

- 可以通过"tag remove"方法移除文本中某一范围的tag引用。 虽然文本移除了tag效果，但是tag依然存在。

- “tag ranges”方法返回一个文本range列表，在这些文本range里面引用了该tag。

- There are also **"tag nextrange" and "tag prevrange"** methods to search forward or backward for the first such range from a given position

- “tag names”方法， 当不带参数调用时， 返回所有的tags。 如果带着一个index参数，it will return the list of tags applied to just the character at the index.

- Finally, you can use the first and last characters in the text having a given tag as indices, the same way you can use "end" or "2.5". To do so, just specify "tagname.first" or "tagname.last".


### Differences between Tags in Canvas and Text Widgets ###

- tag标签下的所有item被填充成红色，但是新加入tag的成员不会。

	canvas.itemconfigure('important', fill='red')
	canvas.create_rectangle(10, 10, 40, 40, tags=('important'))

	（canvas下的tag只group，不保存格式）

- 只要引用了该tag的文本都会被格式化：

	text.insert('end', 'first text', ('important'))
	text.tag_configure('important', foreground='red')
	text.insert('end', 'second text', ('important'))

	（text下的tag以group格式为主，group文本range只是功能需要）


### Events and Bindings ###

- 基于tag来绑定事件，对应tag范围的文本在被编辑时，会触发对应事件。

		text.tag_bind('important', '<1>', popupImportantMenu)

- Widget-wide binding to events works as it does for every other widget. Besides the normal low-level events, there are also two virtual events that will be generated: **<Modified> whenever a change is made to the content of the widget, and <Selection> whenever there is a change made to which text is selected.**

### Selecting Text ###

- 当选择发生改变时，<Selection> virtual event被触发，但是它不将告诉你那部分文本被选择。

- 因此text部件将自动的维护一个名为"sel"的tag，该sel关联当前被选择的文本。 因此可以使用"tag ranges"方法来定位被选择的文本。

- 同样，可以使用"tag add"和"tag remove"方法来控制"sel" tag选择的文本。

- text部件管理插入cursor的概念与selection分来，由下面的Marks章节给出

### Marks ###

- Marks actually don't refer to a position occupied by a character in the text, but specify a position between two characters.

- Tk自动的维护两个不同的marks. 第一个是"insert"，呈现当前插入光标的位置，As the cursor is moved (via mouse or keyboard), the mark moves with it。 第二个是“current” ，and reflects the position of the character underneath the current mouse position。

- 通过"mark set"方法来创建自己的marks, passing it the name of the mark, and an index (the mark is positioned just before the character at the given index).
该方法也可以用于移动一个存在的mark到不同的位置。 可以通过"mark unset"方法来移除mark，passing it the name of the mark. 如果删除了包含mark的文本，mark也被删除。

- The name of a mark can also be used as an index (in the same way "1.0" or "end-1c" are indices). You can find the next mark (or previous one) from a given index in the text using the "mark next" or "mark previous"methods. The "mark names" method will return a list of the names of all marks.

- mark有一个gravity的概念，which can be modified with the "mark gravity" method, which affects what happens when text is inserted at the mark. Suppose we have the text "ac", with a mark in between that we'll symbolize with a pipe, i.e. "a|c". If the gravity of that mark is "right" (the default) the mark will attach itself to the "c". If the new text "b" is inserted at the mark, the mark will remain stuck to the "c", and so the new text will be inserted before the mark, i.e. "ab|c". If the gravity is instead "left", the mark will attach itself to the "a", and so new text will be inserted after the mark, i.e. "a|bc".

### Images and Widgets ###

- 与canvas一样，text部件不仅可以包含文本，也可以包含images和另外的Tk部件(including a frame itself containing many other widgets)。

- Images are added to a text widget at a particular index, with the image normally specified as an existing Tk image. There are also other options that allow you to fine-tune padding and so on.

		flowers = PhotoImage(file='flowers.gif')
		text.image_create('sel.first', image=flowers)

- Widgets are added to a text widget pretty much the same way as images. The widget you're adding should be a descendant of the text widget in the overall window hierarchy.

		b = ttk.Button(text, text='Push Me')
		text.window_create('1.0', window=b)


### Even More ###

There are many more things that the text widget can do; here we'll briefly mention just a few more of them. For details on using any of these, see the reference manual.

- Search

	The text widget includes a powerful "search" method which allows you to locate a piece of text within the widget; this is useful for a "Find" dialog, as one obvious example. You can search backwards or forwards from a particular position or within a given range, specify your search using exact text, case insensitive, or using regular expressions, find one or all occurrences of your search term, and much more.

- Modifications, Undo and Redo

	The text widget keeps track of whether or not changes have been made to the text (useful to know whether you need to save it for example), which you can query (or change) using the "edit modified" method. There is also a complete multi-level undo/redo mechanism, managed automatically by the widget when you set its"undo" configuration option to true. Calling "edit undo" or "edit redo" then will modify the current text using information stored on the undo/redo stack.

- Eliding Text

	You can actually include text in the widget that is not displayed; this is known as "elided" text, and is made available using the "elide" configuration option for tags. You can use this to implement for example an outliner, a "folding" code editor, or even just to bury some extra meta-data intermixed with your text. When specifying positioning with elided text you have to be a bit more careful, and so commands that deal with positions have extra options to either include or ignore the elided text.

- Introspection

	Like most Tk widgets, the text widget goes out of its way to expose information about its internal state; we've seen most of this in terms of the "get" method, widget configuration options, "names" and "cget" for both tags and marks, and so on. There is even more information available that you can use for a wide variety of tasks. Check out the "debug", "dlineinfo", "bbox", "count" and "dump" methods in the reference manual.

- Peering

	The Tk text widget allows the same underlying text data (containing all the text, marks, tags, images, and so on) to be shared between two or more different text widgets. This is known as peering, and is controlled via the "peer" method.
