//eof.cpp : ctrl-d == end of file, you can redirect file as input of this file
/*
 * When cin detects the end-of-file (EOF), it sets two bits (the eofbit and the failbit) to 1;
 * Note that the eof() and fail() methods report the result of the most recent attempt to read;
 * So a cin.eof() or cin.fail() test always should follow an attempt to read
 */

#include <stdio.h>
 
#include <iostream>
using namespace std;

int main()
{
    char ch;
    int count = 0;

    /*-----------method one : get(ch)-------------*/
    /*
    cin.get(ch); //attempt to read a char
    while(cin.fail() == false)
    {
    
        cout << ch; //echo character
        count++;
        cin.get(ch); //attempt to read another char
    
    }
    */

    /*---------method two : get()--------------*/
    while(EOF != (ch = cin.get()))
    {
        cout << ch;
        count++;
    }
    cout << "\n" << count << "characters read\n";

    return 0;
}
