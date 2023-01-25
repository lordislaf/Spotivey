import regex
from .models import *
from spotify.models import *

regexString = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

def check_email(usernameString):
    #Check if string is an email address

    if regex.search(regexString, usernameString):
        check = 0
    else:
        check = 1

    return check


def getResultDict(surveyID):
    # Result list as dict

    settings = Settings.objects.filter(umfrageID=surveyID)

    savedTracksSpotify = SavedTracksSpotify.objects.filter(settings__in=settings, confirm=True).values_list('surveyID', 'participant', 'savedTracksData')
    participantSavedTracks = Participant.objects.filter(id__in=savedTracksSpotify.values_list('participant'))

    rowsSavedTracks = []
    participantArray = []
    if len(savedTracksSpotify) > 0:
        participantCount = 0
        for zaehlerConfirm in range(len(savedTracksSpotify)):
            participantCount += 1
            participantString = list(Participant.objects.filter(id=savedTracksSpotify[zaehlerConfirm][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)
        
            rowsSavedTracks.append({
                'id': len(rowsSavedTracks)+1, 
                'no': participantCount,
                'participant': participantString, 
                'isrc': savedTracksSpotify[zaehlerConfirm][2].get('isrc'), 
                'trackName': savedTracksSpotify[zaehlerConfirm][2].get('track_name'),
                'spotifyID': savedTracksSpotify[zaehlerConfirm][2].get('spotify_id'),
                'spotify_artist_string': savedTracksSpotify[zaehlerConfirm][2].get('spotify_artist_string'),
                'cover': savedTracksSpotify[zaehlerConfirm][2].get('image_url'),
                'albumLabel': savedTracksSpotify[zaehlerConfirm][2].get('albumLabel'),
                'albumName': savedTracksSpotify[zaehlerConfirm][2].get('albumName'),
                'releaseDate': savedTracksSpotify[zaehlerConfirm][2].get('releaseDate'),
                'album_type': savedTracksSpotify[zaehlerConfirm][2].get('album_type'),
                'duration_ms': savedTracksSpotify[zaehlerConfirm][2].get('duration_ms'),
                'added_at': savedTracksSpotify[zaehlerConfirm][2].get('added_at'),
                'explicit': savedTracksSpotify[zaehlerConfirm][2].get('explicit'),
                'popularity': savedTracksSpotify[zaehlerConfirm][2].get('popularity'),
                'spotify_artist_string_ohne_komma': savedTracksSpotify[zaehlerConfirm][2].get('spotify_artist_string_ohne_komma'),
                'spotify_artist_id': savedTracksSpotify[zaehlerConfirm][2].get('spotify_artist_id'),
                'track_uri': savedTracksSpotify[zaehlerConfirm][2].get('track_uri'),
                'spotify_artist_genre': savedTracksSpotify[zaehlerConfirm][2].get('spotify_artist_genre'),
                'acousticness': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('acousticness'),
                'danceability': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('danceability'),
                'energy': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('energy'),
                'key': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('key'),
                'loudness': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('loudness'),
                'speechiness': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('speechness'),
                'instrumentalness': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('instrumentalness'),
                'liveness': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('liveness'),
                'valence': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('valence'),
                'tempo': savedTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('tempo'),
            })
        
    topTracksSpotify = TopTracksSpotify.objects.filter(settings__in=settings, confirm=True).values_list('surveyID', 'participant', 'topTracksData')
    participantTopTracks = Participant.objects.filter(id__in=topTracksSpotify.values_list('participant'))

    rowsTopTracks = []
    if len(topTracksSpotify) > 0:
        participantCount = 0
        for zaehlerConfirm in range(len(topTracksSpotify)):
            participantCount += 1
            participantString = list(Participant.objects.filter(id=topTracksSpotify[zaehlerConfirm][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)
        
            rowsTopTracks.append({
                'id': len(rowsTopTracks)+1, 
                'no': participantCount,
                'participant': participantString, 
                'isrc': topTracksSpotify[zaehlerConfirm][2].get('isrc'), 
                'trackName': topTracksSpotify[zaehlerConfirm][2].get('track_name'),
                'spotifyID': topTracksSpotify[zaehlerConfirm][2].get('spotify_id'),
                'spotify_artist_string': topTracksSpotify[zaehlerConfirm][2].get('spotify_artist_string'),
                'cover': topTracksSpotify[zaehlerConfirm][2].get('image_url'),
                'albumLabel': topTracksSpotify[zaehlerConfirm][2].get('albumLabel'),
                'albumName': topTracksSpotify[zaehlerConfirm][2].get('albumName'),
                'releaseDate': topTracksSpotify[zaehlerConfirm][2].get('releaseDate'),
                'album_type': topTracksSpotify[zaehlerConfirm][2].get('album_type'),
                'duration_ms': topTracksSpotify[zaehlerConfirm][2].get('duration_ms'),
                'added_at': topTracksSpotify[zaehlerConfirm][2].get('added_at'),
                'explicit': topTracksSpotify[zaehlerConfirm][2].get('explicit'),
                'popularity': topTracksSpotify[zaehlerConfirm][2].get('popularity'),
                'spotify_artist_string_ohne_komma': topTracksSpotify[zaehlerConfirm][2].get('spotify_artist_string_ohne_komma'),
                'spotify_artist_id': topTracksSpotify[zaehlerConfirm][2].get('spotify_artist_id'),
                'track_uri': topTracksSpotify[zaehlerConfirm][2].get('track_uri'),
                'spotify_artist_genre': topTracksSpotify[zaehlerConfirm][2].get('spotify_artist_genre'),
                'acousticness': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('acousticness'),
                'danceability': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('danceability'),
                'energy': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('energy'),
                'key': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('key'),
                'loudness': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('loudness'),
                'speechiness': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('speechness'),
                'instrumentalness': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('instrumentalness'),
                'liveness': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('liveness'),
                'valence': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('valence'),
                'tempo': topTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('tempo'),
            })

    recentlyTracksSpotify = RecentlyTracksSpotify.objects.filter(settings__in=settings, confirm=True).values_list('surveyID', 'participant', 'recentlyTracksData')
    participantRecentlyTracks = Participant.objects.filter(id__in=recentlyTracksSpotify.values_list('participant'))

    rowsRecentlyTracks = []
    if len(recentlyTracksSpotify) > 0:
        participantCount = 0
        for zaehlerConfirm in range(len(recentlyTracksSpotify)):
            participantCount += 1
            participantString = list(Participant.objects.filter(id=recentlyTracksSpotify[zaehlerConfirm][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)

            rowsRecentlyTracks.append({
                'id': len(rowsRecentlyTracks)+1, 
                'no': participantCount,
                'participant': participantString, 
                'isrc': recentlyTracksSpotify[zaehlerConfirm][2].get('isrc'), 
                'trackName': recentlyTracksSpotify[zaehlerConfirm][2].get('track_name'),
                'spotifyID': recentlyTracksSpotify[zaehlerConfirm][2].get('spotify_id'),
                'spotify_artist_string': recentlyTracksSpotify[zaehlerConfirm][2].get('spotify_artist_string'),
                'cover': recentlyTracksSpotify[zaehlerConfirm][2].get('image_url'),
                'albumLabel': recentlyTracksSpotify[zaehlerConfirm][2].get('albumLabel'),
                'albumName': recentlyTracksSpotify[zaehlerConfirm][2].get('albumName'),
                'releaseDate': recentlyTracksSpotify[zaehlerConfirm][2].get('releaseDate'),
                'album_type': recentlyTracksSpotify[zaehlerConfirm][2].get('album_type'),
                'duration_ms': recentlyTracksSpotify[zaehlerConfirm][2].get('duration_ms'),
                'added_at': recentlyTracksSpotify[zaehlerConfirm][2].get('added_at'),
                'explicit': recentlyTracksSpotify[zaehlerConfirm][2].get('explicit'),
                'popularity': recentlyTracksSpotify[zaehlerConfirm][2].get('popularity'),
                'spotify_artist_string_ohne_komma': recentlyTracksSpotify[zaehlerConfirm][2].get('spotify_artist_string_ohne_komma'),
                'spotify_artist_id': recentlyTracksSpotify[zaehlerConfirm][2].get('spotify_artist_id'),
                'track_uri': recentlyTracksSpotify[zaehlerConfirm][2].get('track_uri'),
                'spotify_artist_genre': recentlyTracksSpotify[zaehlerConfirm][2].get('spotify_artist_genre'),
                'acousticness': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('acousticness'),
                'danceability': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('danceability'),
                'energy': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('energy'),
                'key': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('key'),
                'loudness': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('loudness'),
                'speechiness': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('speechness'),
                'instrumentalness': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('instrumentalness'),
                'liveness': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('liveness'),
                'valence': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('valence'),
                'tempo': recentlyTracksSpotify[zaehlerConfirm][2].get('dataAudioFeatures').get('tempo'),
            })

    topArtistsSpotify = TopArtistsSpotify.objects.filter(settings__in=settings, confirm=True).values_list('surveyID', 'participant', 'topArtistsData')
    participantTopArtists = Participant.objects.filter(id__in=topArtistsSpotify.values_list('participant'))

    rowsTopArtists = []
    if len(topArtistsSpotify) > 0:
        participantCount = 0
        for zaehlerConfirm in range(len(topArtistsSpotify)):
            participantCount += 1
            participantString = list(Participant.objects.filter(id=topArtistsSpotify[zaehlerConfirm][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)
            
            rowsTopArtists.append({
                'id': len(rowsTopArtists)+1, 
                'no': participantCount,
                'participant': participantString, 
                'type': topArtistsSpotify[zaehlerConfirm][2].get('type'), 
                'popularity': topArtistsSpotify[zaehlerConfirm][2].get('popularity'),
                'followers': topArtistsSpotify[zaehlerConfirm][2].get('followers').get('total'),
                'genre_string': topArtistsSpotify[zaehlerConfirm][2].get('genre_string'),
                'cover': topArtistsSpotify[zaehlerConfirm][2].get('image_url'),
                'artistName': topArtistsSpotify[zaehlerConfirm][2].get('artist'),
                'spotifyID': topArtistsSpotify[zaehlerConfirm][2].get('id')
            })

    followedArtistsSpotify = FollowedArtistsSpotify.objects.filter(settings__in=settings, confirm=True).values_list('surveyID', 'participant', 'followedArtistsData')
    participantFollowedArtists = Participant.objects.filter(id__in=followedArtistsSpotify.values_list('participant'))

    rowsFollowedArtists = []
    if len(followedArtistsSpotify) > 0:
        participantCount = 0
        for zaehlerConfirm in range(len(followedArtistsSpotify)):
            participantCount += 1
            participantString = list(Participant.objects.filter(id=followedArtistsSpotify[zaehlerConfirm][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)
            
            rowsFollowedArtists.append({
                'id': len(rowsFollowedArtists)+1, 
                'no': participantCount,
                'participant': participantString, 
                'type': followedArtistsSpotify[zaehlerConfirm][2].get('type'), 
                'popularity': followedArtistsSpotify[zaehlerConfirm][2].get('popularity'),
                'followers': followedArtistsSpotify[zaehlerConfirm][2].get('followers').get('total'),
                'genre_string': followedArtistsSpotify[zaehlerConfirm][2].get('genre_string'),
                'cover': followedArtistsSpotify[zaehlerConfirm][2].get('image_url'),
                'artistName': followedArtistsSpotify[zaehlerConfirm][2].get('artist'),
                'spotifyID': followedArtistsSpotify[zaehlerConfirm][2].get('id')
            })
        
    currentPlaylistsSpotify = CurrentPlaylistsSpotify.objects.filter(settings__in=settings, confirm=True).values_list('surveyID', 'participant', 'currentPlaylistsData')
    participantCurrentPlaylists = Participant.objects.filter(id__in=currentPlaylistsSpotify.values_list('participant'))

    rowsCurrentPlaylists = []
    if len(currentPlaylistsSpotify) > 0:
        participantCount = 0
        for zaehlerConfirm in range(len(currentPlaylistsSpotify)):
            participantCount += 1
            participantString = list(Participant.objects.filter(id=currentPlaylistsSpotify[zaehlerConfirm][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)
            
            rowsCurrentPlaylists.append({
                'id': len(rowsCurrentPlaylists)+1, 
                'no': participantCount,
                'participant': participantString, 
                'collaborative': currentPlaylistsSpotify[zaehlerConfirm][2].get('collaborative'), 
                'playlistName': currentPlaylistsSpotify[zaehlerConfirm][2].get('name'),
                'owner': currentPlaylistsSpotify[zaehlerConfirm][2].get('owner'),
                'public': currentPlaylistsSpotify[zaehlerConfirm][2].get('public'),
                'spotifyID': currentPlaylistsSpotify[zaehlerConfirm][2].get('id'),
                'tracks_total': currentPlaylistsSpotify[zaehlerConfirm][2].get('tracks_total'),
                'cover': currentPlaylistsSpotify[zaehlerConfirm][2].get('playlists_cover'),
                'playlistsTracksRow': currentPlaylistsSpotify[zaehlerConfirm][2].get('playlistsTracksRow'),
            })

    usersProfileSpotify = UsersProfileSpotify.objects.filter(settings__in=settings).values_list('surveyID', 'participant')
    participantUsersProfile = Participant.objects.filter(id__in=usersProfileSpotify.values_list('participant'))

    rowsUsersProfile = []
    if len(usersProfileSpotify) > 0:
        participantCount = 0
        for participantZaehler in range(len(usersProfileSpotify)):
            participantCount += 1
            participantID = list(UsersProfileSpotify.objects.filter(
                settings__in=settings).values_list('participant'))[participantZaehler]
            participantString = list(Participant.objects.filter(id=usersProfileSpotify[participantZaehler][1]).values_list('participant')[0])
            if participantString not in participantArray:
                participantCount = 1
                participantArray.append(participantString)
            for profileListResult in list(UsersProfileSpotify.objects.filter(participant__id__in=participantID).values_list('usersProfileData')):
                for profileList in profileListResult:
                    rowsUsersProfile.append({
                        'id': len(rowsUsersProfile)+1, 
                        'no': participantCount,
                        'participant': int(participantString[0]), 
                        'country': profileList.get('country'),
                        'followers': profileList.get('followers'),
                        'product': profileList.get('product'),
                    })

    rowGesamt = [[rowsSavedTracks, 'Saved Tracks', {'participantCount': participantSavedTracks.count(), 
                    'resultCount': len(rowsSavedTracks)}, 'Tracks'], 
                [rowsTopTracks, 'Top Tracks', {'participantCount': participantTopTracks.count(), 
                    'resultCount': len(rowsTopTracks)}, 'Tracks'], 
                [rowsTopArtists, 'Top Artists', {'participantCount': participantTopArtists.count(), 
                    'resultCount': len(rowsTopArtists)}, 'Artists'], 
                [rowsFollowedArtists, 'Followed Artists', {'participantCount': participantFollowedArtists.count(), 
                    'resultCount': len(rowsFollowedArtists)}, 'Artists'],
                [rowsRecentlyTracks, 'Last Tracks', {'participantCount': participantRecentlyTracks.count(),
                    'resultCount': len(rowsRecentlyTracks)}, 'Tracks'], 
                [rowsCurrentPlaylists, 'Current Playlists', {'participantCount': participantCurrentPlaylists.count(),
                    'resultCount': len(rowsCurrentPlaylists)}, 'Playlists'], 
                [rowsUsersProfile, 'User\'s Profile', {'participantCount': participantUsersProfile.count(),
                    'resultCount': len(rowsUsersProfile)}, 'Profile']]
            
    return {
            'rowGesamt':rowGesamt,
            'savedTracksData': {
                'data': rowsSavedTracks, 
                'participantCount': participantSavedTracks.count(), 
                'resultCount': len(rowsSavedTracks)
            },
            'topTracksData': {
                'data': rowsTopTracks, 
                'participantCount': participantTopTracks.count(), 
                'resultCount': len(rowsTopTracks)
            },
            'topArtistsData': {
                'data': rowsTopArtists, 
                'participantCount': participantTopArtists.count(), 
                'resultCount': len(rowsTopArtists)
            }, 
            'usersProfileData': {
                
            },
            'followedArtistsData': {
                'data': rowsFollowedArtists, 
                'participantCount': participantFollowedArtists.count(), 
                'resultCount': len(rowsFollowedArtists)
            },
            'recentlyTracksData': {
                'data': rowsRecentlyTracks,
                'participantCount': participantRecentlyTracks.count(),
                'resultCount': len(rowsRecentlyTracks)
            },
            'currentPlaylistsData': {
                'data': rowsCurrentPlaylists,
                'participantCount': participantCurrentPlaylists.count(),
                'resultCount': len(rowsCurrentPlaylists)
            },
            'participantArray': participantArray
        }