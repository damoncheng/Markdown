from django.db import models
from .validators import validate_tasty

# Create your models here.

class TastyTitleAbstractModel(models.Model):

    title = models.CharField(max_length=255, validators=[validate_tasty])

    class Meta:
        abstract = True


