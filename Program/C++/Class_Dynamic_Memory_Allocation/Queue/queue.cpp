#include "include/queue.h"

//initialize qsize to qs by "member initializer list":
/*
 * The member Initializer List Syntax
 *
 * Class::Classy(int n, int m):mem1(n),mem2(0),mem3(n*m+2){
 *	 //...
 * }
 *
 * -This form can be used only with constructors.
 * -You must use this form to initialize a nonstatic const data member.
 * -You must use this form to initialize a reference data member.
 *
 * Data members get initialized in the order in which they appear in the class declaration, not in the order in which initializers are listed.
 *
 */


Queue::Queue(int qs):qsize(qs) {
	front = rear = NULL;
	items = 0;
}

bool Queue::enqueue(const Item & item) {

	if(isfull())
		return false;

	Node * add = new Node;

	if(add == NULL) 
		return false;

	add->item = item; //set node pointers
	add->next = NULL;

	items++;

	if(front == NULL)
		front = add;
	else
		rear->next = add;

	rear = add;
	return true;

}

bool Queue::dequeue(Item & item) {
	if(front == NULL)
		return false;

	item = front->item; //set item to first item in queue
	items--;
	Node * temp = front;
	front = front->next;

	delete temp;
	if(items == 0)
		rear = NULL;

	return true;
}

bool Queue::isempty() const {
	return items == 0;
}

bool Queue::isfull() const {
	return items == qsize;
}

int Queue::queuecount() const {
	return items;
}

Queue::~Queue() {

	Node * temp = NULL;

	while(front != NULL) {
		temp = front;
		front = front->next;
		delete temp;
	}

}
