from django.urls import path
from .views import index
from django.views.generic.base import RedirectView

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('room', index),
    path('user', index),
    path('user/start', index),
    path('user/settings', index),
    path('user/settings2', index),
    path('user/settings/new', index),
    path('user/settings2/new', index),
    path('user/settings2/new2', index),
    path('user/settings/confirm-text-design', index),
    path('user/tutorial', index),
    path('user/results', index),
    path('login', index),
    path('sign-up', index),
    path('user/results-audio-features', index),
    path('end-room/<str:lang>', index),
    path('privacy', index),
    path('version', index),
]