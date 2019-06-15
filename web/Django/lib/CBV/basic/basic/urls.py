"""basic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from start.views import MyView,MyTemplateView
from flavor.views import FlavorListView,FlavorDetailView,FlavorUpdateView,FlavorCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('about/', MyView.as_view()),
    path('template/', MyTemplateView.as_view()),
    path('flavors/', FlavorListView.as_view(), name="flavor-list"),
    path('flavors/add/', FlavorCreateView.as_view(), name="flavor-create"),
    path('flavors/<int:pk>/', FlavorDetailView.as_view(), name="flavor-detail"),
    path('flavors/<int:pk>/update/', FlavorUpdateView.as_view(), name="flavor-update"),
]


