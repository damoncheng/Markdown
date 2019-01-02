#include <iostream>
using namespace std;

#include "include/function.h"
#include "include/function_template.h"
using namespace damoncheng;

using ziyi::custom_min;

const char * tag = "hello all";
const static char * func_name = "main";


int main(){

    double x;
    cout << custom_max(2,3) << endl;
    cout << custom_min(5.1,7.1) << endl;
    cout << custom_min(3.1,4.1) << endl;

    print_tag();

    return 0;
}


