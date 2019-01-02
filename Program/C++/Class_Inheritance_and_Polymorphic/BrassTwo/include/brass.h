#ifndef BRASS_H_
#define BRASS_H_

/*
 *	keyword "virtual" : 
 *		If you don't use the keyword virutal, the program chooses a method based on the reference type or pointer type. 
 *      If you do use the keyword virtual, the program chooses a method based on the type of object the reference or pointer refers to.
 * */

//Brass Account Class
class Brass
{

    private:
		enum {MAX = 35};
		char fullName[MAX];
		long acctNum;
		double balance;

	public:
		Brass(const char * s = "Nullbody", long an = -1, double bal = 0.0);
		void Deposit(double amt);
		virtual void Withdraw(double amt);

		double Balance() const;
		virtual void ViewAcct() const;
		virtual ~Brass() {} ;

};

//Brass Account Class
class BrassPlus : public Brass
{

	private:
		double maxLoan;
		double rate;
		double owesBank;
	
	public:
		BrassPlus(const char * = "Nullbody", long an = -1, double bal = 0.0, 
				  double ml = 500, double r = 0.10);
		BrassPlus(const Brass & ba, double ml = 500, double r = 0.1);
		virtual void ViewAcct() const;
		virtual void Withdraw(double amt);
		void ResetMax(double m) {maxLoan = m;};
		void ResetRate(double r) {rate = r;};
		void ResetOwes() {owesBank = 0;}; 

};

#endif
