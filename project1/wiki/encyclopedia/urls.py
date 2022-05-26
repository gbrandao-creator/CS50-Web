from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:entryTitle>", views.wikiEntry, name="wikiEntry"),
    path("search/", views.searchResults, name="searchResults")
]
