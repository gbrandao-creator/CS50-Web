# Harvard's CS50 Web programming with Python and Javascript

## Project 3

Hello! This is my project 3 for Harvard's CS50 W.

In this project you'll find a single-page mailing web application, where users can compose, read, archive and unarchive emails. The web app makes API calls to an API that was already written, and the source can be found [here](https://cs50.harvard.edu/web/2020/projects/3/mail/#getting-started). So, in this project, only the front-end was developed, as all the server-side was already done.

### Files and directories[^1]:

* The directory [project3/mail](https://github.com/gbrandao-creator/CS50-Web/tree/project3/project3/mail) contains all files for the _mail django app_:
  - Inside [static/mail/styles.css](https://github.com/gbrandao-creator/CS50-Web/blob/project3/project3/mail/static/mail/styles.css), there are all the styles for the app.
  - Inside [static/mail/inbox.js](https://github.com/gbrandao-creator/CS50-Web/blob/project3/project3/mail/static/mail/inbox.js), there are all the javascript for the app. It has several functions to make the API calls, switch from page to page.
  - The directory [templates/mail](https://github.com/gbrandao-creator/CS50-Web/tree/project3/project3/mail/templates/mail) has all the templates for the app:
    - Inside [layout.html](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/templates/auctions/layout.html), there is the basic layout for all the templates on the app.
    - Inside [login.html](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/templates/auctions/login.html), there is the template for registered users to log in.
    - Inside [register.html](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/templates/auctions/register.html), there is the template for non-registered users to sign up.
    - Inside [inbox.html](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/templates/auctions/index.html), there is the template for showing the inbox page, which in turn has 3 views: *emails-view* (which shows a specific mailbox), *compose-view* (which shows the form for composing a new email) and *single-email-view* (which shows a single email from a mailbox).
  - Inside [models.py]()[^*], there are all models for this app: User and Email.
  - Inside [urls.py](https://github.com/gbrandao-creator/CS50-Web/blob/project2/commerce/auctions/urls.py), there are the routes for the app, as well as the API routes.
  - Inside [views.py](https://github.com/gbrandao-creator/CS50-Web/blob/project1/wiki/encyclopedia/views.py), there are all the view functions, as well as the API functions to send and receive JSON responses.

[^1]: The files not mentioned are either not used or inherent to a basic django project.

[^*]: Already available in the source code (not written by [gbrandao-creator](https://github.com/gbrandao-creator)).

