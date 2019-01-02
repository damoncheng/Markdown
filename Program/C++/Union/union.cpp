#include <iostream>
using namespace std;

struct name_union 
{
    short type;

    union id {
        int int_id;
        char str_id[20];
    } u_id;
    
};

struct unname_union
{
    short type;

    union {
       int int_id; 
       char str_id[20];
    };

};

int main()
{
    /* named union */
    struct name_union named_struct;
    cout << "Enter int id to name_union:";
    cin >> named_struct.u_id.int_id;
    cout << "Entered int id are:" << named_struct.u_id.int_id << endl;


    /* not named union */
    struct unname_union unnamed_struct;
    cout << "Enter str id to unnamed_struct:";
    cin >> unnamed_struct.str_id;
    cout << "Enterd str id are:" << unnamed_struct.str_id << endl;

    return 0;
}
