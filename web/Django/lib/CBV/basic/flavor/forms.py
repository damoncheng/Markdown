from django.forms import forms,ModelForm
from flavor.models import Flavor

from core.validators import validate_tasty

class FlavorForm(ModelForm):

    def __init__(self, *args, **kwargs):

        super(FlavorForm, self).__init__(*args, **kwargs)
        self.fields['title'].validators.append(validate_tasty)
        self.fields['slug'].validators.append(validate_tasty)

    #Pattern3 : Overriding the Clean Stage of Validation
    def clean_slug(self):
        title = self.cleaned_data['title']
        slug = self.cleaned_data['slug']

        if slug.endswith("scoop") and not title.endswith("scoop"):
            msg = 'Sorry, title must end with scoop.'
            raise forms.ValidationError(msg)

        return slug;

    class Meta:
        model = Flavor
        fields = "__all__"


