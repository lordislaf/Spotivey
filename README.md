[TU Berlin]([https://www.united-internet.de/fileadmin/user_upload/Brands/Downloads/Logo_IONOS_by.jpg](https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_der_Technischen_Universit%C3%A4t_Berlin.svg))

# Spotivey
This is a repository of the web app Spotivey, which was developed in the context of a master's thesis in the Audio Communication and Technology department at the TU Berlin.


# First - create a Django Project
First you need to create a Django project. 
You can use the [tutorial](https://code.visualstudio.com/docs/python/tutorial-django) for this. 

## Change urls.py
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
