from django.http import Http404, HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required

from .models import User
from . import forms

# Create your views here.
def index(request, message=""):
    return render(request, "pets/index.html", {
        "message": message
    })

def search_view(request):

    location = request.GET.get('l')
    from_date = request.GET.get('fd')
    until_date = request.GET.get('ud')

    print(location, from_date, until_date)
    return render(request, "pets/search.html", {  
    })

def profile(request, username):
    try:
        profile_user = User.objects.get(username=username)
    except:
        return HttpResponse(status=404)
    if profile_user.confirmed:
        return render(request, "pets/profile.html", {
            "profile_user": profile_user
        })
    else:
        return HttpResponse(status=404)


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
                "form": forms.loginForm,
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "pets/login.html", {
            "form": forms.loginForm
        })

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        
        username = request.POST["username"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        if password != confirmation:
            return render(request, "pets/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, password=password, first_name=first_name, last_name=last_name)
            user.save()
            print(user.username, user.first_name, user.last_name)
        except IntegrityError:
            return render(request, "pets/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse('register_confirm'))
    else:
        return render(request, "pets/register.html", {
            "form": forms.registerForm
        })

@login_required
def register_confirm(request):
    if request.method == "POST":
        photo_url = request.POST["photo_url"]
        bio = request.POST["bio"]
        is_pet_sitter = True if request.POST["is_pet_sitter"] == "yes" else False
        hour_rate = request.POST["hour_rate"]

        print(photo_url, bio, is_pet_sitter, hour_rate)

        request.user.photo_url = photo_url
        request.user.bio = bio
        request.user.is_pet_sitter = is_pet_sitter
        if is_pet_sitter:
            pass
            request.user.hour_rate = hour_rate
        request.user.confirmed = True

        request.user.save()
        
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "pets/register_confirm.html")