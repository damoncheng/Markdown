//count.cpp -- count characters in a list of files

#include <iostream>
using namespace std;

#include <fstream>
#include <cstdlib>

//#include <console.h> //for Macintosh

int main(int argc, char * argv[])
{


	//argc = ccommand(&argv) //for Macintosh
	
	if(argc == 1)
	{
		cerr << "Usage: " << argv[0] << " filename[s]\n";
		exit(1);
	}

	ifstream fin; //open stream

	long count;
	long total = 0;
	char ch;

	for(int file = 1; file < argc; file++)
	{
		fin.open(argv[file]); //connect stream to argv[file]

		if(!fin.is_open())
		{
			cerr << "Couldn't open file " << argv[file] << "\n";
			fin.clear(); //reset failbit
			continue;
		}

		count = 0;
		while(fin.get(ch))
			count++;

		cout << count << " characters in " << argv[file] << "\n";
		total += count;

		fin.clear();
		fin.close();
	}


	cout << total << " characters in all files\n";

	return 0;
}
