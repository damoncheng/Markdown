//arraytp.h  -- Array Template

/*
 *Let's begin with a simple array template that lets you specify an array size. 
 One technique, which the last version of the Stack template used, is using a dynamic array within the class and a constructor argument to provide the number of elements. 
 Another approach is using a template argument to provide the size for a regular array
 *
 *
 * */


#ifndef ARRAYTP_H_
#define ARRAYTP_H_

#include <iostream>
using namespace std;
#include <cstdlib>

template <class T, int n>
class ArrayTP
{

private:
	T ar[n];

public:
	ArrayTP(){};
	explicit ArrayTP(const T &v);
	virtual T & operator[](int i);
	virtual const T & operator[](int i) const;

};

template <class T, int n>
T & ArrayTP<T, n>::operator[](int i)
{

	if(i < 0 || i > n)
	{
		cerr << "Error in array limits:" << i << " is out of range\n";
		exit(1);
	}
	return ar[i];

}

template <class T, int n>
const T & ArrayTP<T, n>::operator[](int i) const
{

	if(i < 0 || i > n)
	{
		cerr << "Error in array limits:" << i
			<< " is out of range\n";
		exit(1);
	}

	return ar[i];
}



#endif
