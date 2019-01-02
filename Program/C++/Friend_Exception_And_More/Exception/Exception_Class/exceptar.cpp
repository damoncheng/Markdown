//exceptar.cpp -- use the ArrayDbE class
//Compile with arraydbe.cpp

#include <iostream>
using namespace std;

#include "include/arraydbe.h"

const int Players = 5;

int main()
{

	try {
	
		ArrayDbE Team(Players);

		cout << "Enter free-thow percentages for your 5"
				"top player as a decimal fraction:\n";

		int player;
		for(player = 0; player < Players; player++)
		{
			cout << "Player" << (player + 1) << ":%=";
			cin >> Team[player];
		}

		cout.precision(1);
		cout.setf(ios_base::showpoint);
		cout.setf(ios_base::fixed, ios_base::floatfield);
		cout << "Recapitulating, here are the percentages:\n";

		for(player = 0; player <= Players; player++)
			cout << "Player #" << (player + 1) << ":"
				 << 100.0 * Team[player] << "%\n";
	
	}
	catch(ArrayDbE::BadIndex & bi) //start of handler
	{
		cout << "ArrayDbE exception:\n";
		bi.Report();
	}

	cout << "Bye!\n";
	

	return 0;

}
