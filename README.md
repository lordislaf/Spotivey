<div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_der_Technischen_Universit%C3%A4t_Berlin.svg" height=100>
    <img src="https://www.static.tu.berlin/fileadmin/www/_processed_/2/1/csm_logo_grau-schwarz_03df69556e.png" width=100 height=100>
</div>

# Spotivey
This is a repository of the web app Spotivey, which was developed in the context of a master's thesis in the Audio Communication and Technology department at the TU Berlin.


# First - create a Django Project
First you need to create a Django project. 
You can use the [tutorial](https://code.visualstudio.com/docs/python/tutorial-django) for this. 

## Change urls.py
Then ```urlpatterns``` must be adapted and ```include``` imported into ```urls.py```:

```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', include('frontend.urls')),
    path('spotify/', include('spotify.urls')),
]
```

## Change settings.py
You now have to add the following lines to the ```INSTALLED_APPS``` in ```settings.py```.

```
'api.apps.ApiConfig',
'spotify.apps.SpotifyConfig',
'frontend.apps.FrontendConfig',
'rest_framework',
'<name-of-your-project>'
```

Change ```<name-of-your-project>``` to your project name

You can also change other settings that are recommended, see the [documentation](https://docs.djangoproject.com/en/4.1/ref/settings/).

# Load repository into project folder

In the next step, load the repository into your project folder and install the necessary packages.

1. cd to the directory where requirements.txt is located
2. activate your virtualenv
3. run: ```pip install -r requirements.txt``` in your shell.

Once you have installed all the necessary packages, you can test whether the code runs locally. To do this, go through the following steps.

1. cd to the directory where manage.py is located
2. run: ```python ./manage.py makemigrations```
3. run: ```python ./manage.py migrate```
4. run: ```python ./manage.py runserver```

You should now see the Spotivey user interface at ```http://127.0.0.1:8000/login```.

Spotivey does not work yet. 
There are still a few steps missing.

# Developers Account on Spotify

Before we can use Spotivey and its functions, a Spotify Developer account must have been created.
To do this, go to the [Spotify for Developers](https://developer.spotify.com/dashboard/) page.

Once you have logged in, create a new app. 
Now give the app a suitable name (e.g. Spotivey) and a description in which you highlight data protection.
The description should also be transparent for Spotify.

Afterwards, each developer app has a client ID and a client secret. 
These are to be kept secret.

Finally, change the setting by adjusting the Redirect URIs. Here you name the URLs to which Spotify redirects. Once within the survey (<YOUR-SERVER>/spotify/redirect) and once within the results page (<YOUR-SERVER>/spotify/redirect2).

For local use/testing of the app without a server, the localhost (e.g. http://127.0.0.1:8000/spotify/redirect and http://127.0.0.1:8000/spotify/redirect2) is named.

\_Note\_: Two redirect URLs must always be used

## Create spotify/credentials.py

Once you have two REDIRECT_URI, the CLIENT_ID and the CLIENT_SECRET, now create a Credentials.py file and add it to the /spotify folder. 
Now add

```
CLIENT_ID = "YOUR CLIENT_ID"
CLIENT_SECRET = "YOUR CLIENT_SECRET"
REDIRECT_URI = "YOUR REDIRECT_URI"
REDIRECT_URI2 = "YOUR REDIRECT_URI2"
```

Finally, change in ```./spotify/views.py``` line 148
