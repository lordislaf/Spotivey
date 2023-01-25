# Spotivey
This is a repository of the web app Spotivey, which was developed in the context of a master's thesis in the Audio Communication and Technology department at the TU Berlin.


# First - create a Django Project
First you need to create a Django project. 
You can use the [tutorial](https://code.visualstudio.com/docs/python/tutorial-django) for this. 
Then ```urlpatterns``` must be adapted and ```include``` imported into ```urls.py```:

````
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', include('frontend.urls')),
    path('spotify/', include('spotify.urls')),
]
