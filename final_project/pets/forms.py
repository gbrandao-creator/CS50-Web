from django import forms

custom_styles = '''
    border-radius: 0.5rem;
    border: 0.1rem solid rgb(200,200,200);
    padding: 0.5rem 0.5rem;
    width: 100%;
    margin-bottom: 0.5rem;'''

class registerForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Username',
        'style': custom_styles
    }), label='')
    first_name = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'First Name',
        'style': custom_styles
    }), label='')
    last_name = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Last Name',
        'style': custom_styles
    }), label='')
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Password',
        'style': custom_styles
    }), label='')
    confirmation = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Confirmation',
        'style': custom_styles
    }), label='')

class loginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Username',
        'style': custom_styles
    }), label='')
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Password',
        'style': custom_styles
    }), label='')