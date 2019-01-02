#ifndef DMA_H_
#define DMA_H_

#include <iostream>
using namespace std;

//Base Class Using DMA
class baseDMA
{

private:
	char * label;
	int rating;

public:
	baseDMA(const char * l = "null", int r = 0);
	baseDMA(const baseDMA &rs);
	virtual ~baseDMA();
	baseDMA & operator=(const baseDMA & rs);
	friend ostream & operator<<(ostream & os, const baseDMA & rs);

};


//derived class without DMA
//no destructor needed
//uses implicit copy constructor
//uses implicit assignment operator
class lacksDMA:public baseDMA
{

private:
	char color[40];

public:
	lacksDMA(const char * c = "blank", const char * l = "null", int r = 0);
	lacksDMA(const char * c, const baseDMA & rs);
	friend ostream & operator<<(ostream & os, const lacksDMA & rs);

};

//derived class with DMA
class hasDMA:public baseDMA
{

private:
	char * style;

public:
	hasDMA(const char * s = "none", const char * l = "null", int r = 0);
	hasDMA(const char * s, const baseDMA & rs);
	hasDMA(const hasDMA & hs);
	~hasDMA();
	hasDMA & operator=(const hasDMA & rs);
	friend ostream & operator<<(ostream & os, const hasDMA & rs);

};

#endif
