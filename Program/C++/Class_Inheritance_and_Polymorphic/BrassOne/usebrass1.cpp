#include <iostream>
using namespace std;

#include "include/brass.h"

int main()
{
	Brass Porky("Porcelot Pigg", 281299, 4000.00);
	BrassPlus Hoggy("Horatio Hogg", 382288, 3000.00);

	Porky.ViewAcct();
	cout << endl;
	Hoggy.ViewAcct();
	cout << endl;

	cout << "Depositing $1000 into the Hogg Accouting:\n";
	Hoggy.Deposit(1000.00);
	cout << "New balance: $" << Hoggy.Balance() << endl;
	cout << "Withdrawing $4200 from the Porky Account:\n";
	Porky.Withdraw(4200.0);
	cout << "Pigg account balance:$" << Porky.Balance() << endl;
	cout << "Withdrawing $4200 from the Hoggy Account:\n";
	Hoggy.Withdraw(4200.00);
	Hoggy.ViewAcct();

	return 0;
}
