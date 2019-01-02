#ifndef _ACCOUNT_H
#define _ACCOUNT_H
#include <iostream>
using namespace std;
#include <cstring>

class Account {

	private:
		static const int LEN = 50;
		char name[LEN];
		char password[LEN];
	    double  balance;

	public:
		Account();
		Account(const char *name, const char *password, long balance);
		~Account();
		void show_account() const;
		int deposting(double money);
		int withdrawing(double money);
};


#endif
