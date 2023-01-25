from django.shortcuts import redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID, REDIRECT_URI2
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *
from api.models import Room, Settings
import numpy as np
import random
from .models import *
import string

def get_random_string(length):
    #for state

    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))

    return result_str


class AuthURL(APIView):
    # Get autification-url from Spotify.
    # The retrieval setting is determined on the basis of scope.

    lookup_url_kwarg = 'surveyid'
    def get(self, request, fornat=None):
        surveyID = request.GET.get(self.lookup_url_kwarg)
        if surveyID is not None:
            settings = Settings.objects.filter(umfrageID=surveyID)
            if len(settings) > 0:
                settingslistdata = np.array(settings.values_list('data'))

                tempCheck = [False, False, False, False, False, False, False]

                scope1 = 'user-library-read' #saved Tracks
                scope2 = '''user-read-private
                    user-read-email''' #user's profile
                scope3_4 = 'user-top-read' #top Tracks/Artists
                scope5 = 'user-follow-read' #followed artists
                scope6 = "user-read-recently-played" #recently Tracks
                scope7 = '''playlist-read-private''' #current Playlists

                scopeArrayDefault = [scope1, scope2, scope3_4, scope3_4, scope5, scope7, scope6] 

                scopeTemp = ''
                
                for j in range(7):
                    if (settingslistdata[0][0].get('dataCheck').get(str(j))): 
                        tempCheck[j] = True
                        if not(j == 3 and tempCheck[j-1]):
                            scopeTemp = scopeTemp + scopeArrayDefault[j] + ' '

                state = get_random_string(16)

                url = Request('GET', 'https://accounts.spotify.com/authorize', params={
                    'scope': scopeTemp,
                    'response_type': 'code',
                    'redirect_uri': REDIRECT_URI,
                    'client_id': CLIENT_ID,
                    'show_dialog': False,
                    'state': state,
                }).prepare().url

                return Response({'url': url}, status=status.HTTP_200_OK)
            else:
                return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class AuthURL2(APIView):
    # Get autification-url from Spotify for audio features.

    def get(self, request, fornat=None):

        state = get_random_string(16)

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI2,
            'client_id': CLIENT_ID,
            'show_dialog': False,
            'state': state
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    # Redirect from Spotify to Spotivey Participant Page

    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    request.session['welcome'] = True

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)
        
    return redirect('frontend:')


def spotify_callback2(request, format=None):
    # Redirect from Spotify to Spotivey Researcher Page

    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI2,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)
    
    #return redirect('https://spotiveys.users.ak.tu-berlin.de/user/results')
    return redirect('https://127.0.0.1:8000/user/results')


class IsAuthenticated(APIView):
    # check autentification status

    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class GetAudioFeaturesSpotify(APIView):
    # get audiofeatures

    lookup_url_kwarg_ID = 'surveyID'
    lookup_url_kwarg_dataString = 'dataString'
    def get(self, request, format=None):
        surveyID = request.GET.get(self.lookup_url_kwarg_ID)
        if surveyID is not None:
            if not self.request.session.exists(self.request.session.session_key):
                return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

            settings = Settings.objects.filter(umfrageID=surveyID)

            dataString = request.GET.get(self.lookup_url_kwarg_dataString)

            id_list = []
            participant_list = []
            participant_id_list = []
            if dataString == 'savedTracksData':
                searchSpotifyList = SavedTracksSpotify.objects.filter(settings__in=settings).values_list(dataString, 'participant')
            elif dataString == 'topTracksData':
                searchSpotifyList = TopTracksSpotify.objects.filter(settings__in=settings).values_list(dataString, 'participant')
            elif dataString == 'recentlyTracksData':
                searchSpotifyList = RecentlyTracksSpotify.objects.filter(settings__in=settings).values_list(dataString, 'participant')
            else:
                return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

            if len(searchSpotifyList) > 0:
                for trackListResult in list(searchSpotifyList):
                    participant_list.append(Participant.objects.get(id=trackListResult[1]))
                    participant_id_list.append(Participant.objects.filter(id=trackListResult[1]).values_list('participant')[0][0])
                    id_list.append(trackListResult[0].get('spotify_id'))

            maxResponse = 100
            von = 0
            bis = 99
            responseList = []
            acousticness_array = []
            danceability_array = []
            energy_array = []
            key_array = []
            loudness_array = []
            speechiness_array = []
            instrumentalness_array = []
            liveness_array = []
            valence_array = []
            tempo_array = []
            duration_ms_array = []

            while von<len(id_list):
                id_list_search_string = ",".join(id_list[von:bis+1])

                endpoint = "audio-features?ids=" + id_list_search_string

                response = execute_spotify_api_request(self.request.session.session_key, endpoint)

                responseList.append(response)
                
                for i, data in enumerate(response.get('audio_features')):
                    acousticness_array.append(data.get('acousticness'))
                    danceability_array.append(data.get('danceability'))
                    energy_array.append(data.get('energy'))
                    key_array.append(data.get('key'))
                    loudness_array.append(data.get('loudness'))
                    speechiness_array.append(data.get('speechiness'))
                    instrumentalness_array.append(data.get('instrumentalness'))
                    liveness_array.append(data.get('liveness'))
                    valence_array.append(data.get('valence'))
                    tempo_array.append(data.get('tempo'))
                    duration_ms_array.append(data.get('duration_ms'))
                    
                    dataAudioFeatures = {
                        'acousticness': data.get('acousticness'),
                        'danceability': data.get('danceability'),
                        'energy': data.get('energy'),
                        'key': data.get('key'),
                        'loudness': data.get('loudness'),
                        'speechiness': data.get('speechiness'),
                        'instrumentalness': data.get('instrumentalness'),
                        'liveness': data.get('liveness'),
                        'valence': data.get('valence'),
                        'tempo': data.get('tempo'),
                        'duration_ms': data.get('duration_ms'),
                        'spotify_id': id_list[von+i],
                        'participant': participant_id_list[von+i]
                    }

                    filterAF = SpotifyAudioFeatures.objects.filter(participant=participant_list[von+i], surveyID=surveyID,
                        dataString=dataString, dataAudioFeatures__spotify_id=id_list[von+i])

                    if not filterAF.exists():
                        af = SpotifyAudioFeatures(surveyID=surveyID, dataString=dataString, dataAudioFeatures=dataAudioFeatures,
                            participant=participant_list[von+i])
                        af.save()

                von = von + maxResponse
                bis = bis + maxResponse

            hist_acousticness_y, hist_x = np.histogram(np.array(acousticness_array), bins=20, range=(0,1))
            hist_danceability_y, x = np.histogram(np.array(danceability_array), bins=20, range=(0,1))
            hist_energy_y, x = np.histogram(np.array(energy_array), bins=20, range=(0,1))
            hist_key_y, x = np.histogram(np.array(key_array), bins=20, range=(0,1))
            hist_loudness_y, loudness_x = np.histogram(np.array(loudness_array), bins=20, range=(-60,0))
            hist_speechiness_y, x = np.histogram(np.array(speechiness_array), bins=20, range=(0,1))
            hist_instrumentalness_y, x = np.histogram(np.array(instrumentalness_array), bins=20, range=(0,1))
            hist_liveness_y, x = np.histogram(np.array(liveness_array), bins=20, range=(0,1))
            hist_valence_y, x = np.histogram(np.array(valence_array), bins=20, range=(0,1))
            hist_tempo_y, x = np.histogram(np.array(tempo_array), bins=20, range=(0,1))
            hist_duration_ms_y, x = np.histogram(np.array(duration_ms_array), bins=20, range=(0,1))

            finalList = []
            for d in responseList:
                for i in d.get('audio_features'):
                    finalList.append(i)
            
            return Response({
                        'data': finalList,
                        'hist_x': np.round(hist_x,3),
                        'hist_acousticness': hist_acousticness_y,
                        'hist_danceability': hist_danceability_y,
                        'hist_energy': hist_energy_y,
                        'hist_key': hist_key_y,
                        'hist_loudness': hist_loudness_y,
                        'hist_speechiness': hist_speechiness_y,
                        'hist_instrumentalness': hist_instrumentalness_y,
                        'hist_liveness': hist_liveness_y,
                        'hist_valence': hist_valence_y,
                        'hist_tempo': hist_tempo_y,
                        'hist_duration_ms': hist_duration_ms_y, 
                        'loudness_x': np.round(loudness_x,3),
                        'id_list': id_list
                    }, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class TopArtists(APIView):
    # get top artists

    lookup_url_kwarg_limit = 'limit'
    lookup_url_kwarg_timeRange = 'timeRange'
    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host

        limit = request.GET.get(self.lookup_url_kwarg_limit)

        timeRange = request.GET.get(self.lookup_url_kwarg_timeRange)
        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')
        confirm = False if request.data.get('confirm') else True

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant

        endpoint = "me/top/artists?time_range=" + timeRange + "&limit=" + limit

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('items')

        anzahl_artists = 50

        if int(limit)<anzahl_artists:
            anzahl_artists=int(limit)

        random_10 = random.sample(range(int(limit)), anzahl_artists) 
        artists_infos = []

        item = np.array(item)
        item_top = list(item[random_10])

        for j in range(anzahl_artists):
            item_top_j = item_top[j]

            type = item_top_j.get('type')
            popularity = item_top_j.get('popularity')
            followers = item_top_j.get('followers')
            artist_cover = item_top_j.get('images')[0].get('url')
            name = item_top_j.get('name')
            artists_id = item_top_j.get('id')

            genre_string = ""

            for i, genres in enumerate(item_top_j.get('genres')):
                if i > 0:
                    genre_string += ", "
                name_genre = genres
                genre_string += name_genre

            artistsInfoData = {
                'artist': name.replace("\"", "\'"),
                'type': type,
                'popularity': popularity,
                'followers': followers,
                'image_url': artist_cover,
                'genre_string': genre_string,
                'id': artists_id
            }

            topArtistsSpotify = TopArtistsSpotify(code=roomCode, surveyID=surveyID, topArtistsData=artistsInfoData, 
                confirm=confirm,participant=participant, settings=settings )
            topArtistsSpotify.save()

            artists_infos.append(artistsInfoData)

        return Response(artists_infos, status=status.HTTP_200_OK)


class TopTracks(APIView):
    # get top tracks
    lookup_url_kwarg_limit = 'limit'
    lookup_url_kwarg_timeRange = 'timeRange'

    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        roommodel = Room.objects.filter(code=room_code)
        if roommodel.exists():
            roommodel = roommodel[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        limit = request.GET.get(self.lookup_url_kwarg_limit)

        timeRange = request.GET.get(self.lookup_url_kwarg_timeRange)

        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')
        confirm = False if request.data.get('confirm') else True

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant

        host = roommodel.host
        endpoint = "me/top/tracks?time_range=" + timeRange + "&limit=" + limit
        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('items')

        anzahl_tracks = 50

        if int(limit)<anzahl_tracks:
            anzahl_tracks=int(limit)

        random_10 = random.sample(range(int(limit)), anzahl_tracks) 
        track_infos = []
        item = np.array(item)
        item_top = list(item[random_10])
        for j in range(anzahl_tracks):
            
            item_top_j = item_top[j]
            item_topj_album = item_top_j.get('album')
            album_type = item_topj_album.get('album_type')
            endpoint = f"albums/{item_topj_album.get('id')}"
            response2 = execute_spotify_api_request(host, endpoint)
            if 'error' in response2:
                return Response(response2, status=status.HTTP_204_NO_CONTENT)

            albumLabel = response2.get('label')
            releaseDate = response2.get('release_date')
            albumName = response2.get('name')
            duration_ms = item_top_j.get('duration_ms')
            explicit = item_top_j.get('explicit')
            isrc = item_top_j.get('external_ids').get('isrc')
            tracks_cover = item_topj_album.get('images')[0].get('url')
            name = item_top_j.get('name')
            track_uri = item_top_j.get('uri')
            track_id = item_top_j.get('id')

            dataAudioFeatures = getAudioFeatures(host, track_id)

            popularity = item_top_j.get('popularity')

            artists_string = []
            id_string = []
            artists_string_mit_komma = []

            for i, artist in enumerate(item_top_j.get('artists')):
                name_artist = artist.get('name')
                artists_string.append(name_artist)
                if i > 0:
                    artists_string_mit_komma += ", "
                name_artist=artist.get('name')
                artists_string_mit_komma += name_artist
                id_string.append(artist.get('id'))
            
            spotify_artist_genre = []
            for k in range(len(id_string)):
                artist_endpoint = "artists/"+id_string[k]
                resonse_artist = execute_spotify_api_request(host, artist_endpoint)
                if "genres" in resonse_artist:
                    spotify_artist_genre.append(resonse_artist["genres"])
                else:
                    spotify_artist_genre.append('')

            tracksInfoData = {
                    'track_name': name.replace("\"", "\'"),
                    'album_type': album_type,
                    'duration_ms': duration_ms,
                    'image_url': tracks_cover,
                    'explicit':explicit,
                    'isrc':isrc,
                    'spotify_id': track_id,
                    'popularity': popularity,
                    'spotify_artist_string':artists_string_mit_komma,
                    'spotify_artist_string_ohne_komma':artists_string,
                    'spotify_artist_id':id_string,
                    'track_uri':track_uri,
                    'albumLabel': albumLabel,
                    'albumName': albumName.replace("\"", "\'"),
                    'releaseDate': releaseDate,
                    'spotify_artist_genre':spotify_artist_genre,
                    'dataAudioFeatures': dataAudioFeatures
                }

            topTracksSpotify = TopTracksSpotify(code=roomCode, surveyID=surveyID, topTracksData=tracksInfoData, 
                confirm=confirm,participant=participant, settings=settings )
            topTracksSpotify.save()
            
            track_infos.append(tracksInfoData)

        return Response(track_infos, status=status.HTTP_200_OK)


class GetSavedTracksSpotify(APIView):
    # get saved tracks

    lookup_url_kwarg_limit = 'limit'
    lookup_url_kwarg_market = 'market'

    def post(self, request):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        limit = request.GET.get(self.lookup_url_kwarg_limit)
        market = request.GET.get(self.lookup_url_kwarg_market)

        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')

        confirm = False if request.data.get('confirm') else True

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant

        room_code = self.request.session.get('room_code')
        roommodel = Room.objects.filter(code=room_code)
        
        if roommodel.exists():
            roommodel = roommodel[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        host = roommodel.host
        if market != '':
            endpoint = "me/tracks?market=" + market + "&limit=" + limit
        else:
            endpoint = "me/tracks?limit=" + limit

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'items' not in response:
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('items')

        anzahl_tracks = 50
        if int(limit)<anzahl_tracks:
            anzahl_tracks = int(limit)

        random_10 = random.sample(range(int(limit)), anzahl_tracks) 
        track_infos = []
        item = np.array(item)
        item_top = list(item[random_10])
        for j in range(anzahl_tracks):
            item_top_j = item_top[j]
            duration_ms = item_top_j.get('track').get('duration_ms')
            added_at = item_top_j.get('added_at')
            explicit = item_top_j.get('explicit')
            isrc = item_top_j.get('track').get('external_ids').get('isrc')
            name = item_top_j.get('track').get('name')
            track_uri = item_top_j.get('track').get('uri')
            track_id = item_top_j.get('track').get('id')

            dataAudioFeatures = getAudioFeatures(host, track_id)
            popularity = item_top_j.get('track').get('popularity')
            item_topj_album = item_top_j.get('track').get('album')
            endpoint = f"albums/{item_topj_album.get('id')}"
            response2 = execute_spotify_api_request(host, endpoint)

            if 'error' in response2:
                return Response(response2, status=status.HTTP_204_NO_CONTENT)

            albumLabel = response2.get('label')
            albumName = response2.get('name')
            releaseDate = response2.get('release_date')

            tracks_cover = item_topj_album.get('images')[0].get('url')
            album_type = item_topj_album.get('album_type')

            artists_string = []
            id_string = []
            artists_string_mit_komma = []

            for i, artist in enumerate(item_top_j.get('track').get('artists')):
                name_artist = artist.get('name')
                artists_string.append(name_artist)
                if i > 0:
                    artists_string_mit_komma += ", "
                name_artist=artist.get('name')
                artists_string_mit_komma += name_artist
                id_string.append(artist.get('id'))
            
            spotify_artist_genre = []
            for k in range(len(id_string)):
                artist_endpoint = "artists/"+id_string[k]
                resonse_artist = execute_spotify_api_request(host, artist_endpoint)
                if "genres" in resonse_artist:
                    spotify_artist_genre.append(resonse_artist["genres"])
                else:
                    spotify_artist_genre.append('')

            tracksInfoData = {
                    'albumLabel': albumLabel,
                    'albumName': albumName.replace("\"", "\'"),
                    'releaseDate': releaseDate,
                    'track_name': name.replace("\"", "\'"),
                    'album_type': album_type,
                    'duration_ms': duration_ms,
                    'image_url': tracks_cover,
                    'added_at': added_at,
                    'explicit':explicit,
                    'isrc':isrc,
                    'spotify_id': track_id,
                    'popularity': popularity,
                    'spotify_artist_string':artists_string_mit_komma,
                    'spotify_artist_string_ohne_komma':artists_string,
                    'spotify_artist_id':id_string,
                    'track_uri':track_uri,
                    'spotify_artist_genre':spotify_artist_genre,
                    'dataAudioFeatures': dataAudioFeatures
                }

            savedTracksSpotify = SavedTracksSpotify(code=roomCode, surveyID=surveyID, savedTracksData=tracksInfoData, 
                confirm=confirm,participant=participant, settings=settings )
            savedTracksSpotify.save()

            track_infos.append(tracksInfoData)
            
        return Response(track_infos, status=status.HTTP_200_OK)


class GetUsersProfileSpotify(APIView):
    # get users profile

    def post(self, request):
        room_code = self.request.session.get('room_code')
        roommodel = Room.objects.filter(code=room_code)
        
        if roommodel.exists():
            roommodel = roommodel[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')

        host = roommodel.host
        endpoint = "me"

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        country = response.get('country')
        followers = response.get('followers').get('total')
        product = response.get('product')

        users_info = {
            'country': country,
            'followers': followers,
            'product': product,
        }

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant

        usersProfileSpotify = UsersProfileSpotify(code=roomCode, surveyID=surveyID, usersProfileData=users_info, 
            confirm=False,participant=participant, settings=settings )
        usersProfileSpotify.save()

        return Response(users_info, status=status.HTTP_200_OK)


class GetFollowedArtistsSpotify(APIView):
    # get followed artists

    lookup_url_kwarg_limit = 'limit'
    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host

        limit = request.GET.get(self.lookup_url_kwarg_limit)

        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')
        confirm = False if request.data.get('confirm') else True

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant

        endpoint = "me/following?type=artist&limit=" + limit

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'artists' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('artists').get('items')

        anzahl_artists = 50

        if int(limit)<anzahl_artists:
            anzahl_artists=int(limit)

        random_10 = random.sample(range(int(limit)), anzahl_artists) 
        artists_infos = []

        item = np.array(item)
        item_top = list(item[random_10])

        for j in range(anzahl_artists):
            item_top_j = item_top[j]

            type = item_top_j.get('type')
            popularity = item_top_j.get('popularity')
            followers = item_top_j.get('followers')
            artist_cover = item_top_j.get('images')[0].get('url')
            name = item_top_j.get('name')
            artists_id = item_top_j.get('id')

            genre_string = ""

            for i, genres in enumerate(item_top_j.get('genres')):
                if i > 0:
                    genre_string += ", "
                name_genre = genres
                genre_string += name_genre

            artistsInfoData = {
                'artist': name.replace("\"", "\'"),
                'type': type,
                'popularity': popularity,
                'followers': followers,
                'image_url': artist_cover,
                'genre_string': genre_string,
                'id': artists_id
            }

            followedArtistsSpotify = FollowedArtistsSpotify(code=roomCode, surveyID=surveyID, followedArtistsData=artistsInfoData, 
                confirm=confirm,participant=participant, settings=settings )
            followedArtistsSpotify.save()

            artists_infos.append(artistsInfoData)

        return Response(artists_infos, status=status.HTTP_200_OK)


class GetPlaylistsSpotify(APIView):
    # get playlists

    lookup_url_kwarg_limit = 'limit'
    lookup_url_kwarg_public = 'public'
    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host

        limit = request.GET.get(self.lookup_url_kwarg_limit)
        publicCheck = request.GET.get(self.lookup_url_kwarg_public)

        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')
        confirm = False if request.data.get('confirm') else True

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant


        endpoint = "me/playlists??offset=0&limit=" + limit

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('items')

        anzahl_playlists = 50

        if int(limit)<anzahl_playlists or len(item) < anzahl_playlists:
            anzahl_playlists=int(limit)
            if len(item) < anzahl_playlists:
                anzahl_playlists=len(item)

        random_10 = random.sample(range(int(anzahl_playlists)), anzahl_playlists) 
        playlists_infos = []

        item = np.array(item)
        item_top = list(item[random_10])

        for j in range(anzahl_playlists):
            item_top_j = item_top[j]

            collaborative = item_top_j.get('collaborative')
            name = item_top_j.get('name')
            owner = item_top_j.get('owner').get('id')
            playlists_cover_item = item_top_j.get('images')
            if len(playlists_cover_item) > 0:
                playlists_cover = playlists_cover_item[0].get('url')
            else:
                playlists_cover = ''
            public = item_top_j.get('public')
            tracks_total = item_top_j.get('tracks').get('total')
            playlist_id = item_top_j.get('id')

            if eval(str(publicCheck).title()) != eval(str(public).title()) or eval(str(publicCheck).title()):
                endpoint = f"playlists/{playlist_id}/tracks?limit=50"

                response2 = execute_spotify_api_request(host, endpoint)

                playlistsTracksRow = []

                if not 'Error' in response2 or 'items' in response:
                    playlistsTracks = response2.get('items')
                    playlistsTracksRow = []

                    for zaehlerPlaylist in range(len(playlistsTracks)):
                        trackItem = playlistsTracks[zaehlerPlaylist].get('track')
                        artists_string_mit_komma= ''
                        for i, artist in enumerate(trackItem.get('artists')):
                            name_artist = artist.get('name')
                            if i > 0:
                                artists_string_mit_komma += ", "
                            name_artist=artist.get('name')
                            artists_string_mit_komma += name_artist

                        if len(trackItem.get('album').get('images'))>0:
                            coverTracks = trackItem.get('album').get('images')[0]
                        else:
                            coverTracks = ''

                        playlistsTracksRow.append({
                            'id': trackItem.get('id'),
                            'name': trackItem.get('name').replace("\"", "\'"),
                            'artistName': artists_string_mit_komma,
                            'type': trackItem.get('type'),
                            'cover': coverTracks,
                            'release_date': trackItem.get('album').get('release_date'),
                            'duration_ms': trackItem.get('duration_ms'),
                            'isrc': trackItem.get('external_ids').get('isrc'),
                            'albumName': trackItem.get('album').get('name').replace("\"", "\'"),
                        })

                playlistsInfoData = {
                    'collaborative': collaborative,
                    'name': name.replace("\"", "\'"),
                    'owner': owner,
                    'playlists_cover': playlists_cover,
                    'public': public,
                    'tracks_total': tracks_total,
                    'id': playlist_id,
                    'playlistsTracksRow': playlistsTracksRow,
                    'tracksCheck': []
                }

                currentPlaylistsSpotify = CurrentPlaylistsSpotify(code=roomCode, surveyID=surveyID, currentPlaylistsData=playlistsInfoData, 
                    confirm=confirm,participant=participant, settings=settings )
                currentPlaylistsSpotify.save()

                playlists_infos.append(playlistsInfoData)

        return Response(playlists_infos, status=status.HTTP_200_OK)


class GetRecentlyPlayedTracksSpotify(APIView):
    # get recently played tracks

    lookup_url_kwarg_limit = 'limit'
    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host

        limit = request.GET.get(self.lookup_url_kwarg_limit)

        participant_id = request.data.get('participant')
        surveyID = request.data.get('surveyID')
        roomCode = request.data.get('roomCode')
        confirm = False if request.data.get('confirm') else True

        settingsFilter = Settings.objects.filter(umfrageID=surveyID)
        if settingsFilter.exists():
            settings = settingsFilter[0]
            settings.save()

        participantFilter = Participant.objects.filter(participant=participant_id)
        if participantFilter.exists():
            participant = participantFilter[0]
            participant.save()
            self.request.session['participant'] = participant.participant

        endpoint = "me/player/recently-played?limit=" + limit

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('items')

        anzahl_tracks = 50
        if int(limit)<anzahl_tracks:
            anzahl_tracks = int(limit)

        random_10 = random.sample(range(int(limit)), anzahl_tracks) 
        track_infos = []
        item = np.array(item)
        item_top = list(item[random_10])
        for j in range(anzahl_tracks):
            item_top_j = item_top[j]
            duration_ms = item_top_j.get('track').get('duration_ms')
            added_at = item_top_j.get('added_at')
            explicit = item_top_j.get('track').get('explicit')
            isrc = item_top_j.get('track').get('external_ids').get('isrc')
            name = item_top_j.get('track').get('name')
            track_uri = item_top_j.get('track').get('uri')
            track_id = item_top_j.get('track').get('id')

            played_at = item_top_j.get('played_at')

            dataAudioFeatures = getAudioFeatures(host, track_id)
            popularity = item_top_j.get('track').get('popularity')
            item_topj_album = item_top_j.get('track').get('album')
            endpoint = f"albums/{item_topj_album.get('id')}"
            response2 = execute_spotify_api_request(host, endpoint)

            if 'error' in response2:
                return Response({}, status=status.HTTP_204_NO_CONTENT)

            albumLabel = response2.get('label')
            albumName = response2.get('name')
            releaseDate = response2.get('release_date')
            tracks_cover = item_topj_album.get('images')[0].get('url')
            album_type = item_topj_album.get('album_type')

            artists_string = []
            id_string = []
            artists_string_mit_komma = []

            for i, artist in enumerate(item_top_j.get('track').get('artists')):
                name_artist = artist.get('name')
                artists_string.append(name_artist)
                if i > 0:
                    artists_string_mit_komma += ", "
                name_artist=artist.get('name')
                artists_string_mit_komma += name_artist
                id_string.append(artist.get('id'))
            
            spotify_artist_genre = []
            for k in range(len(id_string)):
                artist_endpoint = "artists/"+id_string[k]
                resonse_artist = execute_spotify_api_request(host, artist_endpoint)
                if "genres" in resonse_artist:
                    spotify_artist_genre.append(resonse_artist["genres"])
                else:
                    spotify_artist_genre.append('')

            tracksInfoData = {
                'track_name': name.replace("\"", "\'"),
                'album_type': album_type,
                'duration_ms': duration_ms,
                'image_url': tracks_cover,
                'added_at': added_at,
                'explicit':explicit,
                'isrc':isrc,
                'spotify_id': track_id,
                'popularity': popularity,
                'spotify_artist_string':artists_string_mit_komma,
                'spotify_artist_string_ohne_komma':artists_string,
                'spotify_artist_id':id_string,
                'spotify_artist_genre':spotify_artist_genre,
                'track_uri':track_uri,
                'albumLabel': albumLabel,
                'albumName': albumName.replace("\"", "\'"),
                'releaseDate': releaseDate,
                'dataAudioFeatures': dataAudioFeatures
            }

            recentlyTracksSpotify = RecentlyTracksSpotify(code=roomCode, surveyID=surveyID, recentlyTracksData=tracksInfoData, 
                confirm=confirm,participant=participant, settings=settings )
            recentlyTracksSpotify.save()

            track_infos.append(tracksInfoData)
            
        return Response(track_infos, status=status.HTTP_200_OK)
        