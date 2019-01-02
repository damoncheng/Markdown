#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

#include "include/vector.h"



int main()
{

    using VECTOR::Vector;
    srand(time(0));
    double direction;

    Vector step = 'r';       //char convert to Vector by constructor Vector(char)
    Vector result(0.0,0.0);

    unsigned long steps = 0;
    double target;
    double dstep;

    cout << "Enter target distance (q to quit):";
    while(cin >> target)
    {
        cout << "Enter step length:";
        if(!(cin >> dstep))
            break;

        result.set(0.0, 0.0);
        while(result.magval() < target)
        {
            direction = rand() % 360;
            step.set(dstep, direction, 'p');
            result = result + step;
            steps++;
        }

        cout << "After " << steps << " steps, the subject"
                "has the following location:\n";
        cout << result << "\n";
        result.polar_mode();
        cout << "or\n" << result << "\n";

        cout << "Average outward distance per step = "
             << result.magval() / steps << "\n";

        steps = 0;
        cout << "Enter target distance(q to quit):";
    }

    double last_result = result; //convert Vector object to double, by operator double()
    cout << endl;
    cout << "mag of last result is " << last_result << endl;

    cout << "Bye!\n";

    return 0;
}
