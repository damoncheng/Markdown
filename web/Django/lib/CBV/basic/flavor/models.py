from django.db import models
from django.urls import reverse

# Create your models here.

#Pattern 1 : Simple ModelForm With Default Validators
"""
class Flavor(models.Model):

    STATUS_0 = 0
    STATUS_1 = 1
    STATUS_CHOICES=(
        (STATUS_0, 'zero'),
        (STATUS_1, 'one'),
    )
    title = models.CharField(max_length=255)
    #letters, numbers, underscores or hyphens.
    slug = models.SlugField(unique=True)

    scoops_remaining = models.IntegerField(choices=STATUS_CHOICES,
           default=STATUS_0)

    def get_absolute_url(self):
        return reverse("flavor-detail", kwargs={"pk": self.id})
"""


#Pattern 2 : Custom Form Field Validators in ModelForms
#At Tasty Research, every flavor must begin with “Tasty”
from core.models import TastyTitleAbstractModel

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

    def get_absolute_url(self):
        return reverse("flavor-detail", kwargs={"pk": self.id})



