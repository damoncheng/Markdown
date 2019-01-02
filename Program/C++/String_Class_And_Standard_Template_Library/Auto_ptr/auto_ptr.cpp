#include <iostream>
#include <cstring>
#include <memory>
using namespace std;

int main()
{
	auto_ptr<string> films[5] = 
	{
		auto_ptr<string> (new string("Fowl Balls")),
		auto_ptr<string> (new string("Duck Walks")),
		auto_ptr<string> (new string("Chicken Runs")),
		auto_ptr<string> (new string("Turkey Errors")),
		auto_ptr<string> (new string("Goose Eggs"))

	};

	auto_ptr<string> pwin(films[2]);

	int i;
	cout << "The nominees for best avian baseball film are\n";
	for(i = 0; i < 5; i++)
		cout << *films[i] << endl;

	cout << "The winner is " << *pwin << "!\n";

	return 0;

}
