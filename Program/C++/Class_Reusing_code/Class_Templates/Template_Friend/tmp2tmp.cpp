//tmp2tmp.cpp -- template friends to a template class

#include <iostream>
using namespace std;

#include <cstring>

//template prototypes
template <typename T> void counts(const char * type); 
template <typename T> void report(T &);

//template class
template <typename TT>
class HasFriendT
{

private:
	TT item;
	static int ct;

public:
	HasFriendT(const TT & i):item(i){ct++;}
	~HasFriendT(){ct--;}
	friend void counts<TT>(const char * type);
	friend void report<>(HasFriendT<TT> &);
	//friend void report< HasFriendT<TT> >(HasFriendT<TT> &);

};

template <typename T>
int HasFriendT<T>::ct = 0;

//template friend functions definitions
template <typename T>
void counts(const char * type)
{
	cout << type << " template counts():" << HasFriendT<T>::ct << endl;
}

template <typename T>
void report(T & hf)
{
	cout << hf.item << endl;
}

int main()
{

	counts<int>("int");
	HasFriendT<int> hfi1(10);
	HasFriendT<int> hfi2(20);
	HasFriendT<double> hfd(10.5);

	report(hfi2); //generate report(HasFriendT<int> &)
	report(hfd);  //generate report(HasFriendT<double> &)
	counts<double>("double");
	counts<int>("int");

	return 0;
}
