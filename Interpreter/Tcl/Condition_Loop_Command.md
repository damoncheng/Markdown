### Number Comparsions 101 - if ###

- syntax
	
		- if expr1 ?then? body1 elseif expr2 ?then? body2 elseif ... ?else? ?bodyN?

- Test expression rule:

	<table>
		<tr>
			<th>expr result</th>
			<th>False</th>
			<th>True</th>
		</tr>
		<tr>
			<td>a numeric value</td>
			<td>0</td>
			<td>all others</td>
		</tr>
		<tr>
			<td>yes/no</td>
			<td>no</td>
			<td>yes</td>
		</tr>
		<tr>
			<td>true/false</td>
			<td>false</td>
			<td>true</td>
		</tr>
	</table>

- The test expression following the word if is evaluated in the same manner **as in the expr command**.

- The test expression following if may be enclosed within quotes, or braces. If it is enclosed **within braces, it will be evaluated within the if command**, and if enclosed **within quotes it will be evaluated during the substitution phase, and then another round of substitutions will be done within the if command.**


- Examples:

		set x 1
		
		if {$x == 2} {puts "$x is 2"} else {puts "$x is not 2"}
		
		if {$x != 1} {
		    puts "$x is != 1"
		} else {
		    puts "$x is 1"
		}
		
		if $x==1 {puts "GOT 1"}
		
		#
		# Be careful, this is just an example
		# Usually you should avoid such constructs,
		# it is less than clear what is going on and it can be dangerous
		#
		set y x
		if "$$y != 1" {
		    puts "$$y is != 1"
		} else {
		    puts "$$y is 1"
		}
		
		#
		# A dangerous example: due to the extra round of substitution,
		# the script stops
		#
		set y {[exit]}
		if "$$y != 1" {
		    puts "$$y is != 1"
		} else {
		    puts "$$y is 1"
		}

### Textual Comparision - switch ###

- syntax 

		- switch string pattern1 body1 ?pattern2 body2? ... ?patternN bodyN?

	or

		- switch string {pattern1 body1 ?pattern2 body2? ... ?patternN bodyN?}


- if string matches a pattern, then the code within the body associated with that pattern will be executed. The return value of the body will be
returned as the return value of the switch statemtent.

- if the last pattern argument is the string **default**, that pattern will match any string. This guarantees that some set of code will be executed no matter what the contents of string are.

- if there is no default argument, and none of the patterns match string, then the switch command will return an empty string.

-  if you use the brace version of this command, **there will be no substitutions done on the patterns.** The body of command, however, **will be parsed and evaluated just like any other command,**  so there will be a pass of substitutions done on that, just as will be done in the first syntax. **The advantage of the second form is that you can write multiple line commands more readably with the brackets.**

### While loop ###

- syntax

		- while test body

- the **while** command evaluates **test** as an expression. If **test** is true, the code in **body** is executed. After the code in **body** has been executed, **test** is evaluated again.

- a **continue** statement within body will stop the execution of the code and the **test** will be re-evaluated. 

- a **break** within **body** will break out of the while loop, and execution will continue with the next line of code after **body**

- In Tcl **everything** is a command, and everything goes through the same substitution phase. for this reason, the **test** must placed within braces. if **test** is placed within quotes, the substitution phase will replace any varaibles with their current value, and will pass that test to the while command to evaluate, **and since the test has only numbers, it will always evaluate the same, quite probably leading to an endless loop!**

### For and incr ###

- Syntax

		- for start test next body

- The for command in tcl takes four arguments: **an initialization, a test, an increment, and the body** of code to evaluate on each pass through the loop

- when braces are used for grouping, the newline is not treated as the end of a Tcl command. however, the opening brace **must** be one the line with the for command, or the Tcl interpreter will treat the close of the next brace as the end of the command.

- because incrementing the iteration variable is so common, Tcl has a special command for this:

		incr varName ?increment?

	this command adds the value in the second argument to the variable named in the first argument. **If no value is given for second argument, it defaults to 1.**

