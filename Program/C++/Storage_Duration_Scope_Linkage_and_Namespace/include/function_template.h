#ifndef _FUNCTION_TEMPLATE_H
#define _FUNCTION_TEMPLATE_H

#include <iostream>
using namespace std;

namespace ziyi {
    template <typename T>
    T custom_min(T x, T y)
    {

        static int count = 0;
        count++;
        cout << "template count:" << count << endl;

        return (x>y)?y:x;
    }

}
#endif
