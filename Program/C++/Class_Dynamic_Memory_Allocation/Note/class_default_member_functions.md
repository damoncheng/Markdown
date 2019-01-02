##default constructor and operator member##
1. A default constructor if you define no constructor
2. A copy constructor if you don't define one
3. An assignment operator if you don't define one
4. A default destructor if you don't define one
5. An address operator if you don't define one (return the value of the this pointer)

##notice heap memory assignment in copy constructor##
If a class contains members that are pointers initialized by new, the you should define a copy constructor that copies the pointed-to data instead of copying the pointers themselves.


##notice assignment operator member function##
1. Because the target object may already refer to prevously allocated data, the function should use delete[] to free former obligation
2. The function should project against assignment an object to itself; otherwise, the freeing of memory descibed previously could erase the object's contents before they are reassigned.
3. The function returns a reference to the invoking object.

##class init : call both copy constructor and assignment member function##
StringBad metoo = knot;

- step one: using copy constructor to create a temporary object.

- step two: and then using assignment to copy the values to the new object. 

##Static Class Member Functions##
in count = String::HowMany();

- a static member function is not associated with a particular object, the only data members it can use are the static data members.

##Things to Remember When Using new in Constructor##
* If you use new to initialize a pointer member in a constructor, you should use delete in the destructor.
* The uses of new and delete should be compatible. Pair new with delete and new[] with delete[].
* If there are multible constructors, all should use new the same way, either all with brackets or all without brackets.
  There is only one destructor, so all constructors have to be compatible to that destructor. It is, however, permissible to initialize a pointer with new in one constructor
  and with the null pointer(NULL or 0) in another constructor because it's okay to apply the delete operation (with or without brackets) to the null pointer.

* you shoule define a copy constructor that initialize one object to another by doing deep copying. Typically, the constructor would emulate the following example:

    	String::String(const String &st)
    	{
    		num_strings++;
    		len = st.len;
    		str = new char[len + 1];
    		strcpy(str, st.str);
    	}
    
* You should define an assignment operator that copies one object to another by doing deep copying. Typically, the class method would emulate the following example:

        String & String::operator=(const String & st)

        {
        
             if (this == &st)            // object assigned to itself
        
                  return *this;          // all done
        
             delete [] str;              // free old string
        
             len = st.len;
        
             str = new char [len + 1];   // get space for new string
        
             strcpy(str, st.str);        // copy the string
        
             return *this;               // return reference to invoking object
        
        }
                
* In particular, the method should check for self-assignment; it should free memory formerly pointed to by the member pointer; it should copy the data, not just the address of the data; and it should return a reference to the invoking object.    


## Let's emphasize again when destructor get called. ##

* If an object is an automatic variable, the object's destructor is called when the program exits the block in which the object is defined. 

* If an object is a static variable (external, static, static external, or from a namespace), its destructor is called when the program terminates. This is what happened for the sports object.

* If an object is created by new, its destructor is called only when you explicitly delete the object.

## Class Whose Constructor Use new ##

* Any class member pointing to memory allocated by new should have the delete operator applied to it in the class destructor. This frees the allocated memory.

* If a destructor frees memory by applying delete to a pointer that is a class member, then every constructor for that class should initialize that pointer either by using new or by setting the pointer to the null pointer.

* Constructors should settle on using either new [] or new, but not a mixture of both. The destructor should use delete [] if the constructors use new [], and it should use delete if the constructors use new.

* you should define a copy constructor that allocates new memory rather than copying a pointer to existing memory. This enables a program to initialize one class object to another. The constructor normally should have the following form of prototype:

        className(const className &)

* You should define a class member function overloading the assignment operator and having the following form of function definition (here c_pointer is a member of the c_name class and has the type pointer-to-type_name):

        c_name & c_name::operator=(const c_name & cn)
        
        {
        
            if (this == & cn_)
        
                return *this;     // done if self-assignment
        
            delete c_pointer;
        
            c_pointer = new type_name[size];
        
            // then copy data pointed to by cn.c_pointer to
        
            // location pointed to by c_pointer
        
            ...
        
            return *this; 
        
        }
        
## Design Pattern : The Singleton Design Pattern ##

- Often you can find a single general pattern that solves a variety of problems. This is true in human interactions; there's the recipe "take a deep breath and count to ten before responding." In programming, too, common patterns emerge when you study software design problems. A design pattern is the software equivalent of a particular cooking style, in which the same approach can be applied to different selections of ingredients. You can apply a design pattern to create an elegant and consistent solution to your recurring problem domains. For example, you can use the Singleton pattern when you want exactly one and only one instance of your class to be returned to a caller. Here's how such a class might be declared:
 
- By declaring the TheOnlyInstance constructor as protected and omitting any public constructor, you can ensure that no local instances can be created:       
        
            class TheOnlyInstance
    
            {
            
              public:
            
                static TheOnlyInstance* GetTheOnlyInstance();
            
                // other methods
            
              protected:
            
                TheOnlyInstance() { }
            
              private:
            
                // private data
            
            } ;
            
            
- The public static method GetTheOnlyInstance serves as the sole access point for the class during its lifetime. When called, it returns an instance of class TheOnlyInstance.

            
            
            TheOnlyInstance* TheOnlyInstance::GetTheOnlyInstance()
            {
            
                static TheOnlyInstance objTheOnlyInstance;
            
                return &objTheOnlyInstance;
            
            }
            
- The GetTheOnlyInstance method simply creates a static instance of class TheOnlyInstance the first time the static GetTheOnlyInstance method is called. A static object constructed in this manner remains valid until the program terminates at which point it is automatically destroyed. To retrieve a pointer to the only instance of this class, a program can simply call the static method GetTheOnlyInstance, which returns the address of the singleton object.

        TheOnlyInstance* pTheOnlyInstance = TheOnlyInstance::GetTheOnlyInstance();