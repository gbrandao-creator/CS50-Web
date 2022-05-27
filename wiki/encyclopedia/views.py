# -*- coding: utf-8 -*-
from django.shortcuts import render
from . import forms
from django.http import HttpResponseRedirect
from django.urls import reverse
from . import util





def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def wiki_entry(request, entry_title):
    content = util.get_entry(entry_title)
    print(content)
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
        form = forms.NewPageForm(request.POST)
        if form.is_valid():
            new_page_title = form.cleaned_data["title"]
            new_page_content = form.cleaned_data.get("markdown_content")
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
        "page_title": "Create New Page",
        "form": forms.NewPageForm()
    })

def edit_page(request, entry_title):
    if request.method == "POST":
        form = forms.EditPageForm(request.POST)
        if form.is_valid():
            edit_page_content = form.cleaned_data.get("markdown_content")
            print("Este é o edit_page_content: ", edit_page_content)
            util.save_entry(entry_title, edit_page_content, edit=True)
            return HttpResponseRedirect(reverse('wiki_entry', kwargs={'entry_title': entry_title}))
        else:
            content = util.get_entry_markdown(entry_title)
            return render(request, "encyclopedia/edit_page.html", {
                "entry_title": entry_title,
                "form": forms.EditPageForm(initial={'markdown_content': content})
            })
    content = util.get_entry_markdown(entry_title)
    return render(request, "encyclopedia/edit_page.html", {
        "entry_title": entry_title,
        "form": forms.EditPageForm(initial={'markdown_content': content})
    })