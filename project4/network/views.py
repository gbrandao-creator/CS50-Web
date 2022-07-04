#delete this comment: cTxLa&Oj@iJ0

import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

from .models import User, Post, Follower, Like
from . import forms

def index(request):
    posts_list = Post.objects.all().order_by('-id')
    paginator = Paginator(posts_list, 10) # Show 10 posts per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/index.html", {
        'form': forms.NewPostForm(),
        'posts_page': page_obj,
        'num_pages': paginator.num_pages,
        'title': 'All Posts'
    })

@login_required
def following(request):
    following_users = []
    for user in request.user.following.all().iterator():
        following_users.append(user.following_user)
    posts_list = Post.objects.filter(owner__in=following_users)
    paginator = Paginator(posts_list, 10) # Show 10 posts per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/index.html", {
        'form': forms.NewPostForm(),
        'posts_page': page_obj,
        'num_pages': paginator.num_pages,
        'title': 'Following'
    })

@login_required
def new_post(request):
    if request.method == "POST":
        form = forms.NewPostForm(request.POST)
        if form.is_valid():
            content = form.cleaned_data["content"]
            owner = request.user
            Post.objects.create(content=content, owner=owner)
            return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/index.html")
            
@login_required
def edit_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    if request.method == "PUT":
        if request.user == post.owner:
            data = json.loads(request.body)
            if data.get("content") is not None:
                post.content = data["content"]
                post.save()
                print('entrei aqui')
                return JsonResponse({"message": "Post updated successfully."}, status=204)
            else:
                return JsonResponse({"error": "No content found."}, status=400)
        else:
            return JsonResponse({"error": "Authenticated user is not post owner"}, status=403)
    else:
        return JsonResponse({"error": "PUT request required."}, status=400)

@login_required
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)
    
    if request.method == "POST":
        data = json.loads(request.body)
        if data.get("like") is not None:
            if data["like"]:
                Like.objects.delete(post=post, owner=request.user)
                return JsonResponse({"message": "Successfully unliked post"}, status=204)
            else:
                Like.objects.create(post=post, owner=request.user)
                return JsonResponse({"message": "Successfully liked post"}, status=204)
        else:
            return JsonResponse({"error": "No data found."}, status=400)
    else:
        return JsonResponse({"error": "POST request required."}, status=400)


def user_profile(request, username):
    user = User.objects.get(username=username)
    does_follow = request.user.following.filter(following_user=user).exists()
    follow_msg = 'Unfollow' if does_follow else 'Follow'
    posts_list = user.user_posts.all().order_by('-id')
    paginator = Paginator(posts_list, 10) # Show 10 posts per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/profile.html", {
        'form': forms.NewPostForm(),
        'profile_user': user,
        'is_other_user': request.user.username != username,
        'follow_msg': follow_msg,
        'posts_page': page_obj,
        'num_pages': paginator.num_pages
    })

@login_required
def follow(request, username):
    user = User.objects.get(username=username)
    # If authenticated user is not following current profile page user
    if not request.user.following.filter(following_user=user).exists():
        # Follow that user
        Follower.objects.create(user=request.user, following_user=user)
        #return JsonResponse({"message": "Successfully followed user " + username}, status=201)
        return HttpResponseRedirect(reverse("user_profile", args=[str(username)]))
    else:
        # Unfollow that user
        follower_instance = Follower.objects.get(user=request.user, following_user=user)
        follower_instance.delete()
        return HttpResponseRedirect(reverse("user_profile", args=[str(username)]))

# authentication views
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        followers = list
        following = list
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
