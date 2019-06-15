from django.shortcuts import render
from django.contrib import messages

from django.contrib.auth.mixins import LoginRequiredMixin 
from django.views.generic import ListView, CreateView, DetailView, UpdateView

from .models import Flavor
from .forms  import FlavorForm

# Create your views here.
class FlavorActionMixin:

   #fields = "__all__"

   @property
   def success_msg(self): 
       return NotImplemented

   def form_valid(self, form):
       messages.info(self.request, self.success_msg)
       return super(FlavorActionMixin, self).form_valid(form)

class FlavorListView(ListView):
   model = Flavor
   context_object_name = 'flavor_object_list'

   def get_queryset(self):

       queryset = super(FlavorListView, self).get_queryset()

       q = self.request.GET.get("q")

       if q:
           return queryset.filter(title__icontains=q)

       return queryset

   def get_context_data(self, **kwargs):
       context = super().get_context_data(**kwargs)
       context['flavor_has_scoops_object_list'] = self.get_queryset().filter(scoops_remaining=0)
       context['flavor_no_scoops_object_list'] = self.get_queryset().filter(scoops_remaining=1)
       return context

class FlavorDetailView(DetailView):
   model = Flavor

#class FlavorUpdateView(LoginRequiredMixin, FlavorActionMixin, UpdateView): 
class FlavorUpdateView(FlavorActionMixin, UpdateView): 
   model = Flavor
   form_class = FlavorForm
   success_msg = "Flavor updated!"

#class FlavorCreateView(LoginRequiredMixin, FlavorActionMixin, CreateView): 
class FlavorCreateView(FlavorActionMixin, CreateView): 
   model = Flavor
   fields = "__all__"
   #form_class = FlavorForm
   success_msg = "Flavor created!"


