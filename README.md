# Harvard's CS50 Web programming with Python and Javascript

## Project 1 

Hello! This is my project 1 for Harvard's CS50 W.

In this project you'll find an encyclopedia, where users can search, add and edit pages using markdown language.

### Files and directories: 

* The directory [encyclopedia](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia) contains all files for the _encyclopedia django app_:
  - Inside [static/encyclopedia/styles.css](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/static/encyclopedia/styles.css), there are all the styles for the app.
  - The directory [templates/encyclopedia](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia) has all the templates for the app:
    - Inside [layout.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia/layout.html), there is the basic layout for all the templates on the app.
    - Inside [index.html](https://github.comme50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia/index.html), there is the template that shows all the entries on the app.
    - Inside [edit-page.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia/edit-page.html), there is the template with a form for editing entries on the app.
    - Inside [new-page.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia/new-page.html), there is the template with a form for creating a new markdown entry page.
    - Inside [search-results.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia/search-results.html), there is the template for showing the search matches (the search form is in the layout).
    - Inside [wiki-entry.html](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/templates/encyclopedia/wiki-entry.html), there is the dynamic template for showing one specific entry.
  - Inside [forms.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/forms.py), there are two django forms, one for *creating* a new page and one for *editing* an existing page.
  - Inside [urls.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/urls.py), there are all routes for this app.
  - Inside [util.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/util.py), there are a number of functions that manage the markdown files (read, edit, create, delete).
  - Inside [views.py](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/encyclopedia/views.py), there are all the view functions for the server-side management. There is only one view function per route.
* The directory [entries](https://github.com/me50/gbrandao-creator/tree/web50/projects/2020/x/wiki/entries) has the markdown entry files.

*The files not mentioned are either not used or inherent to a basic django project.*


