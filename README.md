# Harvard's CS50 Web programming with Python and Javascript

## Project 2

Hello! This is my project 2 for Harvard's CS50 W.

In this project you'll find an auctions website, where users can list a new auction, set bids, comment on listings, add them to watchlist, among others. 

### Files and directories:

* The directory [auctions](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions) contains all files for the _auctions django app_:
  - Inside [static/auctions/styles.css](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/static/auctions/styles.css), there are all the styles for the app.
  - The directory [templates/auctions](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions) has all the templates for the app:
    - Inside [layout.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/layout.html), there is the basic layout for all the templates on the app.
    - Inside [login.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/login.html), there is the template for registered users to log in.
    - Inside [register.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/register.html), there is the template for non-registered users to sign up.
    - Inside [index.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/index.html), there is the template for showing the index page, which shows the active listings.
    - Inside [closed-listings.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/closed-listings.html), there is the template for showing the listings that have been already closed by the owner.
    - Inside [categories.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/categories.html), there is the template for showing all listings' categories.
    - Inside [watchlist.html](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/templates/auctions/watchlist.html), there is the template for showing a (logged in) user's watchlist.
    - Inside [listing-active.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/listing-active.html), there is the template for showing a particular active listing.
    - Inside [listing-inactive.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/listing-inactive.html), there is the template for showing a particular inactive (closed) listing.
    - Inside [new-listing.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/templates/auctions/new-listing.html), there is the template with a form for (a logged in user) create a new listing.
  - Inside [models.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/models.py), there are all models for this app: User, Bid, Comment, Listing and Watchlist.
  - Inside [forms.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/forms.py), there are three django forms, one for creating a *new listing*, one for creating a *new bid* on a particular listing, and one for creating a new *comment* on a particular listing.
  - Inside [urls.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/urls.py), there are all routes for this app.
  - Inside [admin.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/admin.py), the app's models are registered to admin management.
  - Inside [views.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/commerce/auctions/views.py), there are all the view functions for the server-side handling.

*The files not mentioned are either not used or inherent to a basic django project.*
