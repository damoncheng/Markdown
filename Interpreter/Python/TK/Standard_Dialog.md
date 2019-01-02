### Standard Dialogs ###

- Dialog boxes are a type of window used in applications to get some information from user, inform them that some event has occured, confirm an action and more.


### Slecting Files and Directories ###

- 看函数名就能理解其含义

		from tkinter import filedialog
		filename = filedialog.askopenfilename()
		filename = filedialog.asksaveasfilename()
		dirname = filedialog.askdirectory()

- There are a variety of different options that can be passed to these dialogs, allowing you to set the allowable file types, default filename, and more. These are detailed in the getOpenFile/getSaveFile and chooseDirectory reference manual pages.

### Selecting Colors ###

- 颜色对话框用于选颜色，将返回一个颜色值，可以用"initialcolor"选项设置初始颜色。

		from tkinter import colorchooser
		colorchooser.askcolor(initialcolor='#ff0000')	

### Alert and Confirmation Dialogs ###

		from tkinter import messagebox
		messagebox.showinfo(message='Have a good day')

		messagebox.askyesno(
			message='Are you sure you want to install SuperVirus?'
			icon='question' title='Install')

- 上面的对话框都是模态对话框，返回结果依赖于用户的行为，具体的返回值依赖于"type" option passed to the command.

	<table>
		<tr>
			<th>Type option</th>
			<th>Possible return values</th>
		</tr>
		<tr>
			<td>ok(default)</td>
			<td>"ok"</td>
		</tr>
		<tr>
			<td>okcancel</td>
			<td>"ok" or "cancel"</td>
		</tr>
		<tr>
			<td>yesno</td>
			<td>"yes" or "no"</td>
		</tr>
		<tr>
			<td>yesnocancel</td>
			<td>"yes" , "no" or "cancel"</td>
		</tr>
		<tr>
			<td>retrycancel</td>
			<td>"retry" or "cancel"</td>
		</tr>
		<tr>
			<td>abortretryignore</td>
			<td>"abort", "retry" or "ignore"</td>
		</tr>
	</table>

- 除了使用"type"选项，Tkinter可以使用不同的方法名来调用不同的diaolog，可用的方法名有：askokcancel, askquestion, askretrycancel, askyesno, askyesnocancel,showerror, showinfo, showwarning.

- 在调用模态对话框时，可用的options:

		type     As described above.
		message  The main message displayed inside the alert.
		detail   If needed, a secondary message, often displayed in a smaller font under the main message.
		title    Title for the dialog window. Not used on Mac OS X.
        icon     Icon to show: one of "info" (default), "error", "question" or "warning".
        default  Specify which button (e.g. "ok" or "cancel" for a "okcancel" type dialog) should be the default.
        parent   Specify a window of your application this dialog is being posted for; this may cause the dialog to appear on top, or on Mac OS X appear as a sheet for the window.