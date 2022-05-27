from django import forms

class NewPageForm(forms.Form):
    title = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Page title',
        'style': 'size: larger;\
        border-radius: 0.5rem;\
        border: 0.1rem solid rgb(230,230,230);\
        padding: 0.75rem 0.75rem;\
        font-weight: bold;\
        width: 35%;\
        margin-bottom: 1.5rem'
    }), label="")
    markdown_content = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter some markdown content here!',
        'style': 'border-radius: 1rem;\
        border: 0.1rem solid rgb(230,230,230);\
        padding: 0.75rem 0.75rem;\
        max-height: 60vh;'
    }), label="")

class EditPageForm(forms.Form):
    markdown_content = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter some markdown content here!',
        'style': 'border-radius: 1rem;\
        border: 0.1rem solid rgb(230,230,230);\
        padding: 0.75rem 0.75rem;\
        max-height: 60vh;'
    }), label="")

