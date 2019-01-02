#include "include/studenti.h"

double Student::Average() const
{
	return ArrayDb::Average(); //use ArrayDb::Average()
}

double & Student::operator[](int i)
{
	return ArrayDb::operator[](i); //use ArrayDb::operator[]()
}

const double & Student::operator[](int i) const
{
	return ArrayDb::operator[](i);
}

//friends

//using String And ArrayDb versions
ostream & operator<<(ostream &os, const Student & stu)
{
	os << "Scores for " << (const string &)stu << ":\n";
	os << (const ArrayDb &)stu;
	return os;
}

//use String version
istream & operator>>(istream & is, Student & stu)
{
	is >> (string &)stu;
	return is;
}
