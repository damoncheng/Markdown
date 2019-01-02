//studentc.h -- defining a Student class using containment
#ifndef STUDENTC_H_
#define STUDENTC_H_

#include <iostream>
using namespace std;
#include <cstring>
#include "arrayDb.h"

class Student
{

private:
	string name;	 //contained object
	ArrayDb scores;	 //contained object

public:
	Student() : name("Null Student"),scores() {}
	Student(const string & s) : name(s), scores() {}
	Student(int n):name("Nully"), scores(n) {}
	Student(const string & s, int n) : name(s), scores(n) {}
	Student(const string & s, const ArrayDb & a):name(s),scores(a) {}
	Student(const char * str, const double * pd, int n): name(str), scores(pd, n) {}
	~Student(){}

	double & operator[](int i);
	const double & operator[](int i) const;
	double Average() const;

//friends
   friend ostream & operator<<(ostream & os, const Student & stu);
   friend istream & operator>>(istream & is, Student & stu);

};

#endif
