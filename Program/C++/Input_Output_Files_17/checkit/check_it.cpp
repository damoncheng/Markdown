//check_it.cpp
#include <iostream>
using namespace std;

int main()
{

	cout.precision(2);
	cout << showpoint << fixed;
	cout << "Enter numbers:";

	double sum= 0.0;
	double input;

	while(cin >> input)
	{
		sum += input;
	}

	cout << "Last value entered = " << input << "\n";
	cout << "Sum = " << sum << "\n";

	return 0;
}
