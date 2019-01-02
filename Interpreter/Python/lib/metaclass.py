import inspect

"""

def upper_attr(cls_name, parents, attrs):
    attrs = ((name, value) for name, value in attrs.items() if not name.startswith("__"))
    upper_attrs = dict((name.upper(), value) for name,value in attrs)
    return type(cls_name, parents, upper_attrs)



class Test(object):

    name = "hello metaclass"

    def __init__(self, *args, **kwargs):
        print "test init"

    __metaclass__ = upper_attr

"""
#t = Test()

#Test.m = 123
#print Test.m

"""

test = Test()
print hasattr(test, "NAME")

print test1.test

#print test1.test
#print test1.__class__
#print test1.__class__.__class__

"""

"""
Test1 = type("Test1", (), {"test" : "hello metaclass"})
test1 = Test1()

print(test1.test)
print(test1.__dict__)
"""


class UpperMetaClass(type):

    def __new__(upperattr_metaclass, future_class_name, future_class_parents, future_class_attr, **kwargs):

        print("..........123")

        print("future_class_parents:", future_class_parents)
        print("future_class_attr:", future_class_attr)

        upper_attr = {}

        for name,value in future_class_attr.items():

            if not name.startswith('__'):
                upper_attr[name.upper()] = value
            else:
                upper_attr[name] = value

        new_class = super(UpperMetaClass, upperattr_metaclass).__new__(upperattr_metaclass, future_class_name, future_class_parents, upper_attr, **kwargs)

        new_class._prepare()

        return new_class


    def add_to_class(cls, name, value):
        # We should call the contribute_to_class method only if it's bound
        if not inspect.isclass(value) and hasattr(value, 'contribute_to_class'):
            value.contribute_to_class(cls, name)
        else:
            setattr(cls, name, value)


    def _prepare(cls):
        print("metaclass _pepare")
        cls.add_to_class("m", "123")


class ParentTest(metaclass=UpperMetaClass):

    parent_name = "hello parent metaclass"

    def __init__(self, *args, **kwargs):
        self.parent_m = 456


class Test(ParentTest):

    name = "hello metaclass"

    def __init__(self, *args, **kwargs):
        self.m = 123
        super().__init__()


test = Test()
print(test.parent_m)
print(test.PARENT_NAME)


"""
test = Test()
test.n = 123

print(test.__dict__)

print(Test.__class__)
print(hasattr(test, "NAME"))
print(hasattr(test, "name"))
"""
