from django.db import models
import string
import random
from django.contrib.auth.models import User


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    surveyID = models.CharField(max_length=20, default='')
    participant = models.CharField(max_length=20, default='')


class UserCode(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    user = models.ManyToManyField(User, default='')


class Settings(models.Model):
    defaultConfirmTextEng = """Please confirm the results.
If some results are unfamiliar or uncomfortable to you, please feel free to contradict the results."""
    defaultConfirmTextDe = """Bitte bestätigen Sie die Ergebnisse.
Wenn einige Ergebnisse für Sie ungewohnt oder unangenehm sind, können Sie den Ergebnissen gerne widersprechen."""

    user = models.ManyToManyField(User, default='')
    nameUmfrage = models.TextField(default='')
    umfrageID = models.TextField(max_length=50, default='')
    umfrageURL = models.TextField(default='')
    data = models.JSONField(null=True)
    confirmTextSTEng = models.TextField(default=defaultConfirmTextEng)
    confirmTextTTEng = models.TextField(default=defaultConfirmTextEng)
    confirmTextRTEng = models.TextField(default=defaultConfirmTextEng)
    confirmTextTAEng = models.TextField(default=defaultConfirmTextEng)
    confirmTextFAEng = models.TextField(default=defaultConfirmTextEng)
    confirmTextCPEng = models.TextField(default=defaultConfirmTextEng)
    confirmTextSTDe = models.TextField(default=defaultConfirmTextDe)
    confirmTextTTDe = models.TextField(default=defaultConfirmTextDe)
    confirmTextRTDe = models.TextField(default=defaultConfirmTextDe)
    confirmTextTADe = models.TextField(default=defaultConfirmTextDe)
    confirmTextFADe = models.TextField(default=defaultConfirmTextDe)
    confirmTextCPDe = models.TextField(default=defaultConfirmTextDe)


class SettingsSecondSurvey(models.Model):
    user = models.ManyToManyField(User, default='')
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, null= True, blank=True)
    secondSurveyID = models.TextField(max_length=50, default='', blank=True)
    secondSurveyServer = models.TextField(max_length=50, default='', blank=True)
    secondSurveyLanguage = models.TextField(max_length=50, default='', blank=True)
    secondSurveyOther = models.JSONField(null=True, blank=True)
    secondSurveyData = models.JSONField(null=True, blank=True)
    secondSurveyEndURL = models.URLField(max_length=200, default='', blank=True)