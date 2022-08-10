from django import forms

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
    bid = forms.DecimalField(widget=forms.NumberInput(attrs = {
        'placeholder': 'Enter starting bid',
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

class NewBidForm(forms.Form):
    bid = forms.DecimalField(widget=forms.NumberInput(attrs = {
        'placeholder': 'Enter your bid',
        'style': custom_styles + 'width: 100%'
    }), label="")

class NewCommentForm(forms.Form):
    content = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter comment',
        'style': custom_styles + '''
        width: 100%;
        border-radius: 1rem;
        max-height: 20vh;
        '''
    }), label="")