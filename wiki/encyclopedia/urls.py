from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:entry_title>", views.wiki_entry, name="wiki_entry"),
    path("search/", views.search_results, name="search_results")
]
