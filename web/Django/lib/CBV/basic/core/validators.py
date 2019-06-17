from django.core.exceptions import ValidationError

def validate_tasty(value):
   """Raise a ValidationError if the value doesn't start with the
       word 'Tasty'.
   """
   if not value.startswith('Tasty'): 
       msg = 'Must start with Tasty' 
       raise ValidationError(msg)
