### Adding new commands to Tcl - proc ###

- syntax 

		proc name args body

- In Tcl there is actually no distinction between commands(often known as 'functions' in other languages) and 'syntax'. There are no reserved words(like if and while) as exist in C,jave,Python,Perl,etc. 

- still just regular Tcl commands that obey the same syntax rules as all tcl commands

- when **proc** is evaluated, it creates a new command with name **name** that takes arguments args. when the procedure **name** is called, it then runs the code contained in **body**.

- **Args** is a list of arguments which will be passed to **name**. when **name** is invoked, local variables with these names will be created, and  the values to be passed to **name** will be copied to the local variables.

- **return** command returns its command to the calling program. **if there is no return**, then **body** will return to the caller when the last of its commands has been executed. **The return value of the last command becomes the return value of the procedure.**

		proc sum {arg1 arg2} {
		    set x [expr {$arg1 + $arg2}];
		    return $x
		}
		
		puts " The sum of 2 + 3 is: [sum 2 3]\n\n"
		
		proc for {a b c} {
		    puts "The for command has been replaced by a puts";
		    puts "The arguments were: $a\n$b\n$c\n"
		}
		
		for {set i 1} {$i < 10} {incr i}


### Variations in proc arguments and return values ###

- proc命令支持可变参数

- it can have a variable number of arguments. An argument can also be defined to have a default value.


- Variables can be defined with a **default value** by placing the variable name and the default within braces within **args**.

		proc justdoit {a {b 1} {c -1}} {

		}


		justdoit 10
		justdoit 10 20

- a proc will accept a variable number of arguments if the last declared argument is the word **args**. if the last argument to a proc argument list is **args**, then any arguments that aren't already assigned to previous variables will be assigned to **args**.

		proc example {required {default1 a} {default2 b} args} {...}


- example

		proc example {first {second ""} args} {
		    if {$second eq ""} {
		        puts "There is only one argument and it is: $first"
		        return 1
		    } else {
		        if {$args eq ""} {
		            puts "There are two arguments - $first and $second"
		            return 2
		        } else {
		            puts "There are many arguments - $first and $second and $args"
		            return "many"
		        }
		    }
		}
		
		set count1 [example ONE]
		set count2 [example ONE TWO]
		set count3 [example ONE TWO THREE ]
		set count4 [example ONE TWO THREE FOUR]
		
		puts "The example was called with $count1, $count2, $count3, and $count4 Arguments"

### Variable scope - global and upvar ###

- tcl可以通过upvar来模拟引用，global来修改全局变量

- Tcl evaluates varables within a scope delineated by procs, namespaces, and at the topmost level, the global scope.

- **The scope in which a variable will be evaluated can be changed with the global and upvar commands**.

	- the **global** command will **cause a variable in a local scope (inside a procedure) refer to the global variable of that name.**

	- the **upvar** command is similar. It "ties" the name of a variable n the current scope to a variable in a different scope. This is commonly used to simulate pass-by-reference to procs.

- **Normally, Tcl uses a type of "garbage collection" called reference counting in order to automatically clean up variables when they are no used anymore, such as when they go "out of scope" at the end of a procedure, so that you don't have to keep track of them yourself.** It is also possible to explicitly unset them with the aptly named **unset** command.

- upvar syntax

		upvar ?level? otherVar1 myVar1 ?otherVar2 myVar2? ... ?otherVarN myVarN? 

- The *upvar* command causes *myVar1* to become a reference to *otherVar1*, and *myVar2* to become a reference to *otherVar2*, the *otherVar* variable is declared to be at *level* relative to the current procedure. **By default *level* is 1, the next level up.**

- **if the level number is preceded by a # symbol, then it references that many levels down from the global scope. if level is #0, then the reference is to a variable at the global level.**

- if you are using upvar with anything except #0 or 1, you are most likely asking for trouble, unless you really know what you're doing.

- Note that since there is only one global space it is surprisingly easy to have name conflicts if you are importing other peoples code and aren't careful. It is recommended that you start global variables with an identifiable prefix to help avoid unexpected conflicts.

- You might also encounter the variable command in others' Tcl code. It is part of the namespace system and is discussed in detail in that chapter.

- example

		proc SetPositive {variable value} {
		    upvar $variable myvar
		    if {$value < 0} {
		        set myvar [expr {-$value}]
		    } else {
		        set myvar $value
		    }
		    return $myvar
		}
		
		SetPositive x 5
		SetPositive y -5
		
		puts "X : $x    Y: $y\n"
		
		proc two {y} {
		    upvar 1 $y z                    ;# tie the calling value to variable z
		    upvar 2 x a                     ;# Tie variable x two levels up  to a
		    puts "two: Z: $z A: $a"         ;# Output the values, just to confirm
		    set z 1                         ;# Set z, the passed variable to 1;
		    set a 2                         ;# Set x, two layers up to 2;
		}
		
		proc one {y} {
		    upvar $y z                      ;# This ties the calling value to variable z 
		    puts "one: Z: $z"               ;# Output that value, to check it is 5
		    two z                           ;# call proc two, which will change the value
		}
		
		one y                               ;# Call one, and output X and Y after the call.
		puts "\nX: $x  Y: $y"
		
		
		proc existence {variable} {
		    upvar $variable testVar
		    if { [info exists testVar] } {
		        puts "$variable Exists"
		    } else {
		        puts "$variable Does Not Exist"
		    }
		}
		
		set x 1
		set y 2
		for {set i 0} {$i < 5} {incr i} {
		    set a($i) $i;
		}
		
		puts "\ntesting unsetting a simple variable"
		# Confirm that x exists.
		existence x
		# Unset x
		unset x
		puts "x has been unset"
		# Confirm that x no longer exists.
		existence x