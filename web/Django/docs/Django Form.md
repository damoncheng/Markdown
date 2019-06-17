# Django Form

## 基本概念

HTML 表单的主要作用是接收用户的输入，实现用户与Web服务器的交互。

表单是控件的容器，一个表单由form元素、表单控件和表单按钮三部分组成：

- form元素：用来创建表单，并通过 action、method和enctype三个属性，来设置表单的提交路径、提交方式、编码类型。

- 表单控件：主要用来收集用户数据，包括 label、input、textarea、select等.

- 表单按钮：包括提交按钮、重置按钮和一般按钮。提交按钮和一般按钮可用于把表单数据发送到服务器，重置按钮用于重置表单，把整个表单恢复到初始状态。


## Django表单相关部件


- Form

		>>> from django import forms
		>>> class CommentForm(forms.Form):
		...     name = forms.CharField(initial='class')
		...     url = forms.URLField()
		...     comment = forms.CharField()
		>>> f = CommentForm(auto_id=False)
		>>> print(f)
		<tr><th>Name:</th><td><input type="text" name="name" value="class" required /></td></tr>
		<tr><th>Url:</th><td><input type="url" name="url" required /></td></tr>
		<tr><th>Comment:</th><td><input type="text" name="comment" required /></td></tr>
		
- Widget

		>>> from django import forms
		>>> class CommentForm(forms.Form):
		...     name = forms.CharField(initial='class')
		...     url = forms.URLField()
		...     comment = forms.CharField(widget=forms.Textarea)
		>>> f = CommentForm(auto_id=False)
		>>> print(f)
		<tr><th>Name:</th><td><input type="text" name="name" value="class" required /></td></tr>
		<tr><th>Url:</th><td><input type="url" name="url" required /></td></tr>
		<tr><th>Comment:</th><td><textarea name="comment" cols="40" rows="10" required>
		</textarea></td></tr>
		
- ModelForm 

		class Flavor(TastyTitleAbstractModel):
		
		    STATUS_0 = 0
		    STATUS_1 = 1
		    STATUS_CHOICES=(
		        (STATUS_0, 'zero'),
		        (STATUS_1, 'one'),
		    )
		
		    #letters, numbers, underscores or hyphens.
		    slug = models.SlugField(unique=True)
		    scoops_remaining = models.IntegerField(choices=STATUS_CHOICES,
		           default=STATUS_0)



		from flavor.models import Flavor
		class FlavorForm(ModelForm):

		    class Meta:
		        model = Flavor
		        fields = "__all__"
		


		>>> from flavor.forms import FlavorForm
		>>> f = FlavorForm() //f = FlavorForm(instance=f)基于实例生成表单
		>>> print(f)    
		<tr><th><label for="id_title">Title:</label></th><td><input type="text" name="title" maxlength="255" required id="id_title" /></td></tr>
		<tr><th><label for="id_slug">Slug:</label></th><td><input type="text" name="slug" maxlength="50" required id="id_slug" /></td></tr>
		<tr><th><label for="id_scoops_remaining">Scoops remaining:</label></th><td><select name="scoops_remaining" id="id_scoops_remaining">
		  <option value="0" selected>zero</option>
		
		  <option value="1">one</option>
		
		</select></td></tr>
		
	model字段转form字段对应表:
	
		https://docs.djangoproject.com/en/2.1/topics/forms/modelforms/#django.forms.ModelForm

- GCBV(通用类视图)

	from django.views.generic import ListView, CreateView, DetailView, UpdateView
	
		(
		
			内部使用form.is_valid()启动modelForm进行表单字段验证，
			参数验证成功后调用form.save()同步数据到数据库
			验证失败携带错误信息返回表单
		)

		其中CreateView和UpdateView会自动基于model生成表单数据form，save到数据库,填充到context, 提供给django模版渲染.
		
		   class FlavorCreateView(FlavorActionMixin, CreateView): 
			   model = Flavor
			   fields = "__all__"
			
				   
		   <form action="{{request.get_full_path}}" method="post">
			    {% csrf_token %}
			    {{ form }}
			    <input type="submit" value="Submit">
			</form>


## Common Patterns for Forms

- Pattern 1 : Simple ModelForm With Default Validators

- Pattern 2 : Custom Form Field Validators in ModelForms

- Pattern 3 : Overriding the Clean Stage of Validation

- Pattern 4 : Hacking Form Fields(2 CBVs, 2 Forms, 1 Model)

	当create和update表单内容验证模式不一样时的处理场景
	
	
	    # stores/models.py
		from django.db import models from django.urls import reverse
		class IceCreamStore(models.Model):
			title = models.CharField(max_length=100) 
			block_address = models.TextField()
			phone = models.CharField(max_length=20, blank=True) 
			description = models.TextField(blank=True)
			
			def get_absolute_url(self):
				return reverse('store_detail', kwargs={'pk': self.pk}

		# stores/forms.py
		from django import forms
		from .models import IceCreamStore
		
		class IceCreamStoreCreateForm(forms.ModelForm):
		
			class Meta:
				model = IceCreamStore
				fields = ['title', 'block_address', ]
				
		class IceCreamStoreUpdateForm(IceCreamStoreCreateForm):
		
			def __init__(self, *args, **kwargs): 
				 super(IceCreamStoreUpdateForm,
		                   self).__init__(*args, **kwargs)
		        self.fields['phone'].required = True
		        self.fields['description'].required = True
		        
			class Meta(IceCreamStoreCreateForm.Meta):
			
				# show all the fields!
				fields = ['title', 'block_address', 'phone',
				                   'description', ]
		 

		# stores/views
		from django.views.generic import CreateView, UpdateView
		from .forms import IceCreamStoreCreateForm, IceCreamStoreUpdateForm
		from .models import IceCreamStore
		
		class IceCreamCreateView(CreateView): 
			model = IceCreamStore
			form_class = IceCreamStoreCreateForm
			
		class IceCreamUpdateView(UpdateView): 
			model = IceCreamStore
			form_class = IceCreamStoreUpdateForm	
- Pattern 5 : Reusable Search Mixin View

		融入一些mixin的概念
		
		# core/views.py
		class TitleSearchMixin:
		
			def get_queryset(self):
				# Fetch the queryset from the parent's get_queryset 
				queryset = super(TitleSearchMixin, self).get_queryset()
		       # Get the q GET parameter
				q = self.request.GET.get('q') 
				if q:
		          # return a filtered queryset
					return queryset.filter(title__icontains=q) 
					
				# No q is specified so we return queryset 
				return queryset
				
		# add to flavors/views.py
		from django.views.generic import ListView from .models import Flavor
		from core.views import TitleSearchMixin
		class FlavorListView(TitleSearchMixin, ListView):
		       model = Flavor
		       
		 		# add to stores/views.py
		from django.views.generic import ListView
		from .models import Store
		from core.views import TitleSearchMixin
		class IceCreamStoreListView(TitleSearchMixin, ListView): 
				model = Store
				
								

## Form Fundamentals

-  Validate All Incoming Data With Django Forms

-  Use the POST Method in HTML Forms

-  Always Use CSRF Protection With HTTP Forms That Modify Data

-  Understand How to Add Django Form Instance Attributes

		from django import forms
		from .models import Taster
		class TasterForm(forms.ModelForm):
		
			class Meta:
			model = Taster
			def __init__(self, *args, **kwargs):
				# set the user as an attribute of the form 
				self.user = kwargs.pop('user')
				super(TasterForm, self).__init__(*args, **kwargs)
				

 		from django.contrib.auth.mixins import LoginRequiredMixin 
		from django.views.generic import UpdateView
		from .forms import TasterForm from .models import Taster
		class TasterUpdateView(LoginRequiredMixin, UpdateView):
	
			model = Taster
			form_class = TasterForm
			success_url = '/someplace/'
			def get_form_kwargs(self):
				"""This method is what injects forms with keyword arguments.""" 
				# grab the current set of form #kwargs
				kwargs = super(TasterUpdateView, self).get_form_kwargs()
				# Update the kwargs with the user_id
				kwargs['user'] = self.request.user
				return kwargs
				
