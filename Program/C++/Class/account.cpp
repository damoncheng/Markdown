#include "include/account.h"

Account::Account() {
	name[0] = 0;
	password[0] = 0;
	balance = 0;
}

Account::Account(const char *name, const char *password, long balance) {
	strncpy(this->name, name, this->LEN);
	strncpy(this->password, password, this->LEN);
	this->balance = balance;

}

Account::~Account(){

}

void Account::show_account() const {

	cout << name << " own " << balance << " balance" << endl;

}

int Account::deposting(double money){
	if(money < 0)
	{
		cout << "money can't be negative" << endl;
		return -1;
	}

	cout << this->name << " deposting " << money << endl;
	this->balance += money;
	return 0;
}

int Account::withdrawing(double money){
	if(money < 0)
	{
		cout << "money can't be negative" << endl;
		return -1;
	}
	else if(money > this->balance)
    {
		cout << "your balance " << balance 
			 << " isn't enough" << endl;
		return -1;
	}

	cout << this->name << " withdrawing " << money << endl;
	this->balance -= money;

	return 0;
}


