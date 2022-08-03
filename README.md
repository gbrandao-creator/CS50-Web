# Harvard's CS50 Web programming with Python and Javascript

## Project 4

Hello! This is my project 4 for Harvard's CS50 W.

In this project you'll find a network web application, where users can post, like and edit posts and follow other users. 

### Files and directories:

* The directory [project4/network](https://github.com/gbrandao-creator/CS50-Web/tree/project4/project4/network) contains all files for the _network django app_:
  - The directory [static/network](https://github.com/gbrandao-creator/CS50-Web/tree/project4/project4/network/static/network) contains all javascript and css files for the app:
    - Inside [styles.css](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/static/network/styles.css), there are all the styles applied on the templates of the app.
    - Inside [paginator.js](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/static/network/paginator.js), there are two functions to, respectively, load the paginator for the main pages of the app and style the active page button.
    - Inside [like.js](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/static/network/like.js), there are functions to make API calls to check if a post is liked or not, and then like or unlike it.
    - Inside [follow.js](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/static/network/follow.js), there is a function to make a PUT API call to add or remove a follower and update it in the screen.
    - Inside [edit.js](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/static/network/edit.js), there are functions to make a PUT API call to edit a post and update it in the screen.
    - Inside [getCookie.js](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/static/network/getCookie.js), there is a function, taken from [Django documentation](https://docs.djangoproject.com/en/3.1/ref/csrf/#ajax), that returns a CSRF token cookie, to validate the protected API calls.
  - The directory [templates/network](https://github.com/gbrandao-creator/CS50-Web/tree/project2/commerce/auctions/templates/auctions) has all the templates for the app:
    - Inside [layout.html](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/templates/network/layout.html), there is the basic layout for all the templates on the app.
    - Inside [login.html](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/templates/network/login.html), there is the template for registered users to log in.
    - Inside [register.html](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/templates/network/register.html), there is the template for non-registered users to sign up.
    - Inside [index.html](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/templates/auctions/index.html), there is the template for showing the index page, which in turn shows all the network posts.
    - Inside [profile.html](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/templates/network/profile.html), there is the template for showing a user's profile page.
  - Inside [templatetags/index.py](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/templatetags/index.py), there is a custom django template tag for indexing an array inside a template[^1].
  - Inside [models.py](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/models.py), there are all models for this app: User, Follower, Post and Like.
  - Inside [forms.py](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/forms.py), there is a django form to create a new post.
  - Inside [urls.py](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/urls.py), there are all routes for this app, including the three API routes.
  - Inside [admin.py](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/admin.py), the app's models are registered to admin management.
  - Inside [views.py](https://github.com/gbrandao-creator/CS50-Web/blob/project4/project4/network/views.py), there are all the view functions, as well as the API functions to send and receive JSON responses.


*The files not mentioned are either not used or inherent to a basic django project.*

[^1]: Reference: [https://stackoverflow.com](https://stackoverflow.com/questions/4651172/reference-list-item-by-index-within-django-template/29664945#29664945)
