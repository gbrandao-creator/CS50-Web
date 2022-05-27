from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:entry_title>", views.wiki_entry, name="wiki_entry"),
    path("search/", views.search_results, name="search_results"),
    path("newpage/", views.new_page, name="new_page"),
    path("editpage/<str:entry_title>", views.edit_page, name="edit_page")
]
