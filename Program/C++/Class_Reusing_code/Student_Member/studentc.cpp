#include "include/studentc.h"

double Student::Average() const
{
	return scores.Average(); //use ArrayDb::Average()
}

double & Student::operator[](int i)
{
	return scores[i]; //use ArrayDb::operator[]()
}

const double & Student::operator[](int i) const
{
	return scores[i];
}

//friends

//using String And ArrayDb versions
ostream & operator<<(ostream &os, const Student & stu)
{
	os << "Scores for " << stu.name << ":\n";
	os << stu.scores;
	return os;
}

//use String version
istream & operator>>(istream & is, Student & stu)
{
	is >> stu.name;
	return is;
}
