//setf.cpp -- use setf() to control formatting

#include <iostream>
using namespace std;

int main()
{

	int temperature = 63;

	cout << "Today's water temperature:";
	cout.setf(ios_base::showpos); //show plus sign
	cout << temperature << "\n";

	cout << "For our programing friends, that's\n";
	cout << hex << temperature << "\n"; //use hex

	cout.setf(ios_base::uppercase); //use uppercase in hex
	cout.setf(ios_base::showbase); //use 0X prefix for hex

	cout << "or\n";
	cout << temperature << "\n";
	cout << "How " << true << " ! oops -- How";
	cout.setf(ios_base::boolalpha);
	cout << true << "!\n";


	return 0;
}
