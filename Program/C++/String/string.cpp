//string.cpp : stored a string in a array

#include <iostream>
#include <cstring>

using namespace std;

int main()
{
    const int SIZE = 15;
    char name1[SIZE]; //empty array
    char name2[SIZE] = "C++owboy"; //initized array

    //NOTE:some implementations may requires the static keyword
    //to initialize the array name2

    //cin >> : separate by space,tab or newline
    /*
        cout << "Enter name1:";
        cin >> name1;
        cout << "Enter name2:";
        cin >> name2;
        cout << "name1:" << name1 << "| name2:" << name2 << endl;
    */

    //getline : seperate by size or newline, replace newline to '\0' after reading newline
    /*
        cin.getline(name1, SIZE);
        cout << "name1 : " << name1 << endl;
    */

    /*
     *  get(name1, SIZE) : seperate by SIZE or newline, don't read newline, and return a cin object
     *  get(char) : read a character(only character), and set it to char, and return a cin object
     *  get() : read a character, and return the character
     * */
    cout << "Enter name1:\n";
    cin.get(name1, SIZE).get();
    cout << "Enter name2:\n";
    cin.get(name2, SIZE).get();

    cout << "name1:" << name1 << "| name2:" << name2 << endl;

    return 0;
}
