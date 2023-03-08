import React from "react";
import { useState, useEffect } from 'react';
import { Typography, StepButton } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import resultListTrack from "./resultList.js"; 
import resultListArtist from "./resultListArtists.js";
import resultListPlaylist from "./resultListPlaylists.js";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import getGetParams from "./getGetParams";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WelcomePage from "./WelcomePage.js";


export default function Room (props) {

  const [showItemsSavedTracks, setShowItemsSavedTracks] = useState(50)
  const [showItemsTopTracks, setShowItemsTopTracks] = useState(50)
  const [showItemsTopArtists, setShowItemsTopArtists] = useState(50)
  const [showItemsFollowedArtists, setShowItemsFollowedArtists] = useState(50)
  const [showItemsCurrentPlaylists, setShowItemsCurrentPlaylists] = useState(50)
  const [showItemsRecentlyTracks, setShowItemsRecentlyTracks] = useState(50)

  const [checkArray, setCheckArray] = useState([])
  const [checkArrayLength, setCheckArrayLength] = useState(0)
 
  const [dataFieldsCheck, setDataFieldsCheck] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [passLang, setPassLang] = useState(null)

  const [questionTypeCheck, setQuestionTypeCheck] = useState(null)

  const idName = ['SavdTracks', 'TopTracks', 'LastTracks', 'TopArtists', 'FolArtists', 'Playlist']

  const idTracks = ['SpotID', 'Title', 'Artist', 'Label', 'RelDat', 'Cover', 'Player']
  const idArtists = ['SpotID', 'Title', 'Cover', 'Genres']
  const idPlaylists = ['SpotID', 'Title', 'Cover']

  const [lengthPages, setLengthPages] = useState()
  const [pagesNamesArray, setPagesNamesArray] = useState([])
  const [confirmCheckArray, setConfirmCheckArray] = useState([])

  const [arrayPagesCheck, setArrayPagesCheck] = useState([])

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [usersProfileList, setUsersProfileList] = useState([])

  const [loading, setLoading] = useState(false)

  const [settings, setSettings] = useState([])
  
  const [topTracks, setTopTracks] = useState([])
  const [welcomeSettingsDeutschArray, setWelcomeSettingsDeutschArray] = useState([])
  const [welcomeSettingsEnglishArray, setWelcomeSettingsEnglishArray] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [savedTracks, setSavedTracks] = useState([])
  const [followedArtists, setFollowedArtists] = useState([])
  const [currentPlaylists, setCurrentPlaylists] = useState([])
  const [recentlyTracks, setRecentlyTracks] = useState([])
  const [checkPublicCurrentPlaylists, setCheckPublicCurrentPlaylists] = useState(null)

  const [savedTracksData, setSavedTracksData] = useState({
    check: false,
    limit: 10,
    market: "",
    marketCode: "",
    confirmCheck: false,
  })

  const [usersProfileData, setUsersProfileData] = useState({
    check: false,
  })

  const [topTracksData, setTopTracksData] = useState({
    check: false,
    limit: 20,
    timeRange: "",
    confirmCheck: false,
  })
  
  const [topArtistsData, setTopArtistsData] = useState({
    check: false,
    limit: 20,
    timeRange: "",
    confirmCheck: false,
  })

  const [followedArtistsData, setFollowedArtistsData] = useState({
    check: false,
    limit: 20,
    confirmCheck: false,
  })

  const [currentPlaylistsData, setCurrentPlaylistsData] = useState({
    check: false,
    limit: 20,
    confirmCheck: false,
    public: true
  })

  const [recentlyTracksData, setRecentlyTracksData] = useState({
    check: false,
    limit: 20,
    confirmCheck: false,
  })

  const surveyID = props.surveyID

  const navigate = useNavigate();

  const [endURLSecondSurvey, setEndURLSecondSurvey] = useState(null)

  const [collapseOpen, setCollapseOpen] = useState(Array(20).fill(false))
  const [checkArrayPlaylistsTracks, setCheckArrayPlaylistsTracks] = useState([0, 0, 0, Array(20).fill(Array(10).fill(true))])

  const [getSettingsCheck, setGetSettingsCheck] = useState(false)
  const [noConfirm, setNoConfirm] = useState(false)

  const [confirmTextArray, setConfirmTextArray] = useState(Array(6).fill(''))

  const arrayPageTitle = ['Saved Tracks', 'Top Tracks', 'Last Tracks', 'Top Artists', 
    'Followed Artists', 'Current Playlists']

  useEffect(() => {
    if (checkArray.length > 0) {
      setCheckArrayLength(checkArray.filter(item => item.length > 0).length)
    }
  }, [checkArray])

  useEffect(() => {
    if (settings.length !== 0){
      let checkCheckSettingsDeutsch = []
      let checkCheckSettingsEnglish = []
      if (settings.text1.check){
        checkCheckSettingsDeutsch.push([true, 'Ihrer gespeicherten Musik (Lieblingssongs)'])
        checkCheckSettingsEnglish.push([true, 'Your saved Tracks (Liked Songs)'])
      }
      if (settings.text2.check){
        checkCheckSettingsDeutsch.push([true, 'Ihrem Spotify Abonnement, Ihrem Herkunfsland und die Anzahl Ihrer Follower'])
        checkCheckSettingsEnglish.push([true, 'Your Spotify subscription level, the total number of followers and your country'])
      }
      if (settings.text3.check){
        checkCheckSettingsDeutsch.push([true, 'Ihrer Top Tracks'])
        checkCheckSettingsEnglish.push([true, 'Your Top Tracks'])
      }
      if (settings.text4.check){
        checkCheckSettingsDeutsch.push([true, 'Ihrer Top Interpreten'])
        checkCheckSettingsEnglish.push([true, 'Your Top Artists'])
      }
      if (settings.text5.check){
        checkCheckSettingsDeutsch.push([true, 'Den Interpreten den Sie folgen'])
        checkCheckSettingsEnglish.push([true, 'Your Followed Artists'])
      }
      if (settings.text6.check){
        let playlistCheckWelcomeTextGer = settings.text6.public ? 'Ihrer Playlists' : 'Ihren öffentlichen Playlists'
        checkCheckSettingsDeutsch.push([true, playlistCheckWelcomeTextGer])
        let playlistCheckWelcomeTextEn = settings.text6.public ? 'Your Playlists' : 'Your public Playlists'
        checkCheckSettingsDeutsch.push([true, playlistCheckWelcomeTextEn])
      }
      if (settings.text7.check){
        checkCheckSettingsDeutsch.push([true, 'Ihrer kürzlich gehörten Musik'])
        checkCheckSettingsEnglish.push([true, 'Your last heard music'])
      }
      setWelcomeSettingsDeutschArray(checkCheckSettingsDeutsch)
      setWelcomeSettingsEnglishArray(checkCheckSettingsEnglish)
    }
  }, [settings])

  useEffect(() => {
    if (props.surveyID){
      return fetch("/api/get-settingsfromid" + "?surveyid=" + props.surveyID)
        .then(response => response.json())
        .then((data) => {
            if (!data.error){
                setSettings(data.data[0])
                setConfirmTextArray(data.data[0].confirmTextOnlyCheck)

                setSavedTracksData(data.data[0].text1)
                setShowItemsSavedTracks(data.data[0].text1.limit)

                setUsersProfileData(data.data[0].text2)
                  
                setTopTracksData(data.data[0].text3)
                setShowItemsTopTracks(data.data[0].text3.limit)

                setTopArtistsData(data.data[0].text4)
                setShowItemsTopArtists(data.data[0].text4.limit)
                
                setFollowedArtistsData(data.data[0].text5)
                setShowItemsFollowedArtists(data.data[0].text5.limit)
              
                setCurrentPlaylistsData(data.data[0].text6)
                setShowItemsCurrentPlaylists(data.data[0].text6.limit)
                setCheckPublicCurrentPlaylists(data.data[0].text6.public)
                
                setRecentlyTracksData(data.data[0].text7)
                setShowItemsRecentlyTracks(data.data[0].text7.limit)

                setCheckArray([data.data[0].text1.check && data.data[0].text1.confirmCheck ? Array(data.data[0].text1.limit).fill(true) : Array(0).fill(true), 
                    data.data[0].text3.check && data.data[0].text3.confirmCheck ? Array(data.data[0].text3.limit).fill(true) : Array(0).fill(true), 
                    data.data[0].text7.check && data.data[0].text7.confirmCheck ? Array(data.data[0].text7.limit).fill(true) : Array(0).fill(true), 
                    data.data[0].text4.check && data.data[0].text4.confirmCheck ? Array(data.data[0].text4.limit).fill(true) : Array(0).fill(true), 
                    data.data[0].text5.check && data.data[0].text5.confirmCheck ? Array(data.data[0].text5.limit).fill(true) : Array(0).fill(true),
                    data.data[0].text6.check && data.data[0].text6.confirmCheck ? Array(data.data[0].text6.limit).fill(true) : Array(0).fill(true)
                ])
                
                setArrayPagesCheck([data.data[0].text1.check, data.data[0].text3.check, 
                  data.data[0].text7.check, data.data[0].text4.check, 
                  data.data[0].text5.check, data.data[0].text6.check])
                setConfirmCheckArray([
                  data.data[0].text1.confirmCheck && data.data[0].text1.limit > 0, 
                  data.data[0].text3.confirmCheck && data.data[0].text3.limit > 0, 
                  data.data[0].text7.confirmCheck && data.data[0].text7.limit > 0, 
                  data.data[0].text4.confirmCheck && data.data[0].text4.limit > 0, 
                  data.data[0].text5.confirmCheck && data.data[0].text5.limit > 0,
                  data.data[0].text6.confirmCheck && data.data[0].text6.limit > 0 
                ])
                setEndURLSecondSurvey(data.data[0].secondEndUrl !== '' ? data.data[0].secondEndUrl : null)
                setQuestionTypeCheck(data.data[0].secondEndUrl !== '' ? data.data[0].questionTypeCheck : null)
                setDataFieldsCheck(data.data[0].secondEndUrl !== '' ? data.data[0].dataFieldsCheck : null)
                setSelectedOption(data.data[0].secondEndUrl !== '' ? data.data[0].selectedOption : null)
                setPassLang(data.data[0].secondEndUrl !== '' ? data.data[0].passLang : false)

                setGetSettingsCheck(true)
            }
        });
      }
  }, [props.surveyID])

  useEffect(() => {
    if (getSettingsCheck && confirmCheckArray.length > 0 && checkArray.filter(item => item.length > 0).length === 0){
      setNoConfirm(true)
    }
  }, [getSettingsCheck, confirmCheckArray])

  function getPagesCount(array, lengthArray){
    let counts = 0
    let arrayTemp = []
    for (let schritt = 0; schritt < lengthArray; schritt++) {
      if (confirmCheckArray[schritt] && array[schritt]){
        counts = counts + 1
        arrayTemp.push(arrayPageTitle[schritt])
      }
    }
    setLengthPages(counts)
    setPagesNamesArray(arrayTemp)
  }
  
  useEffect(() => {
    getPagesCount(arrayPagesCheck, arrayPagesCheck.length)
  }, [confirmCheckArray])

  useEffect(() => {
    if (savedTracksData.check && savedTracksData.limit > 0 && props.welcomePageOK) {
      getSavedTracks();
    }
  }, [savedTracksData, props.welcomePageOK])

  useEffect(() => {
    if (usersProfileData.check && props.welcomePageOK) {
      getUsersProfile();
    }
  }, [usersProfileData, props.welcomePageOK])

  useEffect(() => {
    if (topTracksData.check && topTracksData.limit > 0 && props.welcomePageOK) {
      getTopTracks();
    }
  }, [topTracksData, props.welcomePageOK])

  useEffect(() => {
    if (topArtistsData.check && topArtistsData.limit > 0 && props.welcomePageOK) {
      getTopArtists();
    }
  }, [topArtistsData, props.welcomePageOK])

  useEffect(() => {
    if (followedArtistsData.check && followedArtistsData.limit > 0 && props.welcomePageOK) {
      getFollowedArtists();
    }
  }, [followedArtistsData, props.welcomePageOK])

  useEffect(() => {
    if (currentPlaylistsData.check && currentPlaylistsData.limit > 0 && checkPublicCurrentPlaylists !== null && props.welcomePageOK) {
      getCurrentPlaylists();
    }
  }, [currentPlaylistsData, checkPublicCurrentPlaylists], props.welcomePageOK)

  useEffect(() => {
    if (recentlyTracksData.check && recentlyTracksData.limit > 0 && props.welcomePageOK) {
      getRecentlyTracks();
    }
  }, [recentlyTracksData, props.welcomePageOK])

  useEffect(() => {
    let arrayAllDataLength = [topTracks, savedTracks, recentlyTracks, topArtists, followedArtists, currentPlaylists].filter(
      item => item.length > 0
      ).length
    if (arrayAllDataLength === checkArrayLength && checkArrayLength !== 0){
      setLoading(true)
    }
  }, [topTracks, savedTracks, topArtists, followedArtists, currentPlaylists, recentlyTracks])

  useEffect(() => {
    if (props.welcomePageOK && props.participant){
      fetch("/api/get-room" + "?code=" + props.roomCode + "&participant=" + props.participant)
        .then((response) => {
          if (!response.ok) {
            navigate("/");
          }
          return response.json();
        })
        .then((data) => {
          authenticateSpotify();
        });
      }
  }, [props.welcomePageOK])
  
  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          fetch("/spotify/get-auth-url" + "?surveyid=" + surveyID)
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function getUsersProfile() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
      }),
      credentials: 'include'
    };
    fetch("/spotify/users-profile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUsersProfileList(data)
      });
  }

  function getTopArtists() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
        confirm: topArtistsData.confirmCheck,
      }),
      credentials: 'include'
    };
    fetch("/spotify/top-artists" + "?limit=" + topArtistsData.limit + "&timeRange=" + topArtistsData.timeRange, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setTopArtists(data);
      });
  }

  function getFollowedArtists() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
        confirm: followedArtistsData.confirmCheck, 
      }),
      credentials: 'include'
    };
    fetch("/spotify/followed-artists" + "?limit=" + followedArtistsData.limit, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setFollowedArtists(data);
      });
  }

  function getCurrentPlaylists() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
        confirm: currentPlaylistsData.confirmCheck, 
      }),
      credentials: 'include'
    };
    fetch("/spotify/current-playlists" + "?limit=" + currentPlaylistsData.limit + '&public=' + checkPublicCurrentPlaylists, 
    requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlaylists(data);
        setCollapseOpen(Array(data.length).fill(false))
        setCheckArrayPlaylistsTracks([0, 0, 0, Array(data.length).fill(Array(10).fill(true))])
      });
  }

  function getRecentlyTracks() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
        confirm: recentlyTracksData.confirmCheck, 
      }),
      credentials: 'include'
    };
    fetch("/spotify/recently-played-tracks" + "?limit=" + recentlyTracksData.limit, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setRecentlyTracks(data);
      });
  }

  function getTopTracks() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
        confirm: topTracksData.confirmCheck, 
      }),
      credentials: 'include'
    };
    fetch("/spotify/top-tracks" + "?limit=" + topTracksData.limit + "&timeRange=" + topTracksData.timeRange, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data);
      });
  }

  function getSavedTracks() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participant: props.participant,
        surveyID: surveyID,
        roomCode: props.roomCode,
        confirm: savedTracksData.confirmCheck, 
      }),
      credentials: 'include'
    };
    fetch("/spotify/saved-tracks" + "?limit=" + savedTracksData.limit + "&market=" + savedTracksData.marketCode, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSavedTracks(data);
      });
  }

  function renderResultListTracks (trackList, title, count, checkArray, setCheckArray, index) {
    return(
      <React.Fragment>
        {resultListTrack(trackList.slice(0,count), title.toString(), checkArray, setCheckArray, index)}
      </React.Fragment>
      );
  }

  function renderResultListArtists (artistList, title, count, checkArray, setCheckArray, index) {
    return(
      <React.Fragment>
        {resultListArtist(artistList.slice(0,count), title, checkArray, setCheckArray, index)}
      </React.Fragment>
      );
  }

  function renderResultListPlaylists (playlistsList, title, count, checkArray, setCheckArray, index, 
    setCollapseOpen, collapseOpen, checkArray2, setCheckArray2) {
    return(
      <React.Fragment>
        {resultListPlaylist(
          playlistsList.slice(0,count), title, checkArray, setCheckArray, index, setCollapseOpen, collapseOpen, 
          checkArray2, setCheckArray2
        )}
      </React.Fragment>
      );
  }

  function resultListData(pageName){
    return(
      <div className="render-result-container">
        <div className="render-result-container-inner">
          <div className="render-result">
            { pageName === 'Saved Tracks' ? 
              savedTracks.length > 0 ?
                renderResultListTracks(savedTracks, pageName, showItemsSavedTracks, checkArray, setCheckArray, 0) : 
                renderLoading() : 
              null 
            }
            { pageName === 'Top Tracks' ? 
              topTracks.length > 0 ?
                renderResultListTracks(topTracks, pageName, showItemsTopTracks, checkArray, setCheckArray, 1) : 
                renderLoading() : 
              null}
            { pageName === 'Last Tracks' ? 
              recentlyTracks.length > 0 ?
                renderResultListTracks(
                  recentlyTracks, pageName, showItemsRecentlyTracks, checkArray, setCheckArray, 2) : 
                renderLoading() :
              null
            }
            { pageName === 'Top Artists' ? 
              topArtists.length > 0 ?
                renderResultListArtists(topArtists, pageName, showItemsTopArtists, checkArray, setCheckArray, 3) : 
                renderLoading() : 
              null
            }
            { pageName === 'Followed Artists' ? 
              followedArtists.length > 0 ?
                renderResultListArtists(
                  followedArtists, pageName, showItemsFollowedArtists, checkArray, setCheckArray, 4) : 
                renderLoading() :
              null
            }
            { pageName === 'Current Playlists' ? 
              currentPlaylists.length > 0 ?
                renderResultListPlaylists(
                  currentPlaylists, pageName, showItemsCurrentPlaylists, checkArray, setCheckArray, 5, 
                  setCollapseOpen, collapseOpen, checkArrayPlaylistsTracks, setCheckArrayPlaylistsTracks) : 
                renderLoading() : 
              null
            }
          </div>
        </div>
      </div>
    )
  }

  function renderStepperButton(){
    return(
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      {activeStep !== pagesNamesArray.length &&
        <Button onClick={() => {
            handleComplete()
            if (Object.keys(completed).length === pagesNamesArray.length){
              handleSaveCheck()
            }}
          } variant="contained">
          {activeStep !== pagesNamesArray.length - 1 ? <ArrowForwardIcon/> : 'OK'}
        </Button>
      }
    </Box>
    )
  }

  const handleNext = () => {
    const newActiveStep =
      activeStep === pagesNamesArray.length - 1 && !(Object.keys(completed).length === pagesNamesArray.length) ? 
        pagesNamesArray.findIndex((label, i) => !(i in completed)) : 
        activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleSaveCheck = () => {
    let dataAll = [savedTracks, topTracks, recentlyTracks, topArtists, followedArtists, currentPlaylists]
    let promises = [];
    
    for (let zaehler = 0; zaehler<confirmCheckArray.length; zaehler++) {
      let spotifyIDArray = []
      let spotifyIDArrayNotConfirm = []
      let checkZaehler = -1
      checkArray[zaehler].filter((item, index) => {
        if(item){
          checkZaehler += 1
          spotifyIDArray.push(dataAll[zaehler][index])
        } else {
          spotifyIDArrayNotConfirm.push(dataAll[zaehler][index])
        }
      })
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index: zaehler,
          participant: props.participant,
          surveyID: surveyID,
          checkData: spotifyIDArray, 
          noData:spotifyIDArrayNotConfirm,
        })
      };
      if(confirmCheckArray[zaehler]){
        promises.push(fetch("/api/save-check-data", requestOptions))
      }
    }
    Promise.all(promises)

    if (endURLSecondSurvey) {
      dataAll = [savedTracks, topTracks, recentlyTracks , topArtists, followedArtists, currentPlaylists]
      let paramsURL = selectedOption ? getGetParams(questionTypeCheck, selectedOption, dataFieldsCheck, idName, idTracks, idArtists, idPlaylists, 
        dataAll, endURLSecondSurvey, checkArray) : null
        
      let passURL = !passLang ? 
        [endURLSecondSurvey,paramsURL,'&partID=',props.participant].join('') :
        [endURLSecondSurvey,paramsURL,'&partID=',props.participant,'&lang=',props.language].join('')
      
      let win = window.open(passURL, '_blank')
      win.focus();
    }
    navigate("/end-room/" + props.language);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  function renderText(){
    return(
      <div className='render-result-explanation-container'>
        <div className='render-result-explanation-inner'>
          <body1 className='render-result-explanation'>
            {props.language == 'de' ? confirmTextArray[activeStep][0] : confirmTextArray[activeStep][1]}
          </body1>
        </div>
      </div>
    )
  }

  function renderStepper(){
    return(
      <React.Fragment>
        {Object.keys(completed).length === pagesNamesArray.length ?
          null :
          <React.Fragment>
            <div style={{padding: '60px 0 0'}}>
              {renderText()}
            </div>
            <Stepper activeStep={activeStep}>
              {pagesNamesArray.map((label, index) => {
                return (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
            {renderStepperButton()}
          </React.Fragment>
        }
        {Object.keys(completed).length !== pagesNamesArray.length ?
          resultListData(pagesNamesArray[activeStep]) :
          null
        }
      </React.Fragment>
    )
  }

  function renderErgebnis(){
    return(
      <React.Fragment>
        {pagesNamesArray.length !== 0 ? renderStepper() : renderLoading()}
      </React.Fragment>
      );
  }

  function renderLoading () {
    return (
      <div className={"loading-container"}>
        <div className={'loading-item'}>
          <div className={'loading-inner'}>
            <CircularProgress style={{margin: 'auto'}} />
            {props.language != 'de' ?
              <body1 style={{paddingTop: '48px'}} className={'endPage-Stepper-body'}>
                Spotify data is loading. <br></br>
                Please do not refresh the page.
              </body1> :
              <body1 style={{paddingTop: '48px'}} className={'endPage-Stepper-body'}>
                Spotify-Daten werden geladen. <br></br>
                Bitte laden Sie die Seite nicht neu.
              </body1>
            }
          </div>
        </div>
      </div>
    )
  }

  function renderResultContainer () {
    return(
      <React.Fragment>
        <div className={"render-result-container-outer"}>
          <div className={"render-result-result-container-inner"}>
            {renderErgebnis()} 
          </div>
        </div>
      </React.Fragment>
    )
  }

  function goToEndPage(){
    if (endURLSecondSurvey) {
      dataAll = [savedTracks, recentlyTracks, topTracks, topArtists, followedArtists, currentPlaylists]
      let paramsURL = getGetParams(questionTypeCheck, selectedOption, dataFieldsCheck, idName, idTracks, idArtists, idPlaylists, 
        dataAll, endURLSecondSurvey)
      let passURL = !passLang ? 
        [endURLSecondSurvey,paramsURL,'&partID=',props.participant].join('') :
        [endURLSecondSurvey,paramsURL,'&partID=',props.participant,'&lang={',props.language, '}'].join('')
      
      let win = window.open(passURL, '_blank')
      console.log(passLang, passURL)
      win.focus();
    } else {
        navigate("/end-room/" + props.language);
    }
  }

  return(
    <React.Fragment>
      <div class="room-header">
        <header class="room-header-inner">
            <div class="room-header-content-container">
              <div class="room-header-content-container-inner">
                <span class="logo-tu-berlin">
                  <img src="../../../static/images/logo_grau-schwarz.png" width="25.755" height="25" />
                  <img src="../../../static/images/TU-Berlin-Logo.svg" width="34.09" height="25" />
                </span>
                <h1 class="room-header-tu-berlin">
                    Spotivey
                </h1>
              </div>
            </div>
        </header>
      </div>
      <div class='room-page-main'>
        {!props.welcomePageOK ? 
          <WelcomePage 
            setWelcomePageOK={props.setWelcomePageOK}
            welcomeSettingsDeutschArray = {welcomeSettingsDeutschArray}
            welcomeSettingsEnglishArray = {welcomeSettingsEnglishArray}
            language = {props.language}
          /> : 
          <React.Fragment>
            {noConfirm ? 
              goToEndPage() :
              <React.Fragment>
                {loading ? 
                  <div class="room-content-main">
                    <div class='room-content-wrapper'>
                      <div class="room-content-wrapper-inner">
                        <div class="room-two-content-outer">
                          <div class='card-two-content-inner-container'>
                            <div class='card-content'>
                              <div className={"render-InfoplusErgebnis-container"}>
                                {renderResultContainer()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                :
                renderLoading()}
              </React.Fragment>
              }
          </React.Fragment>}
      </div>
    </React.Fragment>
  )

}
