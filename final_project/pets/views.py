from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required

from .models import User

# Create your views here.
def index(request):
    return render(request, "pets/index.html")

# Authentication views
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication is successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "pets/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "pets/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        first_name = request.POST["first name"]
        last_name = request.POST["last name"]
        if password != confirmation:
            return render(request, "pets/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, password=password, first_name=first_name, last_name=last_name)
            user.save()
        except IntegrityError:
            return render(request, "pets/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponse(status=204)
    else:
        return render(request, "pets/register.html")