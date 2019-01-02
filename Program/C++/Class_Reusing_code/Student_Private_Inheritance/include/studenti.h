//studentc.h -- defining a Student class using containment
#ifndef STUDENTI_H_
#define STUDENTI_H_

#include <iostream>
using namespace std;
#include <cstring>
#include "arrayDb.h"

class Student: private string, private ArrayDb //inherited objects
{

public:
	Student() : string("Null Student"),ArrayDb() {}
	Student(const string & s) : string(s), ArrayDb() {}
	Student(int n):string("Nully"), ArrayDb(n) {}
	Student(const string & s, int n) : string(s), ArrayDb(n) {}
	Student(const string & s, const ArrayDb & a):string(s),ArrayDb(a) {}
	Student(const char * str, const double * pd, int n): string(str), ArrayDb(pd, n) {}
	~Student(){}

	double & operator[](int i);
	const double & operator[](int i) const;
	double Average() const;

//friends
    friend ostream & operator<<(ostream & os, const Student & stu);
    friend istream & operator>>(istream & is, Student & stu);

};

#endif
