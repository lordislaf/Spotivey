from django.urls import path
from .views import *

urlpatterns = [
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('create-settings-user', CreateSettingsUser.as_view()),
    path('login-settings-user', LoginSettingsUser.as_view()),
    path('create-settings', CreateSettings.as_view()),
    path('get-settingslist', getSettingsListView.as_view()),
    path('get-settingsfromid', getSettingsFromIDView.as_view()),
    path('get-resultlist', getResultListView.as_view()),
    path('save-to-csv-file', saveToCSVFileView.as_view()),
    path('get-settings-second-survey', GetSettingsSecondSurvey.as_view()),
    path('create-settings-second-survey', CreateSettingsSecondSurvey.as_view()),
    path('update-settings-second-survey', UpdateSettingsSecondSurvey.as_view()),
    path('update-settings-second-survey-end-url', UpdateSettingsSecondSurveyEndURL.as_view()),
    path('delete-settings', DeleteSettings.as_view()),
    path('update-settings', UpdateSettings.as_view()),
    path('delete-settings-second-survey', DeleteSettingsSecondSurvey.as_view()),
    path('save-check-data', SaveCheckData.as_view()),
    path('update-confirm-text', UpdateConfirmText.as_view()),
    path('delete-only-results', DeleteOnlyResultsWithID.as_view())
]