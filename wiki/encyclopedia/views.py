from django.shortcuts import render
from django import forms
from django.http import HttpResponseRedirect
from django.urls import reverse
from . import util


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
    md_content = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter some markdown content here!',
        'style': 'border-radius: 1rem;\
        border: 0.1rem solid rgb(230,230,230);\
        padding: 0.75rem 0.75rem;\
        max-height: 60vh;'
    }), label="")


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def wiki_entry(request, entry_title):
    content = util.get_entry(entry_title)
    return render(request, "encyclopedia/wiki_entry.html", {
        "entry_title": entry_title,
        "content": content
    })


def search_results(request):
    query = request.GET.get('q')
    matches = []
    for entry in util.list_entries():
        if query.lower() == entry.lower():
            return wiki_entry(request, query)
        elif query.lower() in entry.lower():
            matches.append(entry)
    return render(request, "encyclopedia/search_results.html", {
        "query": query,
        "matches": matches
    })

def new_page(request):
    if request.method == "POST":
        form = NewPageForm(request.POST)
        if form.is_valid():
            new_page_title = form.cleaned_data["title"]
            new_page_content = form.cleaned_data["md_content"]
            try:
                util.save_entry(new_page_title, new_page_content)
                return HttpResponseRedirect(reverse('wiki_entry', kwargs={'entry_title': new_page_title}))
            except:
                return render(request, "encyclopedia/new_page.html", {
                "name_error": True
            })
            
        else:
            return render(request, "encyclopedia/new_page.html", {
                "form": form
            })
    return render(request, "encyclopedia/new_page.html", {
        "form": NewPageForm()
    })
