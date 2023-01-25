from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get, Session
from requests.adapters import HTTPAdapter, Retry
import urllib
import json
import musicbrainzngs

BASE_URL = "https://api.spotify.com/v1/"
def execute_discogs_api_request(name, artists_string):
    consumer_key='ZrIlLFzGnQRBJbbirtJS'
    consumer_secret='tAhDtEAzutPcuAjrSQgUNgjiIvbQMMxb'
    searchstring1 = urllib.parse.quote_plus(name)
    searchstring2 = str(urllib.parse.quote_plus(artists_string[0]))
    searchstring3 = urllib.parse.quote_plus(' - ')
    baseURL = "https://api.discogs.com/database/search?q="
    discogs_title_suche = "&title&page=1&per_page=5&key="
    secret_str = "&secret="
    test = discogs_title_suche+consumer_key+secret_str+consumer_secret
    get = baseURL+str(searchstring1)+str(searchstring3)+str(searchstring2)+test
    discogs_bytes = urllib.request.urlopen(get).read()
    discogs = json.loads(discogs_bytes.decode('utf-8'))
    if len(discogs.get('results'))!=0:
        discogs_result = discogs.get('results')[0]
        discogs_label = discogs_result.get('label')
        discogs_genre = discogs_result.get('genre')
        discogs_style = discogs_result.get('style')
        discogs_country = discogs_result.get('country')
        discogs_title = discogs_result.get('title')
        discogs_id = discogs_result.get('id')
    else:
        discogs_label = ''
        discogs_genre = ''
        discogs_style = ''
        discogs_country = ''
        discogs_title = ''
        discogs_id = ''
    return discogs_label, discogs_genre, discogs_style, discogs_country, discogs_title, discogs_id

def execute_musicbrainz_api_request(isrc, name_list, mb_artist_id, life_span, artist_gender, artist_type):
    musicbrainzngs.set_useragent('app', '0.1', contact=None)
    string_suche = 'isrc:'+isrc
    musicbrainz = musicbrainzngs.search_recordings(string_suche, limit=1)
    check=0
    if len(musicbrainz['recording-list'])!=0:
        mb_recordinglist = musicbrainz['recording-list'][0]
    else:
        check=1
        #string_suche = 'title:"'+name+'",artist:"'+artists_string[2]+'"'
        #musicbrainz = musicbrainzngs.search_recordings(string_suche, limit=1)
        #if len(musicbrainz['recording-list'])!=0:
        #    continue
        #else:
        #    print(1)
        #    continue
    if check!=1:
        mb_artist_credit = mb_recordinglist["artist-credit"]
        for i in range(len(mb_artist_credit)):
            if "name" in mb_artist_credit[i]:
                name_list.append(mb_artist_credit[i]["name"])
                mb_artist_id.append(mb_artist_credit[i]["artist"]["id"])
                artist_by_id = musicbrainzngs.get_artist_by_id(mb_artist_credit[i]["artist"]["id"],includes='tags')
                if "life-span" in artist_by_id["artist"]:
                    life_span.append(artist_by_id["artist"]["life-span"])
                else:
                    life_span.append("")
                if "gender" in artist_by_id["artist"]:
                    artist_gender.append(artist_by_id["artist"]["gender"])
                else:
                    artist_gender.append("")
                artist_type.append(artist_by_id["artist"]["type"])
        #mb_isrc = musicbrainzngs.get_recordings_by_isrc(isrc)
        mb_track_id = mb_isrc['isrc']['recording-list'][0]['id']

    return name_list, mb_artist_id, life_span, artist_gender, artist_type, mb_track_id
    



def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token',
                                   'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True


def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)

    headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + tokens.access_token}

    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)

    s = Session()

    retries = Retry(total=5,
                backoff_factor=0.1,
                status_forcelist=[ 500, 502, 503, 504 ])

    s.mount(BASE_URL + endpoint, HTTPAdapter(max_retries=retries))

    response = s.get(BASE_URL + endpoint, headers=headers)
    
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}


def play_song(session_id):
    return execute_spotify_api_request(session_id, "player/play", put_=True)


def pause_song(session_id):
    return execute_spotify_api_request(session_id, "player/pause", put_=True)


def skip_song(session_id):
    return execute_spotify_api_request(session_id, "player/next", post_=True)

def getAudioFeatures(session_key, id):
    endpoint = "audio-features/" + id

    response = execute_spotify_api_request(session_key, endpoint)

    dataAudioFeatures = {
        'acousticness': response.get('acousticness'),
        'danceability': response.get('danceability'),
        'energy': response.get('energy'),
        'key': response.get('key'),
        'loudness': response.get('loudness'),
        'speechiness': response.get('speechiness'),
        'instrumentalness': response.get('instrumentalness'),
        'liveness': response.get('liveness'),
        'valence': response.get('valence'),
        'tempo': response.get('tempo'),
        'duration_ms': response.get('duration_ms'),
        'spotify_id': id,
    }
    
    return dataAudioFeatures
