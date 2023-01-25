from turtle import mode
from django.db import models
from api.models import Room, Settings

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class ErgebnisTracks10(models.Model):
    code = models.CharField(max_length=50, default=[])
    track_info = models.JSONField(default=dict)

class ErgebnisTracks_checked(models.Model):
    code = models.CharField(max_length=50, default=[])
    track_info = models.JSONField(default=dict)

class Participant(models.Model):
    participant = models.CharField(max_length=50, default='')

class SavedTracksSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    savedTracksData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class TopTracksSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    topTracksData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class TopArtistsSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    topArtistsData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class UsersProfileSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    usersProfileData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class FollowedArtistsSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    followedArtistsData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class CurrentPlaylistsSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    currentPlaylistsData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class RecentlyTracksSpotify(models.Model):
    code = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    surveyID = models.CharField(max_length=50, default='')
    recentlyTracksData = models.JSONField(default=dict)
    confirm = models.BooleanField(default=False)    #ist überhaupt bestätigt?
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)

class SpotifyConfirm(models.Model):
    surveyID = models.CharField(max_length=50, default='')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)
    dataConfirm = models.JSONField(default=dict)
    fieldEntries = models.CharField(max_length=50, default=50)

class SpotifyAudioFeatures(models.Model):
    surveyID = models.CharField(max_length=50, default='')
    dataString = models.CharField(max_length=50, default='')
    dataAudioFeatures = models.JSONField(default=dict)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null= True, blank=True)

