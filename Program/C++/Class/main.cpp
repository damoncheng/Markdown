#include <iostream>
using namespace std;
#include "include/account.h"

int main(){

	Account damoncheng("damoncheng", "123456", 0);
	damoncheng.show_account();
	damoncheng.deposting(20);
	damoncheng.show_account();
	damoncheng.withdrawing(5);
	damoncheng.show_account();
	

	return 0;
}

