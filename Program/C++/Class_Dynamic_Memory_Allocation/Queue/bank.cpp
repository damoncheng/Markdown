#include <iostream>
using namespace std;
#include <cstdlib> //for rand() and srand()
#include <ctime> //for time()

#include "include/queue.h"

const int MIN_PER_HR = 60;

bool newcustomer(double x); //is there a new customer?

int main()
{
	srand(time(0));

	cout << "Case Study: Bank of Heather Automatic Teller\n";
	cout << "Enter maximum size of queue:";

	int qs;
	cin >> qs;
	Queue line(qs); //line queue holds up to qs people 

	cout << "Enter the number of simulation hours:";
	int hours; //hours of simulation 
	cin >> hours;
	//simualation will run 1 cycle per minute
	
	long cyclelimit = MIN_PER_HR * hours; 
	cout << "Enter the average number of customers per hour:";
	double perhour;
	cin >> perhour;

	double min_per_cust; //average time between arrivals
	min_per_cust = MIN_PER_HR / perhour;

	Item temp;  //new customer data
	long turnaways = 0;  //turned away by full queue
	long customers = 0;  //joined the queue
	long served = 0;     //served during the simulation
	long sum_line = 0;   //cumulative line length
	int wait_time = 0;   //time until autoteller is free
	long line_wait = 0;  //cumulative time in line

	//running the simulation
	for(int cycle = 0; cycle < cyclelimit; cycle++)
	{
		if(newcustomer(min_per_cust)) //have newcomer
		{
			if(line.isfull())
				turnaways++;
			else
			{
				customers++;
				temp.set(cycle); //cycle = time of arrival
				line.enqueue(temp); //and newcomer to line
			}
		}

		if(wait_time <= 0 && !line.isempty())
		{
			line.dequeue(temp); //attend next customer
			wait_time = temp.ptime(); //for wait_time minutes
			line_wait += cycle - temp.when();
			served++;
		}

		if(wait_time > 0)
			wait_time--;
		sum_line += line.queuecount();
	}

	if(customers > 0)
	{
		cout << "customers accpeted:" << customers << '\n';
		cout << " customers served:" << served << '\n';
		cout << "	turnayways:" << turnaways << '\n';
		cout << "average queue size:";
		cout.precision(2);
		cout.setf(ios_base::fixed, ios_base::floatfield);
		cout.setf(ios_base::showpoint);
		cout << (double)sum_line / cyclelimit << "\n";
		cout << "average wait time:" << (double)line_wait / served << " minutes\n";
	}
	else
	{
		cout << "No customers!\n" << endl;
	}


	return 0;
}


bool newcustomer(double x)
{
	return (rand() * x / RAND_MAX < 1);
}
