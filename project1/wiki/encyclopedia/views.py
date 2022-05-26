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

def searchResults(request):
    query = request.GET.get('q')
    matches = []
    for entry in util.list_entries():
        if query.lower() == entry.lower():
            return wikiEntry(request, query)
        elif query.lower() in entry.lower():
            matches.append(entry)
    return render(request, "encyclopedia/searchResults.html", {
        "query": query,
        "matches": matches
    })
