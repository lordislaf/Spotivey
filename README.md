<div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_der_Technischen_Universit%C3%A4t_Berlin.svg" height=100>
    <img src="https://www.static.tu.berlin/fileadmin/www/_processed_/2/1/csm_logo_grau-schwarz_03df69556e.png" width=100 height=100>
</div>

# Spotivey
This is a repository of the web app Spotivey, which was developed in the context of a master's thesis in the Audio Communication and Technology department at the TU Berlin. It allows music listening data retrieval from Spotify user accounts within scientific online questionnaire studies. For academic scholars only, fully user-transparent & GDPR-compliant. No retrieval of personal data (name, email, gender, birthdate).

# Why Spotivey - Motivation
Since music listening nowadays happens increasingly via streaming services such as Spotify, Apple Music or Amazon Music, it would be technically possible to perform research on music actually listened to on basis of 'digital traces' left behind (Greenberg & Rentfrow, 2017), instead of relying on self-reporting in questionnaires, a strategy which suffers from various validity issues (Lepa et al., 2020). In principle, open APIs offered by music service providers could be used for this purpose. For example, by using the Spotify API, it is possible to obtain a wide range of music-related user account information, such as the music tracks most recently listened to, favorite songs or artists, as well as artists followed or playlists created. However, using the Spotify API is normally not possible without technical knowledge of web programming. In addition, purely music-related transaction data without further socio-demographic contextual information is only helpful for academic research to a limited extent. A final problem is that streaming accounts are often used by several people at the same time, which makes it hard to attribute usage data to a specific person.

# How does Spotivey work?
To address these challenges, the web application Spotivey was developed. It allows to easily integrate most user data retrieval functions of the Spotify API within an online survey (e.g. the open source survey creation tool LimeSurvey) in compliance with EU data protection regulations. In this way, individual music usage data can be fetched without web programming knowledge and linked directly with socio-demographic information from a questionnaire (see Figure 1). Optionally, it is possible to ask survey participants to confirm individual results of Spotify data retrieval via a separate window, for example to exclude transactional data stemming from another person using the same account. Furthermore, Spotify helps to automatically create LimeSurvey questions with reference to the collected music usage data for an optional follow-up online survey to be administered directly following data retrieval. For example, if the participants' last 20 songs listened to were fetched, their perceived emotional expression could then be asked for via rating items and a web music player. In general, results from Spotify API queries may be either displayed in the user area of Spotivey for a quick overview or downloaded together with the survey respondent ID in a CSV file for extended statistical analyses.

![Masterarbeit_Uebersicht_Web-APP2](https://user-images.githubusercontent.com/95614774/216023852-c8596050-834c-477b-ae19-ebd95b160bed.svg)
*Fig. 1: Individual music usage data can be linked directly with socio-demographic information from a questionnaire*

# How to deploy and run Spotivey on your own server
## First - create a Django Project
First you need to create a Django project. 
You can use the [tutorial](https://code.visualstudio.com/docs/python/tutorial-django) for this. 

### Change urls.py
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

### Change settings.py
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

## Load repository into project folder

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

## Developers Account on Spotify

Before we can use Spotivey and its functions, a Spotify Developer account must have been created.
To do this, go to the [Spotify for Developers](https://developer.spotify.com/dashboard/) page.

Once you have logged in, create a new app. 
Now give the app a suitable name (e.g. “Spotivey”) and a fully transparent description. We recommend the following:

```
Web app hosted at XXX, allows music listening data retrieval within scientific online questionnaire studies. 
For academic scholars only, fully user-transparent & GDPR-compliant. 
No retrieval of personal data (name, email, gender, birthdate).
```

Afterwards, each developer app has a client ID and a client secret. 
These are to be kept secret.

Finally, change the setting by adjusting the Redirect URIs. Here you name the URLs to which Spotify redirects. Once within the survey (<YOUR-SERVER>/spotify/redirect) and once within the results page (<YOUR-SERVER>/spotify/redirect2).

For local use/testing of the app without a server, the localhost (e.g. http://127.0.0.1:8000/spotify/redirect and http://127.0.0.1:8000/spotify/redirect2) is named.

<b>Note</b>: Two redirect URLs must always be used

### Create spotify/credentials.py

Once you have two REDIRECT_URI, the CLIENT_ID and the CLIENT_SECRET, now create a Credentials.py file and add it to the /spotify folder. 
Now add

```
CLIENT_ID = "YOUR CLIENT_ID"
CLIENT_SECRET = "YOUR CLIENT_SECRET"
REDIRECT_URI = "YOUR REDIRECT_URI"
REDIRECT_URI2 = "YOUR REDIRECT_URI2"
```

Finally, change in ```./spotify/views.py``` line 148

## Deployment
There are a variety of ways to deploy Spotivey to a server.
First, you should check Django's [deployment checklist](https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/).

One possibility we are suggesting here is that the Django app is integrated into Apache using Phusion Passenger (libapache2-mod-passenger). 
This also works as a standalone or NGINX variant.

For more information have a look at the following [documentation](https://www.phusionpassenger.com/docs/advanced_guides/install_and_upgrade/apache/install/)
