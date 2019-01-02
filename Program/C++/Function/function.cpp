#include <iostream>
using namespace std;

struct Person {
    char name[20];
    int age;
};

/*the most expilit declare and definition, when two argument are int, call it*/
inline int custom_max(int a, int b)
{
    return (a>b)?a:b;
}

/* the impliest declare and definition */
template <typename T>
T custom_max(T &a, T &b)
{
    return (a>b)?a:b;
}

/*
 * specification declare and definition, the prority higher than upstair, but lower than first
 *
 * */
template <> struct Person custom_max<struct Person>(struct Person &p1, struct Person &p2)
{
    return (p1.age > p2.age)?p1:p2;
}


/*overload template*/
template <typename T>
T custom_max(T a[], int n)
{
    T max = a[0];
    for(int i = 0; i < n; i++)
    {
        if(a[i] > max)
        {
            max = a[i];
        }
    }
    return max;
}

int main()
{

    int a=2,b=3,c[3]={1,2,4};
    cout << custom_max(a,b) << endl;

    double x=2.1,y=3.1;
    cout << custom_max(x,y) << endl;

    Person p1,p2,p3;
    p1.age = 10;
    p2.age = 20;

    p3 = custom_max(p1,p2);
    cout << p3.age << endl;

    cout << custom_max(c, 3) << endl;

    return 0;
}


