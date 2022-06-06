from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import Http404, HttpResponse, HttpResponseRedirect, HttpRequest
from django.core.exceptions import PermissionDenied
from django.shortcuts import render
from django.urls import reverse

from .models import User, Listing, Bid, Comment
from . import forms


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.filter(active=True)
    })


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

def listing(request, listing_id):
    try:
        listing = Listing.objects.get(id=listing_id)
    except:
        raise Http404
    if listing.active:
        base_template = "auctions/listing_active.html"
    else:
        base_template = "auctions/listing_inactive.html"
    if request.method == "POST":
        form = forms.NewBidForm(request.POST)
        context = {
            "listing": listing,
            "form": form,
            "comment_form": forms.NewCommentForm()
        }
        if form.is_valid():
            bid_value = form.cleaned_data["bid"]
            if bid_value > listing.bids.last().value:
                bid = Bid.objects.create(value=bid_value,owner=request.user)
                listing.bids.add(bid)
                return HttpResponseRedirect(reverse("index"))
            else:
                context["bid_error"] = True
                return render(request, base_template, context)
        else:
            return render(request, base_template, context)
    return render(request, base_template, {
        "listing": listing,
        "form": forms.NewBidForm(),
        "comment_form": forms.NewCommentForm()
    })

def new_listing(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            form = forms.NewListingForm(request.POST)
            if form.is_valid():
                title = form.cleaned_data["title"]
                description = form.cleaned_data["description"]
                image_url = form.cleaned_data["image_url"]
                category = form.cleaned_data["category"]
                starting_bid = form.cleaned_data["bid"]
                bid = Bid.objects.create(value=starting_bid,owner=request.user)
                listing = Listing.objects.create(title=title, description=description, image_url=image_url, category=category, owner=request.user)
                listing.bids.add(bid)
                return HttpResponseRedirect(reverse("index"))
            else:
                return render(request, "auction/new_listing.html", {
                    "form": form
                })
        return render(request, "auctions/new_listing.html", {
            "form": forms.NewListingForm()
        })
    raise PermissionDenied

def close_auction(request, listing_id):
    try:
        listing = Listing.objects.get(id=listing_id)
    except:
        raise Http404
    if request.user == listing.owner and listing.bids.count() > 0:
        if request.method == "POST":
            listing.winner = listing.bids.last().owner
            listing.active = False
            listing.save()
            return HttpResponseRedirect(reverse("listing", args=listing_id))
        return render(request, "auctions/close_auction.html", {
            "listing": listing
        })
    else:
        raise PermissionDenied

def closed_listings(request):
    return render(request, "auctions/closed_listings.html", {
        "listings": Listing.objects.filter(active=False)
    })

def comment(request, listing_id):
    try:
        listing = Listing.objects.get(id=listing_id)
    except:
        raise Http404

    if request.method == "POST":
        form = forms.NewCommentForm(request.POST)
        if form.is_valid():
            content = form.cleaned_data["content"]
            comment = Comment.objects.create(content=content, owner=request.user)
            listing.comments.add(comment)
            return HttpResponseRedirect(reverse("listing", args=listing_id))
        else:
            return listing(HttpRequest.GET, listing_id)
    return listing(HttpResponse.GET, listing_id)

def category(request, category=""):
    if category == "":
        return render(request, "auctions/categories.html", {
            "categories": Listing.objects.all().values_list('category', flat=True).distinct()
        })
    else:
        return render(request, "auctions/index.html", {
        "listings": Listing.objects.filter(active=True, category=category)
    })

    