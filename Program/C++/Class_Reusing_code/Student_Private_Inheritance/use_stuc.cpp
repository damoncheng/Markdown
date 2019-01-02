#include <iostream>
using namespace std;

#include "include/studenti.h"

void set(Student & sa, int n);

const int pupils = 3;
const int quizzes = 5;

int main()
{
	Student ada[pupils] = {quizzes, quizzes, quizzes};

	int i;
	for(i = 0; i < pupils; i++)
		set(ada[i], quizzes);

	for(i = 0; i < pupils; i++)
	{
		cout << "\n" << ada[i];
		cout << "average:" << ada[i].Average() << "\n";
	}

	cout << "Done.\n";

	return 0;
}

void set(Student & sa, int n)
{

	cout << "Please enter the student's name:";
	cin >> sa;
	cout << "Please enter " << n << " quizscores:\n";
	for(int i = 0; i < n; i++)
		cin >> sa[i];

	while(cin.get() != '\n')
		continue;

}
