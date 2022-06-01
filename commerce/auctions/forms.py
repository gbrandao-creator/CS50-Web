from django import forms
from numpy import require

class NewListingForm(forms.Form):
    title = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Listing title',
        'style': '''
        size: larger;
        border-radius: 0.5rem;
        border: 0.1rem solid rgb(230,230,230);
        padding: 0.75rem 0.75rem;
        font-weight: bold;
        width: 45%;
        margin-bottom: 1.5rem
        '''
    }), label="")
    description = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter your listing\'s description!',
        'style': '''
        border-radius: 1rem;
        border: 0.1rem solid rgb(230,230,230);
        padding: 0.75rem 0.75rem;
        max-height: 60vh;
        '''
    }), label="")
    starting_bid = forms.DecimalField()
    url = forms.URLField(required=False)