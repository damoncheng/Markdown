
- Floating-point numbsers are represented in computer hardware as base 2 (binary) fractions. For example,the decimal fraction

		0.125

	has value 1/10 + 2/100 + 5/1000, and in the same way the binary fraction:

		0.001

	has value 0/2 + 0/4 + 1/8.

- In base 2, 1/10 is the infinitely repeating fraction:

		0.0001100110011001100110011001100110011001100110011...

	Stop at any finite number of bites, and you get an approximation.

- On a typical machine running Python, there are 53 bits of precision available for a Python float, so the value stored internally when you enter the decimal number 0.1 is the binary fraction:

		0.00011001100110011001100110011001100110011001100110011010

- if Python were to print the true decimal value of the binary approximation stored for 0.1, it would have to diplay:

		>>> 0.1
		0.1000000000000000055511151231257827021181583404541015625

- That is more digits than most people find useful, so Python keeps the number of digits manageable by displaying **a rounded value instead**.

		>>> 0.1
		0.1

- So it's a important to realize that this is, in a real sense, an illusion: the value in the machine is not exactly 1/10, you're simply rounding the display of the true machine value. This fact becomes apparent as soon as you try to do arithmetic with these values.

		>>>0.1 + 0.2
		0.30000000000000004


- If you're in a situation where you care which way your decimal halfway-access are rounded, you should consider using the decimal module. Incidentally, the **decimal module also provides a nice way to see the exact value that's stored in any particular Python float**

		>>> from decimal import Decimal
	 	>>> Decimal(2.675)
		Decimal('2.67499999999999982236431605997495353221893310546875')


### Representation Error ###
- Representation error refers to the fact that some (most,actually) decimal fractions cannot be represented exactly as binary(base 2) fractions. This is the chief reason why Python(or Perl, C, C++, Java, Fortran and many others) often won't display the exact decimal number you expect:

		>>>0.1 + 0.2
		0.30000000000000004

- Why is that? 1/10 and 2/10 are not exactly representable as a binary fraction. Almost call machines today(July 2010) use IEEE-754 floating point arithmetic, and almost all platforms map Python floats 
to IEEE-754 "double precision". 754 double contain 53 bits of precision, so on input the computer strives to convert 0.1 to the closeest fraction it can of the form J/2**N where J is an integer containing exactly 53 bits. Rewriting

		1 / 10 ~= J / (2**N)

	as 

		J ~= 2**N / 10

	and recalling that J has exactly 53 bits(is >= 2**52 but 2**53), the best value for N is 56:

		>>> 2**52
		4503599627370496
		>>> 2**53
		9007199254740992
		>>> 2**56/10
		7205759403792793


### 这一部分后面再看，有点数学推导的感觉 ###
