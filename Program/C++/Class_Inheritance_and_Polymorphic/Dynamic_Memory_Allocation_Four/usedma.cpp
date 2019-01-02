//usedma.cpp -- inheritance, friends, and DMA
//compile with dma.cpp

#include <iostream>
using namespace std;

#include "include/dma.h"

int main()
{

	baseDMA shirt("Protabelly", 8);
	lacksDMA balloon("red", "Blimpo", 4);
	hasDMA map("Mercator", "Buffalo Keys", 5);


	cout << shirt << endl;
	cout << balloon << endl;
	cout << map << endl;

	lacksDMA balloon2(balloon);
	hasDMA map2;
	map2 = map;

	cout << balloon2 << endl;
	cout << map2 << endl;

	return 0;
}


