from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from django.views.generic import TemplateView

# Create your views here.
class MyView(View):
    def get(self, request):
        # <view logic>
        return HttpResponse('result')

class MyTemplateView(TemplateView):
    template_name = "about.html"
