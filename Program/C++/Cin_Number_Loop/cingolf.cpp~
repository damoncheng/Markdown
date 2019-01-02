#include <iostream>
using namespace std;

const int Max = 5;

int main()
{

    int golf[Max];

    cout << "Please enter your golf scores.\n";
    cout << "You must enter" << Max << " rounds.\n";

    int i;

    for(int i = 0; i < Max; i++)
    {
        cout << "round #" << i+1 << ":";
        while(!(cin >> golf[i]))
        {
            cin.clear(); //reset input(when input error, the  cin can read again only after clear flag)
            while(cin.get() != '\n')
                continue;
            cout << "Please enter a number:";
        }
    }

    //calculate average
    double total = 0.0;
    for(i = 0; i < Max; i++)
        total += golf[i];

    //report results
    cout << total / Max << " = average score " << Max << " rounds\n";

    return 0;
}
