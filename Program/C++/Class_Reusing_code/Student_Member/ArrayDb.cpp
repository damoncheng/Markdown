#include <iostream>
using namespace std;
#include <cstdlib>
#include "include/arrayDb.h"

//default constructor -- no arguments
ArrayDb::ArrayDb()
{
	arr = NULL;
	size = 0;
}


//constructors array of n elements, each set to val
ArrayDb::ArrayDb(unsigned int n, double val)
{

	arr = new double[n];
	size = n;
	for(int i = 0; i < size; i++)
		arr[i] = val;

}

//Initialize ArrayDb object to non-class array
ArrayDb::ArrayDb(const double *pn, unsigned int n)
{

	arr = new double[n];
	size = n;
	for(int i = 0; i < size; i++)
		arr[i] = pn[i];

}

//Initialize ArrayDb object to another ArrayDb object
ArrayDb::ArrayDb(const ArrayDb &a)
{

	size = a.size;
	arr = new double[size];

	for(int i = 0; i < size; i++)
		arr[i] = a.arr[i];

}


ArrayDb::~ArrayDb()
{
	delete [] arr;
}

double ArrayDb::Average() const
{

	double sum = 0;
	int i;
	int lim = ArSize();

	for(i = 0;i < lim;i++)
		sum += arr[i];

	if(i > 0)
		return sum / i;
	else
	{
		cerr << "No entries in score array\n";
		return 0;
	}

}

//let user access elements by index(assignment allowed)
double & ArrayDb::operator[](int i)
{
	//check index before continuing
	if(i < 0 || i > size)
	{
		cerr << "Error in array limits:"
			 << i << "is a bad index\n";
		exit(1);
	}

	return arr[i];
}

//let user access elements by index(assignment disallowed)
const double & ArrayDb::operator[](int i) const
{

	//check index before continuing
	if(i < 0 || i > size)
	{
		cerr << "Error in array limits:"
			 << i << " is a bad index\n";

		exit(1);
	}

	return arr[i];
}


//define class assignment 
ArrayDb & ArrayDb::operator=(const ArrayDb & a)
{
	if(this == &a)		//if object assignmet to self.
		return *this;   //don't change anything

	delete [] arr;
	size = a.size;
	arr = new double[size];
	for(int i = 0; i < size; i++)
		arr[i] = a.arr[i];

	return *this;
}

//quick output, 5 values to a line
ostream & operator<<(ostream & os, const ArrayDb & a)
{
	int i;
	for(i = 0;i < a.size; i++)
	{
		os << a.arr[i] << " ";
		if(i % 5 == 4)
			os << "\n";
	}

	if(i % 5 != 0)
		os << "\n";

	return os;
}
