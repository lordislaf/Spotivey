import * as React from "react";
import {Collapse} from '@mui/material';
import {IconButton} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from "swiper";
import headerSettings from '../Header/headerSettings';
import Dialog from '@mui/material/Dialog';
import SettingsDialog from './Dialog/SettingsDialog';
import { backButtonPressed, goBackToLogin } from './Button/BackButtonFunction';
import { mainSettingsCard } from './SettingsCard/mainSettingsCard';
import { tracksSettingsCard } from './SettingsCard/tracksSettingsCard';
import { usersSettingsCard } from './SettingsCard/usersSettingsCard';
import { playlistSettingsCard } from './SettingsCard/playlistSettingsCard';
import { saveButton } from './Button/openSettingsDialog';

export default function SettingsPage(props) {

  const [savedTracksLimit, setSavedTracksLimit] = useState(20)
  const [topItemsTracksLimit, setTopItemsTracksLimit] = useState(20)
  const [topItemsArtistsLimit, setTopItemsArtistsLimit] = useState(20)
  const [followedArtistsLimit, setFollowedArtistsLimit] = useState(20)
  const [tracksMarket, setTracksMarket] = useState({Code: "", Name: ""})
  const [topTracksTimeRange, setTopTracksTimeRange] = useState({name: 'medium_term', info: 'approximately last 6 months'})
  const [topArtistsTimeRange, setTopArtistsTimeRange] = useState({name: 'medium_term', info: 'approximately last 6 months'})
  const [savedTracksChecked, setSavedTracksChecked] = useState(false);
  const [topItemsTracksChecked, setTopItemsTracksChecked] = useState(false);
  const [currentUsersChecked, setCurrentUsersChecked] = useState(false);
  const [topItemsArtistsChecked, setTopItemsArtistsChecked] = useState(false);
  const [followedArtistsChecked, setFollowedArtistsChecked] = useState(false);

  const [confirmSavedTracksYes, setConfirmSavedTracksYes] = useState(true)
  const [confirmTopItemsTracksYes, setConfirmTopItemsTracksYes]  = useState(true)
  const [confirmTopItemsArtistsYes, setConfirmTopItemsArtistsYes] = useState(true)
  const [confirmFollowedArtistsYes, setConfirmFollowedArtistsYes] = useState(true)
  const [confirmCurrentPlaylistsYes, setConfirmCurrentPlaylistsYes] = useState(true)
  const [confirmRecentlyTracksYes, setConfirmRecentlyTracksYes] = useState(true)

  const [secondSurveyCheck, setSecondSurveyCheck] = useState(true)

  const [openSettingsListItem, setOpenSettingsListItem] = useState([true, false, false, false, false])

  const [confirmArray, setConfirmArray] = useState([true, false, true, true, true, true, true])

  const [currentPlaylistsLimit, setCurrentPlaylistsLimit] = useState(20)
  const [currentPlaylistsChecked, setCurrentPlaylistsChecked] = useState(false)
  const [checkPublic, setCheckPublic] = useState(true)
  const [recentlyTracksLimit, setRecentlyTracksLimit] = useState(20)
  const [recentlyTracksChecked, setRecentlyTracksChecked] = useState(false)
  const [mySwiper, setMySwiper] = useState({})
  const [mySwiperActiveIndex, setMySwiperActiveIndex] = useState(0)
  const [username, setUsername] = useState(null)
  const [umfrageName, setUmfrageName] = useState('')
  const [umfrageID, setUmfrageID] = useState('')
  const [umfrageEndUrl, setUmfrageEndUrl] = useState('')
  const [secondSurveyServer, setSecondSurveyServer] = useState('')
  const [secondSurveyID, setSecondSurveyID] = useState('')
  const [secondSurveyLanguage, setSecondSurveyLanguage] = useState('')
  const [changeTextfield, setChangeTextfield] = useState(false)
  const [countCheckboxen, setCountCheckboxen] = useState(0)
  const [openDialog, setOpenDialog] = useState(false);
  const [settingsCheckArray, setSettingsCheckArray] = useState([false, false, false, false, false, false, false])
  const [settingsLimitArray, setSettingsLimitArray] = useState(
    [[savedTracksLimit, tracksMarket], [], [topItemsTracksLimit, topTracksTimeRange], [topItemsArtistsLimit, topArtistsTimeRange],
     [followedArtistsLimit], [currentPlaylistsLimit, checkPublic], [recentlyTracksLimit]]
  )
  const [settingsTextArray, setSettingsTextArray] = useState(['', '', ''])

  const [stateTextTT, setStateTextTT] = useState('')
  const [stateTextTA, setStateTextTA] = useState('')
  const [stateTextFA, setStateTextFA] = useState('')
  const [stateTextST, setStateTextST] = useState('')
  const [stateTextRT, setStateTextRT] = useState('')
  const [stateTextCP, setStateTextCP] = useState('')

  useEffect(() => {
    setConfirmArray([confirmSavedTracksYes, false, confirmTopItemsTracksYes, confirmTopItemsArtistsYes, 
      confirmFollowedArtistsYes, confirmCurrentPlaylistsYes, confirmRecentlyTracksYes])
  }, [confirmSavedTracksYes, confirmTopItemsTracksYes, confirmTopItemsArtistsYes, confirmFollowedArtistsYes, 
      confirmCurrentPlaylistsYes, confirmRecentlyTracksYes])

  const navigate = useNavigate();
  const location = useLocation();

  const update = location.state?.update ? true : false
  
  useEffect(() => {
    if (update) {
      fetch("/api/get-settingsfromid" + "?surveyid=" + location.state?.surveyID)
      .then(response => response.json())
      .then((data) => {
          if (!data.error){
            setUmfrageName(data.data[0].nameUmfrage)
            setUmfrageID(data.data[0].umfrageID)
            setSavedTracksLimit(data.data[0].text1.limit)
            setTopItemsTracksLimit(data.data[0].text3.limit)
            setTopItemsArtistsLimit(data.data[0].text4.limit)
            setFollowedArtistsLimit(data.data[0].text5.limit)
            setTracksMarket({
              Code: data.data[0].text1.marketCode, 
              Name: data.data[0].text1.market
            })
            setTopTracksTimeRange({
              name: data.data[0].text3.timeRange, 
              info: ''
            })
            setTopArtistsTimeRange({
              name: data.data[0].text4.timeRange, 
              info: ''
            })
            setCurrentPlaylistsLimit(data.data[0].text6.limit)
            setRecentlyTracksLimit(data.data[0].text7.limit)

            setSavedTracksChecked(data.data[0].text1.check)
            setTopItemsTracksChecked(data.data[0].text3.check)
            setCurrentUsersChecked(data.data[0].text2.check)
            setTopItemsArtistsChecked(data.data[0].text4.check)
            setFollowedArtistsChecked(data.data[0].text5.check)
            setRecentlyTracksChecked(data.data[0].text7.check)
            setCurrentPlaylistsChecked(data.data[0].text6.check)

            setConfirmSavedTracksYes(data.data[0].text1.confirmCheck)
            setConfirmTopItemsTracksYes(data.data[0].text3.confirmCheck)
            setConfirmTopItemsArtistsYes(data.data[0].text4.confirmCheck)
            setConfirmFollowedArtistsYes(data.data[0].text5.confirmCheck)
            setConfirmCurrentPlaylistsYes(data.data[0].text6.confirmCheck)
            setConfirmRecentlyTracksYes(data.data[0].text7.confirmCheck)

            setCheckPublic(data.data[0].text6.public ? data.data[0].text6.public : false )
          }
        });
    }
  }, [update])

  useEffect(() => {
    setSettingsLimitArray([[savedTracksLimit, tracksMarket], [], [topItemsTracksLimit, topTracksTimeRange], [topItemsArtistsLimit, topArtistsTimeRange],
      [followedArtistsLimit], [currentPlaylistsLimit, checkPublic], [recentlyTracksLimit]])
  }, [savedTracksLimit, tracksMarket, topItemsTracksLimit, topTracksTimeRange, topItemsArtistsLimit, topArtistsTimeRange,
    followedArtistsLimit, currentPlaylistsLimit, recentlyTracksLimit, checkPublic])

  useEffect(() => {
    if(umfrageName !=='' && umfrageID !== '') {
      if (!secondSurveyCheck) {
        setChangeTextfield(true)
      }
      else{
        if (secondSurveyServer !=='' && secondSurveyID !== '' && secondSurveyLanguage !== '') {
          setChangeTextfield(true)
        } else {
          setChangeTextfield(false)
        }
      }
      setChangeTextfield(true)
    } else{
      setChangeTextfield(false)
    }
    setSettingsTextArray([umfrageName, umfrageID/* , umfrageEndUrl */])
  }, [umfrageName, umfrageID, secondSurveyID, secondSurveyLanguage, secondSurveyServer, secondSurveyCheck])

  useEffect(() => {
    let arr1 = [savedTracksChecked,currentUsersChecked, topItemsTracksChecked,topItemsArtistsChecked, followedArtistsChecked, 
      currentPlaylistsChecked, recentlyTracksChecked]
    
    setSettingsCheckArray(arr1)

    const count1 = arr1.filter(value => value === true).length;
    setCountCheckboxen(count1)

  }, [savedTracksChecked, currentPlaylistsChecked, followedArtistsChecked, topItemsArtistsChecked, currentUsersChecked,
     recentlyTracksChecked, topItemsTracksChecked])

  useEffect(() => {
    async function userInRoom() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          if (data.username === null){
            goBackToLogin(navigate)
          } else {
            setUsername(data.username)
          }
        });
    }
    userInRoom();
  }, [])
  
  function openCollapse(){
    let items = [...openSettingsListItem];
    let itemNew = {...items[mySwiper.activeIndex]};
    let itemOld = {...items[mySwiper.previousIndex]};
    itemNew = true;
    itemOld = false;
    items[mySwiper.activeIndex] = itemNew;
    items[mySwiper.previousIndex] = itemOld;
    setOpenSettingsListItem(items);
  }

  const handleSettingsButtonPressed = (indexTo) => {
      mySwiper.slideTo(indexTo)
      openCollapse();
  }

  function handleCloseDialog () {
    setOpenDialog(false)
  }

  function renderDialog() {
    return(
      <React.Fragment>
        <Dialog
          fullWidth
          open={openDialog}
          onClose={handleCloseDialog}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          {
            openDialog ?
              <SettingsDialog 
                props={
                  [[openDialog, setOpenDialog],
                  settingsCheckArray, 
                  settingsLimitArray, 
                  settingsTextArray,
                  username, 
                  confirmArray,
                  update, 
                  location.state?.surveyID]
                }  
              /> 
            : null
          }
        </Dialog>
      </React.Fragment>
    )
  }
  
  function renderSettingsPage() {
      return (
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
                  <nav class="navbar-new-settings-content">
                    <ul className="list-new-settings-container">
                      <list className='list-new-settings-item'>
                        <IconButton onClick={() => backButtonPressed(navigate)}>
                          <ArrowBackIosNewOutlinedIcon />
                        </IconButton>
                      </list>
                      <list className='list-new-settings-item-container'>
                        <a 
                          class={mySwiper?.activeIndex===0 ? 'list-new-settings-item-bold' : 'list-new-settings-item-regular'}
                          onClick={() => handleSettingsButtonPressed(0)}
                        >
                          main Settings
                        </a>
                        <Collapse in={openSettingsListItem[0]} timeout="auto" unmountOnExit>
                          <ul className={"list-new-settings-collapse-inner"}>
                              <li className={"list-new-settings-collapse-item"}>
                                Settings Name
                              </li>
                              <li className={"list-new-settings-collapse-item"}>
                                Survey ID (1st Survey)
                              </li>
                          </ul>
                        </Collapse>
                      </list>
                      <list className='list-new-settings-item-container'>
                        <a 
                          class={mySwiper?.activeIndex===1 ? 'list-new-settings-item-bold' : 'list-new-settings-item-regular'}
                          onClick={() => handleSettingsButtonPressed(1)}
                        >
                          Tracks
                        </a>
                        <Collapse in={openSettingsListItem[1]} timeout="auto" unmountOnExit>
                          <ul className={"list-new-settings-collapse-inner"}>
                              <li className={"list-new-settings-collapse-item"}>
                                Get User's Saved Tracks
                              </li>
                              <li className={"list-new-settings-collapse-item"}>
                                Get Last Played Tracks
                              </li>
                          </ul>
                        </Collapse>
                      </list>
                      <list className='list-new-settings-item-container'>
                        <a 
                          class={mySwiper?.activeIndex===2 ? 'list-new-settings-item-bold' : 'list-new-settings-item-regular'}
                          onClick={() => handleSettingsButtonPressed(2)}
                        >
                          User's
                        </a>
                        <Collapse in={openSettingsListItem[2]} timeout="auto" unmountOnExit>
                          <ul className={"list-new-settings-collapse-inner"}>
                              <li className={"list-new-settings-collapse-item"}>
                                Get Current User's Profile
                              </li>
                              <li className={"list-new-settings-collapse-item"}>
                                Get User's Top Items (Tracks)
                              </li>
                              <li className={"list-new-settings-collapse-item"}>
                                Get User's Top Items (Artists)
                              </li>
                              <li className={"list-new-settings-collapse-item"}>
                                Get Followed Artists
                              </li>
                          </ul>
                        </Collapse>
                      </list>
                      <list className='list-new-settings-item-container'>
                        <a 
                          class={mySwiper?.activeIndex===3 ? 'list-new-settings-item-bold' : 'list-new-settings-item-regular'}
                          onClick={() => handleSettingsButtonPressed(3)}
                        >
                          Playlists
                        </a>
                        <Collapse in={openSettingsListItem[3]} timeout="auto" unmountOnExit>
                          <ul className={"list-new-settings-collapse-inner"}>
                              <li className={"list-new-settings-collapse-item"}>
                                Get Current User's Playlists
                              </li>
                          </ul>
                        </Collapse>
                      </list>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="setting-content-main">
                <div class='setting-content-wrapper'>
                  <div class="setting-content-wrapper-inner">
                    <div class="setting-content-outer">
                        <Swiper
                          pagination={{
                            type: "progressbar"
                          }}
                          navigation={true}
                          allowTouchMove={false}
                          mousewheel={{'forceToAxis': true}}
                          modules={[Navigation, Pagination, Mousewheel]}
                          className="mySwiper"
                          onSwiper={setMySwiper}
                          onSlideChange={(swiper) => {
                            openCollapse();
                            setMySwiperActiveIndex(swiper.activeIndex)}
                          }
                          onInit={(swiper) => {
                            setMySwiper(swiper)
                        }}
                          height={'100%'}
                        >
                          <SwiperSlide>
                              {mainSettingsCard(
                                  umfrageName, setUmfrageName,
                                  umfrageID, setUmfrageID
                              )}
                          </SwiperSlide>
                          <SwiperSlide>
                              {tracksSettingsCard (
                                  savedTracksChecked, setSavedTracksChecked,
                                  savedTracksLimit, setSavedTracksLimit,
                                  tracksMarket, setTracksMarket,
                                  confirmSavedTracksYes, setConfirmSavedTracksYes, 
                                  recentlyTracksChecked, setRecentlyTracksChecked,
                                  recentlyTracksLimit, setRecentlyTracksLimit,
                                  confirmRecentlyTracksYes, setConfirmRecentlyTracksYes,
                                  setStateTextST, stateTextST, setStateTextRT, stateTextRT
                              )}
                          </SwiperSlide>
                          <SwiperSlide>
                              {usersSettingsCard (
                                  currentUsersChecked, setCurrentUsersChecked,
                                  topItemsTracksChecked, setTopItemsTracksChecked,
                                  topItemsTracksLimit, setTopItemsTracksLimit,
                                  topTracksTimeRange, setTopTracksTimeRange,
                                  topItemsArtistsChecked, setTopItemsArtistsChecked,
                                  topItemsArtistsLimit, setTopItemsArtistsLimit,
                                  topArtistsTimeRange, setTopArtistsTimeRange,
                                  followedArtistsChecked, setFollowedArtistsChecked,
                                  followedArtistsLimit, setFollowedArtistsLimit,
                                  confirmTopItemsTracksYes, setConfirmTopItemsTracksYes,
                                  confirmTopItemsArtistsYes, setConfirmTopItemsArtistsYes,
                                  confirmFollowedArtistsYes, setConfirmFollowedArtistsYes,
                                  setStateTextTT, stateTextTT, setStateTextTA, stateTextTA,
                                  setStateTextFA, stateTextFA
                              )}
                          </SwiperSlide>
                          <SwiperSlide>
                              {playlistSettingsCard(
                                currentPlaylistsChecked, setCurrentPlaylistsChecked,
                                currentPlaylistsLimit, setCurrentPlaylistsLimit,
                                confirmCurrentPlaylistsYes, setConfirmCurrentPlaylistsYes,
                                checkPublic, setCheckPublic, stateTextCP, setStateTextCP
                              )}
                          </SwiperSlide>
                        </Swiper>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
            {saveButton(
              setOpenDialog, 
              mySwiperActiveIndex, countCheckboxen, changeTextfield, update
              )}
          </React.Fragment>
      );
    }

    return(
      <React.Fragment>
        {renderSettingsPage()}
        {renderDialog()}
      </React.Fragment>
    )
}
