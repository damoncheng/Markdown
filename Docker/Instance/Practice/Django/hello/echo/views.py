from django.shortcuts import render

# Create your views here.
def echo(request):
    return render(request, "hello.html", locals())
