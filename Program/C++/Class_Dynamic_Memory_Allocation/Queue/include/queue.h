#ifndef _QUEUE_H
#define _QUEUE_H

#include <iostream>
using namespace std;

#include "customer.h"

typedef Customer Item;

class Queue{

	//class scope definitions
	enum {Q_SIZE = 10};

	struct Node {
		Item item;
		struct Node * next;
	};

private:
	Node * front; //Pointer to front of Queue
	Node * rear;  //Pointer to rear of Queue
	int items;	  //current numbers of items in Queue
	const int qsize; //maximum number of items in Queue

	/* Forbidden assignment operator and copy contructor : overwrite and add them to private. */
	/* If need them later. move and overwrite them to public */
	Queue(const Queue &q):qsize(0){}
	Queue & operator=(const Queue &q) {return *this;}
	
	
public:

	Queue(int qs = Q_SIZE);
	~Queue();

	bool isempty() const;
	bool isfull() const;
	int queuecount() const;
	bool enqueue(const Item & item);
	bool dequeue(Item & item);

};

#endif

