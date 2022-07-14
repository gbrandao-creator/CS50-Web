from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("register/confirm", views.register_confirm, name="register_confirm"),
    path("logout", views.logout_view, name="logout"),
    path("search", views.search_view, name="search")
]