//nested.cpp -- use queue having a nested class

#include <iostream>
using namespace std;

#include <cstring>
#include "include/queuetp.h"

int main()
{

	QueueTP<string> cs(5);
	string temp;

	while(!cs.isfull())
	{
		cout << "Please enter your name. You will be "
				"served in the order of arrival.\n"
				"name:";

		cin >> temp;
		cs.enqueue(temp);
	}

	cout << "The queue is full. Processsing begins!\n";

	while(!cs.isempty())
	{
		cs.dequeue(temp);
		cout << "Now processing " << temp << "...\n";
	}

	return 0;

}



