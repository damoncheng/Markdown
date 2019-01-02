//limits.cpp: some integer limit
#include <iostream>
#include <iomanip>
using namespace std;

#include <climits>
#include <cfloat>

int main()
{

    int n_int = INT_MAX;
    short n_short = SHRT_MAX;
    long n_long = LONG_MAX;


    cout << "#----------integer limit------------#" << endl;
    //get integer limit by sizeof
    cout << "int is "<<sizeof(int) << " bytes by sizeof"<<endl;
    cout << "short is "<<sizeof(short) << " bytes by sizeof"<<endl;
    cout << "long is "<<sizeof(long) << " bytes by sizeof"<<endl;

    cout << "maximum values:"<<endl;
    //get integer limit by climits
    cout << "int is " << INT_MAX << " by INT_MAX"<<endl;
    cout << "short is " << SHRT_MAX << " bytes by SHRT_MAX"<<endl;
    cout << "long is " << LONG_MAX << " bytes by LONG_MAX"<<endl;

    cout << "Minimum int value= " << INT_MIN << "\n";
    cout << "Bits per byte= " << CHAR_BIT << "\n";

    cout << "#---------float limit--------------#" << endl;
    cout << "long double bits : " << sizeof(long double) * 8 << endl;
    cout << "double bits : " << sizeof(double) * 8 << endl;
    cout << "float bits : " << sizeof(float) * 8 << endl;

    cout << "long double mantissa bits : " << LDBL_MANT_DIG << endl;
    cout << "double mantissa bits : " << DBL_MANT_DIG << endl;
    cout << "float bits : " << FLT_MANT_DIG << endl;

    cout << "22 bits long double : " << setprecision(17) << 1.1111111111111111111111L << endl;
    cout << "15 bits double : " << setprecision(17) << 1.111111111111111E0 << endl;
    cout << "15 bits double : " << setprecision(17) << 1.111111111111111 << endl;
    cout << "10 bits float : " << setprecision(8) << 1.1111111111F << endl;

    return 0;

}
