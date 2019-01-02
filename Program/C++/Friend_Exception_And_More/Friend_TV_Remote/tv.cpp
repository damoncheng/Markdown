//tv.cpp -- methods for the Tv class (Remote methods are inline)
#include <iostream>
using namespace std;

#include "include/tv.h"

bool Tv::volup()
{
	if(volume < MaxVal)
	{
		volume++;
		return true;
	}
	else
		return false;
}

bool Tv::voldown()
{
	if(volume > MinVal)
	{
		volume--;
		return true;
	}
	else
		return false;

}

void Tv::chanup()
{
	if(channel < maxchannel)
		channel++;
	else
		channel = 1;
}

void Tv::chandown()
{
	if(channel > 1)
		channel--;
	else
		channel = maxchannel;
}

void Tv::settings() const
{
	cout << "TV is " << (state == Off ? "Off" : "On") << '\n';
	if(state == On)
	{
		cout << "Volume settings = " << volume << '\n';
		cout << "Channel settings = " << channel << '\n';
		cout << "Mode = " << (mode == Antenna ? "antenna":"cable") << '\n';
		cout << "Input = " << (input == TV?"TV":"VCR") << '\n';
	}
}
