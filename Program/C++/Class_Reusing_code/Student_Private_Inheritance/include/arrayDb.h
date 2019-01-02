#ifndef ARRAYDB_H_
#define ARRAYDB_H_

#include <iostream>
using namespace std;

class ArrayDb
{

private:
	unsigned int size; //number of array elements
	double * arr;      //address of first element

public:
	ArrayDb();	//default constructor

	//create an ArrayDb of n elements, set each to val
	explicit ArrayDb(unsigned int n, double val = 0.0);

	//create an ArrayDb of n elements, initialize to array pn
	ArrayDb(const double * pn, unsigned int n);

	ArrayDb(const ArrayDb & a); //copy constructor

	virtual ~ArrayDb();  //destructor

	unsigned int ArSize() const {return size;}; //return array size

	double Average() const; //return array average


	//overloaded operators
	double & operator[](int i); //array indexing

	const double & operator[](int i) const; //array indexing

	//other stuff to be added here
	ArrayDb & operator=(const ArrayDb & a);

	friend ostream & operator<<(ostream & os, const ArrayDb & a);

};

#endif
