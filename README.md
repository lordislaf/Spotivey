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

