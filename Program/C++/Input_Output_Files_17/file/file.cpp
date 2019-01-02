//file.cpp -- save to a file

#include <iostream> //not needed for many systems
#include <fstream>
using namespace std;

int main()
{

	char filename[20];

	cout << "Enter name for new file:";
	cin >> filename;


	//create output stream object for new file and call it fout
	ofstream fout(filename);

	fout << "For your eye only!\n"; //write to file


	cout << "Enter your secret number:"; //write to screen
	float secret;
	cin >> secret;
	fout << "Your secret number is " << secret << "\n";
	fout.close();


	//create input stream object for new file and call it fin
	ifstream fin(filename);
	
	cout << "Here are the contents of " << filename << ":\n";
	char ch;
	while(fin.get(ch))
		cout << ch;

	cout << "Done\n";
	fin.close();

	return 0;

}
