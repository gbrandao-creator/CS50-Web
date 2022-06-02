from django import forms
from numpy import require

custom_styles = '''
    border-radius: 0.5rem;
    border: 0.1rem solid rgb(200,200,200);
    padding: 0.75rem 0.75rem;
    width: 50%;
    margin-bottom: 1rem;
'''

class NewListingForm(forms.Form):
    title = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Listing title',
        'style': custom_styles + '''
        font-weight: bold;'''
    }), label="")
    description = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter your listing description',
        'style': custom_styles + '''
        border-radius: 1rem;
        max-height: 35vh;
        '''
    }), label="")
    starting_bid = forms.DecimalField(widget=forms.NumberInput(attrs = {
        'placeholder': 'Enter starting bid',
        'data-mask': "R$0000,00",
        'style': custom_styles
    }))
    image_url = forms.URLField(required=False, widget=forms.URLInput(attrs= {
        'placeholder': 'Enter listing\'s image URL (optional)',
        'style': custom_styles
    }))
    category = forms.CharField(required=False, widget=forms.TextInput(attrs= {
        'placeholder': 'Enter a category (optional)',
        'style': custom_styles
    }))