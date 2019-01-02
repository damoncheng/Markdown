### Basic knowlege ###

- Two interpreter : tclsh and wish(load tk extension)

- Debug command : info commands

### Evaluation & Substitution 1: Grouping arguments with " "###

- the evaluaton of a command is done in 2 phases. The first phase is a single pass of substitutions. The second phase s the evaluation of the resulting command.

- the backslash disable substitution for the single character immediately following backslash. **however**, there are specific "Backslash Sequence" strings which are replaced by specific values during the substitution phase.

	<table>
		<tr>
			<th>String</th>
			<th>Output</th>
			<th>Hex Value</th>
		</tr>
		<tr>
			<td>\a</td>
			<td>Audible Bell</td>
			<td>0x07</td>
		</tr>
		<tr>
			<td>\b</td>
			<td>Backspace</td>
			<td>0x08</td>
		</tr>
		<tr>
			<td>\f</td>
			<td>Form Feed(clear screen)</td>
			<td>0x0c</td>
		</tr>
		<tr>
			<td>\n</td>
			<td>New Line</td>
			<td>0x0a</td>
		</tr>
		<tr>
			<td>\r</td>
			<td>Carriage Return</td>
			<td>0x0d</td>
		</tr>
		<tr>
			<td>\t</td>
			<td>Vertical Tab</td>
			<td>0x0b</td>
		</tr>
		<tr>
			<td>\odd</td>
			<td>Octal Value</td>
			<td>d is digit from 0-7</td>
		</tr>
		<tr>
			<td>\uHHH</td>
			<td>H is hex digit 0-9,A-F,a-f</td>
			<td>represents a 16-bit Unicode character</td>
		</tr>
		<tr>
			<td>\xHH</td>
			<td>Hex Value</td>
			<td>H is a hex digit</td>
		</tr>
	</table>

- the final exception is the backslash at the end of a line of text. This causes the interpreter to ignore the newline. and treat the text as a single line of text. **The interpreter will insert a blank space at the location of the ending backslash**

### Evaluation & Substitutions 2: Grouping arguments with { } ###

- grouping words within double braces diables substitution within the braces. 

- Charaters within braces are passed to a command exactly as written. 

- the only "Backslash Sequence" that is proceed whithin braces is the backslash at the end of a line. This is stll a line continuation character.

- braces have this effect only when they are used for grouping. if a strng is already grouped, either with quotes or braces, they are treated as regular character with no special meaning.

### Evaluation & Substitutions 3: Grouping arguments with [ ] ###

- you obtain the results of a command by placing the command in square brackets. This is functional equivalent of the back single quote (`) in sh programming, or using the return value of a function in C. 

- the string within the square brackets is evaluated as a command by the interpreter and the result of the command replaces the square bracketed string.

- The exceptions to this rule are as follows:

	- A square bracket that is **escaped with a \\** is considered as literal square bracket.

	- A square bracket **within braces** is not modified during the substitution phase.

### Result of a command - Math 101 ###

- The Tcl command for doing math type operations is expr. 

- Many commands use expr behind the scenes in order to evaluate test expressions, such as if, while, and for loops.

- The operators permitted in Tcl expressions include all the standard math functions, **logical operators, bitwise operators, as well as math functions like rand(), sqrt(), cosh() and so on**

- Expressions almost always yield numeric results(integer or floatng-point values).

- **Performace tip: enclosing the arguments to expr in curly braces will result in faster code. so expr {$i * 10} instead of simply expr $i * 10**

- The expr command performs its own round of substtutions on variable and commands. so you should use braces to prevent the Tcl nterpreter doing this as well(leading to double substitution).

- A Tcl expression consists of a combination of operands, operators, and parentheses. 

- the octal and hexadecimal conversion takes place differently in the expr command than in the Tcl substitution phase. 

	- In substitution phase, a \x32 would be converted to an ascii "2", while expr would covert 0x32 to a decimal 50

- Special Operators

	- eq ne in ni : string operators

			- eq : equality
			- ne : inequality
			- in : check if a string is contained in a list
			- ni : check if a string is not contained in a list

	- x?y:z : support it

	- & ^ | : supoort Bit-wise

- math functions

		abs         acos        asin        atan
		atan2       bool        ceil        cos
		cosh        double      entier      exp
		floor       fmod        hypot       int
		isqrt       log         log10       max
		min         pow         rand        round
		sin         sinh        sqrt        srand
		tan         tanh        wide

- type convertions

		double() converts a number to a floating-point number.
		int() converts a number to an ordinary integer number (by truncating the decimal part).
		wide() converts a number to a so-called wide integer number (these numbers have a larger range).
		entier() coerces a number to an integer of appropriate size to hold it without truncation. This might return the same as int() or wide() or an integer of arbitrary size (in Tcl 8.5 and above).

### Computers and Numbers ###

- Tcl's strategy

	- If you add,subtract,multipl and divide two integer numbers, then the result is an integer.

	- If you add, substract, multiply and divide an integer number and a floating-point number, then the integer number is first converted to a floating-point number with the same value and then computation is done.
