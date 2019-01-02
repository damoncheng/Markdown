//str2.cpp -- string input

#include <iostream>
#include <string>

using namespace std;

int main()
{

	string word;
	
	cout << "Enter a line:";
	cin >> word;

	while(cin.get() != '\n')
		continue;
	cout << word << " is all I wanted.\n";

	string line;

	cout << "Enter a line(really!):";
	getline(cin, line);
	cout << "Line:" << line << endl;

	return 0;

};
