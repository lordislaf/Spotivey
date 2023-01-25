from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('get-auth-url2', AuthURL2.as_view()),
    path('redirect', spotify_callback),
    path('redirect2', spotify_callback2),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('top-artists', TopArtists.as_view()),
    path('top-tracks', TopTracks.as_view()),
    path('saved-tracks', GetSavedTracksSpotify.as_view()),
    path('users-profile', GetUsersProfileSpotify.as_view()),
    path('followed-artists', GetFollowedArtistsSpotify.as_view()),
    path('current-playlists', GetPlaylistsSpotify.as_view()),
    path('recently-played-tracks', GetRecentlyPlayedTracksSpotify.as_view()),
    path('audio-features-spotify', GetAudioFeaturesSpotify.as_view()),
]