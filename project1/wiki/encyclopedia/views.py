from django.shortcuts import render

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def wikiEntry(request, entryTitle):
    return render(request, "encyclopedia/wikiEntry.html", {
        "entryTitle": entryTitle,
        "content": util.get_entry(entryTitle).replace('"', '')
    })

