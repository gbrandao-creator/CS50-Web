from django.shortcuts import render

from . import util


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
