#ifndef   _VECTOR_H_
#define   _VECTOR_H_

#include <iostream>
using namespace std;


namespace VECTOR {


    class Vector 
    {
        private:
            double x;       //horizontal value
            double y;       //vertical value
            double mag;     //length of vector
            double ang;     //direction of vector
            char mode;      //'r' = rectanglar, 'p' = polar

            //private methods for settings values
            void set_mag();
            void set_ang();
            void set_x();
            void set_y();

        public:

            Vector();
            Vector(char form);
            Vector(double n1, double n2, char form='r');
            void set(double n1, double n2, char form='r');
            ~Vector();

            double xval() const {return x;} //report x value
            double yval() const {return y;} //report y value
            double magval() const {return mag;} //resport magnitude
            double angval() const {return ang;} //report angle
            operator double() const;

            void polar_mode(); //set mode to p
            void rect_mode();  //set mode to r

            //operator overloading
            Vector operator+(const Vector & b) const;
            Vector operator-(const Vector & b) const;
            Vector operator-() const;
            Vector operator*(double n) const;

            //friends
            friend Vector operator*(double n, const Vector &a);
            friend ostream & operator<<(ostream & os, const Vector & v);
    };


}

#endif
