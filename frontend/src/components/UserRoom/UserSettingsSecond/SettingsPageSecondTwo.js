import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import headerSettings from '../Header/headerSettings';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IconButton, Button, Tooltip } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Select from 'react-select';
import IosShareIcon from '@mui/icons-material/IosShare';
import { goBackToLogin } from '../NewSettingsFirst/Button/BackButtonFunction';
import getXMLOutputSingleQuestion from './getXMLOutput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SettingsPageSecondTwo (props) {
    const navigate = useNavigate()
    const location = useLocation()
    const surveyID = location.state.surveyID

    const username = location.state.username

    const [exportFileCheck, setExportFileCheck] = useState(false)

    const [limitItemsSavedTracks, setLimitItemsSavedTracks] = useState(0)
    const [limitItemsTopTracks, setLimitItemsTopTracks] = useState(0)
    const [limitItemsTopArtists, setLimitItemsTopArtists] = useState(0)
    const [limitItemsFollowedArtists, setLimitItemsFollowedArtists] = useState(0)
    const [limitItemsCurrentPlaylists, setLimitItemsCurrentPlaylists] = useState(0)
    const [limitItemsRecentlyTracks, setLimitItemsRecentlyTracks] = useState(0)

    const [selectedOptionSavedTracks, setSelectedOptionSavedTracks] = useState({value: 0, label: 0})
    const [selectedOptionTopTracks, setSelectedOptionTopTracks] = useState({value: 0, label: 0})
    const [selectedOptionRecentlyTracks, setSelectedOptionRecentlyTracks] = useState({value: 0, label: 0})
    const [selectedOptionTopArtists, setSelectedOptionTopArtists] = useState({value: 0, label: 0})
    const [selectedOptionFollowedArtists, setSelectedOptionFollowedArtists] = useState({value: 0, label: 0})
    const [selectedOptionCurrentPlaylists, setSelectedOptionCurrentPlaylists] = useState({value: 0, label: 0})

    const idName = ['SavdTracks', 'TopTracks', 'LastTracks', 'TopArtists', 'FolArtists', 'Playlist']

    const idTracks = ['SpotID', 'Title', 'Artist', 'Label', 'RelDat', 'Cover', 'Player','PlayAt', 'ConTyp', 'ConURI']
    const idArtists = ['SpotID', 'AName', 'Cover', 'Genres']
    const idPlaylists = ['SpotID', 'PName', 'Cover']

    const questionGroupTextArray = [
        ['Saved Tracks', 'Top Tracks','Last Tracks'], 
        ['Top Artists', 'Followed Artists'], 
        ['Current Playlists']
    ] 

    const [checkSavedTracks, setCheckSavedTracks] = useState(false)

    const [checkTopTracks, setCheckTopTracks] = useState(false)
    
    const [checkTopArtists, setCheckTopArtists] = useState(false)

    const [checkFollowedArtists, setCheckFollowedArtists] = useState(false)

    const [checkCurrentPlaylists, setCheckCurrentPlaylists] = useState(false)

    const [checkRecentlyTracks, setCheckRecentlyTracks] = useState(false)

    const dataFieldsTracksArray = ['Spotify ID', 'Track Title', 'Artist', 'Label', 'Release Date','Cover', 
    'Player (including a track name, artist name and cover)', 'Played At', 'Context Type', 'Context URI']

    const dataFieldsArtistsArray = ['Spotify ID', 'Artist Name', 'Cover', 'Genre']

    const dataFieldsPlaylistsArray = ['Spotify ID', 'Playlist Name', 'Cover']

    const questionTypeArray = ['several single questions', 'single matrix questions']
    const [questionTypeCheck, setQuestionTypeCheck] = useState([
        [[true, false], [true, false], [true, false]], 
        [[true, false], [true, false]], 
        [[true, false]]
    ])

    const [dataFieldsCheckArray, setDataFieldsCheckArray] = useState([[
        [false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false, false]
    ], [
        [false, false, false, false], 
        [false, false, false, false]
    ], [
        [false, false, false]
    ]]) 

    useEffect(() => {
        async function userInRoom() {
          fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
              if (data.username === null){
                goBackToLogin(navigate)
              }
            });
        }
        userInRoom();
      }, [])

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px dotted pink',
          padding: 10,
        }),
        menu: (menu) => {
          return({
            ...menu,
            marginTop: '0px',
            marginBottom: '20px'
          })},
        control: (control) => ({
          ...control,
          width: '70%',
        }),
        menuList: (provided) => ({
            ...provided,
            paddingTop: 0,
            height: '80%'
        }),
      }

    function getOptions(limit){
        const options = []
        for (let i = 0; i<limit+1; i++){
            options.push({value: i, label: i})
        }
        return options
    }

    useEffect(() => {
        if (surveyID){
            return fetch("/api/get-settingsfromid" + "?surveyid=" + surveyID)
            .then(response => response.json())
            .then((data) => {
                if (!data.error){
                    setCheckSavedTracks(data.data[0].text1.check)
                    setLimitItemsSavedTracks(data.data[0].text1.limit)
                    setCheckTopTracks(data.data[0].text3.check)
                    setLimitItemsTopTracks(data.data[0].text3.limit)
                    setCheckTopArtists(data.data[0].text4.check)
                    setLimitItemsTopArtists(data.data[0].text4.limit)
                    setCheckFollowedArtists(data.data[0].text5.check)
                    setLimitItemsFollowedArtists(data.data[0].text5.limit)
                    setCheckCurrentPlaylists(data.data[0].text6.check)
                    setLimitItemsCurrentPlaylists(data.data[0].text6.limit)
                    setCheckRecentlyTracks(data.data[0].text7.check)
                    setLimitItemsRecentlyTracks(data.data[0].text7.limit)
                }
            });
        } else {
            navigate('/user/settings2')
        }
    }, [surveyID])

    function downloadFunction(output, idName) {
        const blob = new Blob([output]);
        const fileDownloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileDownloadUrl;
        link.setAttribute(
            'download',
            `${idName}.lsg`,
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setExportFileCheck(true)
    }

    function download (checkArray, idName, questionTypeCheck, selectedOptionValue, IDDataField, j, i) {
        let output = '';
        if(questionTypeCheck[j][i][0]){
            getXMLOutputSingleQuestion(
                checkArray, idName, IDDataField, selectedOptionValue, 'single', questionGroupTextArray[j][i]
            ).forEach(row => {
                output += `${row.data}\n`
            });
            downloadFunction(output, idName);
        } else {
            getXMLOutputSingleQuestion(
                checkArray, idName, IDDataField, selectedOptionValue, 'matrix', questionGroupTextArray[j][i]
            ).forEach(row => {
                output += `${row.data}\n`
            });
            downloadFunction(output, idName);
        }
      }

    function helpTextSecondSurvey(){
        return(
            <p class='settings-overview-text'>
                Do you want to reference the results of your query in a second survey? <br></br>
                For each of the existing retrieval types 
                    (=LastTracks, Playlists, FavoriteTracks, FavoriteArtists, FavoriteTracks, etc.) 
                you should be able to set:
                <ul class='settings-overview-list'>
                    <li class='settings-overview-list-item'>
                        Whether and how many (randomly selected) list entries (=k) of them are referenced in 
                        the 2nd questionnaire (maximum the limit you entered)
                    </li>
                    <li class='settings-overview-list-item'>
                        Which of the i1-i10 data fields (ID, track name, artist, label, cover, etc.) 
                        should be displayed in each case
                    </li>
                    <li class='settings-overview-list-item'>
                        Whether a player for playback should be displayed additionally
                    </li>
                    <li class='settings-overview-list-item'>
                        Whether these references should be created:
                        <ol class='settings-overview-list'>
                            <li class='settings-overview-list-item'>
                                in several single questions 
                            </li>
                            <li class='settings-overview-list-item'>
                                in a single matrix question
                            </li>
                        </ol>
                    </li>
                </ul>
            </p>
        )
    }

    function dataFieldsCheck(i, index2, index, setStateArray){
        let items = [...dataFieldsCheckArray];
        items[index2][i][index] = !items[index2][i][index];
        setStateArray(items)
    }

    function buttonExportDataFields (checkArray, idName, questionTypeCheck, selectedOptionValue, IDDataField, j, i) {
        return(
            <React.Fragment>
                {!checkArray[j][i].includes(true) ?
                <Tooltip title={'check some data fields'}>
                <span>
                    <div className="button-data-fields-displayed">
                        <Button 
                            variant="contained" 
                            endIcon={<IosShareIcon />} 
                            color='inherit'
                            disabled
                        >
                            Export Limesurvey Question Group File
                        </Button>
                    </div>
                </span>
                </Tooltip> : 
                <div className="button-data-fields-displayed">
                    <Button 
                        variant="contained" 
                        endIcon={<IosShareIcon />} 
                        color='inherit'
                        onClick={()=>{download(checkArray[j][i], idName, questionTypeCheck, selectedOptionValue, IDDataField, j, i)}}
                    >
                        Export Limesurvey Question Group File
                    </Button>
                </div>
                }
          </React.Fragment>
        )
    }

    function typeQuestionCheckFunction(j, i, setStateArray){
        let items = [...questionTypeCheck];
        items[j][i] = [!items[j][i][0], !items[j][i][1]]
        setStateArray(items)
    }

    function dataFieldsDisplayed (type, idName, selectedOptionValue, IDDataField, i, index2) {
        let dataFieldsArray = null
        if (type === 'Tracks') {
            dataFieldsArray = dataFieldsTracksArray
        } else if (type === 'Artists') {
            dataFieldsArray = dataFieldsArtistsArray
        } else {
            dataFieldsArray = dataFieldsPlaylistsArray
        }
        return (
            <React.Fragment>
                <div className="data-fields-displayed-container-outer">
                    <div className="data-fields-displayed-container-inner">
                        <h2 className="data-fields-displayed-title">
                            Data Fields:
                        </h2>
                        <div className="data-fields-displayed-container">
                        {dataFieldsArray.map((dataField, index) => {
                            return(
                                <React.Fragment>
                                    {index2 == 0 && i == 2 && <div className={"confirm-container-checkbox"} id={'dataField-'+index}>
                                        <label 
                                            className={"second-survey-container-title"} 
                                            id={idName + 'dataField-' + index}
                                        >
                                            <input id={"checkbox-css"}
                                                type="checkbox"
                                                checked={dataFieldsCheckArray[index2][i][index]}
                                                onChange={(e) => {dataFieldsCheck(i, index2, index, setDataFieldsCheckArray)}}
                                            />
                                            <span id={"span-css-second-survey"}></span>
                                            {dataField}
                                        </label>
                                    </div>}
                                </React.Fragment>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <div className="data-fields-displayed-container-outer">
                    <div className="data-fields-displayed-container-inner">
                        <h2 className="data-fields-displayed-title">
                            Question Type:
                        </h2>
                        <div className="data-fields-displayed-container">
                        {questionTypeArray.map((questionType, index) => {
                            return(
                                <React.Fragment>
                                    <div className={"confirm-container-checkbox"}>
                                        <label className={"second-survey-container-title"}>
                                            <input id={"checkbox-css"}
                                                type="checkbox"
                                                checked={questionTypeCheck[index2][i][index]}
                                                onChange={(e) => {
                                                    typeQuestionCheckFunction(index2, i, setQuestionTypeCheck)
                                                }}
                                            />
                                            <span id={"span-css-second-survey"}></span>
                                            {questionType}
                                        </label>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        </div>
                    </div>
                </div>
                {buttonExportDataFields(dataFieldsCheckArray, idName, questionTypeCheck, selectedOptionValue, IDDataField, index2, i)}
            </React.Fragment>
        )
    }

    function TracksSettingsSecondSurvey(limit, title, selectedOption, setSelectedOption, type, idName, IDDataField, index, index2) {
        function handleChangeDropdown(value) {
            setSelectedOption(value)
        }

        return(
            <React.Fragment>
                <h1 className="settings-subtitle-text">
                    {title}
                </h1>
                <h3 className="settings-overview-text">
                    Do you want and if so, how many (randomly selected) list entries (=k) from the
                    "{title}" do you want to reference in a 2nd questionnaire (maximum {limit})?
                </h3>
                <Select
                    defaultValue={selectedOption}
                    onChange={handleChangeDropdown}
                    options={getOptions(limit)}
                    styles={customStyles}
                    theme={(theme) => {
                    return({
                        ...theme,
                        zIndex: 1000,
                        colors: {
                            ...theme.colors,
                            primary25: '#f9e6e8',
                            primary: '#C40D1E',
                        },
                    })}}
                />
                {
                    selectedOption.value > 0 ? 
                    dataFieldsDisplayed(type, idName, selectedOption.value, IDDataField, index, index2) : null
                }
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <div class="setting-header">
              <header class="setting-header-inner">
                <div class="setting-header-content-container">
                  <div class="setting-header-content-container-inner">
                    {headerSettings()}
                  </div>
                </div>
              </header>
            </div>
            <div class='setting-page-main'>
                <div class="setting-navigation">
                    <div class="navbar-setting">
                        <nav class="navbar-settings-content">
                            {location.state.secondSurveyID ? <List
                                sx={{ width: '100%', maxWidth: 360}}
                            > 
                                <ListItem>
                                    <IconButton href="/user/settings2/new">
                                        <ArrowBackIosNewOutlinedIcon />
                                    </IconButton>
                                </ListItem>
                            </List> : null }
                        </nav>
                    </div>
                </div>
                <div class="setting-content-main">
                    <div class='setting-content-wrapper'>
                        <div class="setting-content-wrapper-inner">
                            <div class="setting-content-outer">
                                <div class='card-content-inner-container'>
                                    <div class='card-content-second' style={{paddingBottom: '70px'}}>
                                        <h1 data-heading='true' class='settings-title'>
                                            Generate Question Files 
                                        </h1>
                                        {helpTextSecondSurvey()}
                                        {checkSavedTracks ? 
                                            TracksSettingsSecondSurvey(limitItemsSavedTracks, 'User\'s Saved Tracks', 
                                            selectedOptionSavedTracks, setSelectedOptionSavedTracks, 'Tracks', idName[0], 
                                            idTracks, 0, 0) : 
                                            null
                                        }
                                        {checkRecentlyTracks ? 
                                            TracksSettingsSecondSurvey(limitItemsRecentlyTracks, 'Last Played Tracks', 
                                            selectedOptionRecentlyTracks, setSelectedOptionRecentlyTracks, 'Tracks', idName[2], 
                                            idTracks, 2, 0) : 
                                            null
                                        }
                                        {checkTopTracks ? 
                                            TracksSettingsSecondSurvey(limitItemsTopTracks, 'User\'s Top Items (Tracks)', 
                                            selectedOptionTopTracks, setSelectedOptionTopTracks, 'Tracks', idName[1], 
                                            idTracks, 1, 0) : 
                                            null
                                        }
                                        {checkTopArtists ? 
                                            TracksSettingsSecondSurvey(limitItemsTopArtists, 'User\'s Top Items (Artists)', 
                                            selectedOptionTopArtists, setSelectedOptionTopArtists, 'Artists', idName[3],
                                            idArtists, 0, 1) : 
                                            null
                                        }
                                        {checkFollowedArtists ? 
                                            TracksSettingsSecondSurvey(limitItemsFollowedArtists, 'Followed Artists', 
                                            selectedOptionFollowedArtists, setSelectedOptionFollowedArtists, 'Artists', idName[4],
                                            idArtists, 1, 1) : 
                                            null
                                        }
                                        {checkCurrentPlaylists ? 
                                            TracksSettingsSecondSurvey(limitItemsCurrentPlaylists, 'User\'s Current Playlists', 
                                            selectedOptionCurrentPlaylists, setSelectedOptionCurrentPlaylists, 'Playlists', 
                                            idName[5], idPlaylists, 0, 2) : 
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="settings-second-next-button">
                <Button 
                    variant="contained" 
                    endIcon={<SaveOutlinedIcon />}
                    onClick={()=>{
                        const requestOptions = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                surveyID: surveyID,
                                username: username,
                                data: {
                                    selectedOption: [selectedOptionSavedTracks.value, selectedOptionTopTracks.value,  
                                        selectedOptionRecentlyTracks.value, selectedOptionTopArtists.value, 
                                        selectedOptionFollowedArtists.value, selectedOptionCurrentPlaylists.value],
                                    idTracks: idTracks,
                                    dataFieldsTracksCheck: dataFieldsCheckArray[0],
                                    idArtists: idArtists,
                                    dataFieldsArtistsCheck: dataFieldsCheckArray[1],
                                    idPlaylists: idPlaylists,
                                    dataFieldsPlaylistsCheck: dataFieldsCheckArray[2],
                                    questionTypeCheck: questionTypeCheck,
                                    dataFieldsCheckArray: dataFieldsCheckArray
                                }
                            }),
                          };
                          fetch("/api/update-settings-second-survey", requestOptions)
                            .then((response) => {
                              if (!response.ok) {
                            } else {
                              return response.json();
                            }
                          })
                          .then((data) => {
                            navigate('/user/settings2')
                          })
                    }}
                >
                    OK
                </Button>
            </div>
        </React.Fragment>
    )
}