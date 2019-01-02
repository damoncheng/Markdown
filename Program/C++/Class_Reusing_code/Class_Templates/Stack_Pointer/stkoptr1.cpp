//stkoptr1.cpp - test stack of pointers

#include <iostream>
using namespace std;

#include <cstdlib> //for rand(), srand()
#include <ctime>
#include "include/stcktp1.h"

const int Stacksize = 4;
const int Num = 10;

int main()
{

	srand(time(0)); //randomize rand()
	cout << "Please enter stack size:";

	int stacksize;
	cin >> stacksize;
	
	Stack<const char *> st(stacksize); //create an empty stack with 4 slots

	const char * in[Num] = {
		"1:Hank Gilgamesh", "2:Kiki lshtar",
		"3: Betty Rocker", "4: Ian Flagranti",
		"5: Wolfgang Kibble", "6: Portia Koop",
        "7: Joy Almondo", "8: Xaverie Paprika",
        "9: Juan Moore", "10: Misha Mache"
	};

	const char * out[Num];

	int processed = 0;
	int nextin = 0;

	while(processed < Num)
	{

		if(st.isempty())
			st.push(in[nextin++]);
		else if(st.isfull())
			st.pop(out[processed++]);
		else if(rand() % 2 && nextin < Num)
			st.push(in[nextin++]);
		else
			st.pop(out[processed++]);
	
	}

	for(int i = 0;i < Num;i++)
		cout << out[i] << "\n";

	cout << "Bye\n";
	return 0;


}
