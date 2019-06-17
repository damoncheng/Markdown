def func(method):

    def timed(obj, request, *args, **argv):

        print("before timed obj ", dir(obj))

        result = method(obj, request, *args, **argv)

        print("after timed request ", request)

        return result

    return timed

def detail_route(methods=["get"], **kwargs):
    """
    Used to mark a method on a ViewSet that should be routed for detail requests.
    """
    def decorator(func):
        func.bind_to_methods = methods
        func.detail = True
        func.kwargs = kwargs
        return func
    return decorator


class A:
    @detail_route()
    @func
    def hello(self, request, **kwargs):
        print("hello ", request, kwargs["d"])

A().hello('mmmm', d=2)
