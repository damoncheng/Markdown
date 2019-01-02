//assign.cpp -- type changes on assignment
#include <iostream>

using namespace std;

int main()
{
    short chickens = 20;
    short ducks = 35;

    //assign converted
    float tree = 3; //int converted to float;

    /*mixed types in expression:
     *
     * first :  some types automatically are converted whenever they occur.
     *  
     *   C++ converts bool, char, unsigned char, signed char, and short values to int
     *   
     * second : some types are converted when they are combined with other types in an expression.
     *
     *   When an operation involves two types, the smaller is converted to the larger
     *
     * */
    //chickens and ducks and converts both to int, Then the program converts the result back to type short.
    short fowl = chickens + ducks;


    //pass arguments to functions
    /*
     *. In that case, C++ applies the integral promotions to the char and short types (signed and unsigned). 
        Also, to preserve compatibility with huge amounts of code in classic C, C++ promotes float arguments to double when passing them to a function that waives prototyping.
     * */

    //typecast
    int bats;
    bats = (int)19.99 + (int)19.99;

    cout << "tree:" << tree << endl;
    cout << "fowl:" << fowl << endl;
    cout << "bats:" << bats << endl;


    return 0;


}
