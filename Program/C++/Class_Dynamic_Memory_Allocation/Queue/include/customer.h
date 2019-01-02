#include <iostream>
using namespace std;

class Customer
{

private:
	long arrive; //arrive time for customer
	int processtime; //processing time for customer

public:
	Customer(){arrive = processtime = 0;}
	void set(long when);
	long when() const {return arrive;}
	int ptime() const {return processtime;}

};
