import React from "react";
import SettingsPage from "./UserRoom/NewSettingsFirst/settings";
import SettingsPageSecond from "./UserRoom/UserSettingsSecond/SettingsSecond";
import UserPage from "./UserRoom/UserOverview/UserPage";
import Room from "./Room/Room";
import LoginPage from "./Login/SignIn";
import SignUpPage from "./SignUp/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  redirect
} from "react-router-dom";
import { useState, useEffect } from 'react';
import CreateRoom from './CreateRoom.js';
import AudioFeaturesDashboard from './UserRoom/UserResult/AudioFeaturesDashboard.js';
import UserResultPage from './UserRoom/UserResult/UserResultPage.js';
import UserTutorialPage from './UserRoom/UserTutorial/UserTutorialPage.js';
import UserSettingsPage from './UserRoom/UserSettingsFirst/UserSettingsPage.js';
import UserSettingsPageSecond from './UserRoom/UserSettingsSecond/UserSettingsPageSecond.js';
import SettingsPageSecondTwo from './UserRoom/UserSettingsSecond/SettingsPageSecondTwo.js';
import EndPage from "./EndRoom/EndPage";
import PrivacyComponent from "./Privacy/PrivacyComponent";
import ConfirmTextDesign from "./UserRoom/ConfirmTextDesign/ConfirmTextDesign";
import SpotiveyFooter from "./Footer/footerSpotivey";
import Version from "./Version/version";

export default function FirstPage () {

  const [welcomePageOK, setWelcomePageOK] = useState(false)

  const [roomCode, setRoomCode] = useState(null)
  const [participant, setParticipant] = useState(null)
  const [surveyID, setSurveyID] = useState(null)
  const [language, setLanguage] = useState(null)
  const [paramsObjectSession, setParamsObjectSession] = useState(null)

  const [createRoom, setCreateRoom] = useState(null)
  const [redirectCheck, setRedirect] = useState(null)

  function clearRoomCode() {
    setRoomCode(null)
  }

  function paramsToObject(entries) {
    const result = []
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
      result.push([key, value])
    }
    return result;
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const paramsObject = paramsToObject(url.searchParams.entries())
    console.log(paramsObject)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        surveyID: url.searchParams.get('surveyID'),
        participant: url.searchParams.get('participant'),
        lang: url.searchParams.get('lang'),
        paramsObject:paramsObject,
      }),
    };
    if (!createRoom){
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setCreateRoom(true)
        });
      }
  }, [])

  useEffect(() => {
    if (createRoom) {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          if (!data.surveyID) {
            if (!data.resultExist){
              setRedirect(true)
            }
          }
          setSurveyID(data.surveyID)
          setLanguage(data.language)
          setRoomCode(data.roomCode)
          setParticipant(data.participant)
          setWelcomePageOK(data.welcome)
          setParamsObjectSession(data.paramsObject)
        });
    }
  }, [createRoom])
    
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={!roomCode && !surveyID && !participant && !language ?
              redirectCheck ? <Navigate to={'/login'} replace/> :
              <CreateRoom /> :
              <Navigate to={'/room'} replace/>
            }
          />
          <Route
            path="/room"
            element={
              <Room 
                surveyID={surveyID} 
                roomCode={roomCode} 
                participant={participant}
                leaveRoomCallback={clearRoomCode} 
                welcomePageOK={welcomePageOK} 
                setWelcomePageOK={setWelcomePageOK}
                language={language}
                paramsObjectSession={paramsObjectSession}
              />
            }
          />
          <Route path="/user/settings/new" element={<SettingsPage/>} />
          <Route path="/user/settings/confirm-text-design" element={<ConfirmTextDesign/>} />
          <Route path="/user/settings2/new" element={<SettingsPageSecond/>} />
          <Route path="/user/settings2/new2" element={<SettingsPageSecondTwo/>} />
          <Route exact path="/user" element={<UserPage/>} />
          <Route exact path="/user/settings" element={<UserSettingsPage/>} />
          <Route exact path="/user/settings2" element={<UserSettingsPageSecond/>} />
          <Route exact path="/user/tutorial" element={<UserTutorialPage/>} />
          <Route exact path="/user/results" element={<UserResultPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route exact path="/user/results-audio-features" element={<AudioFeaturesDashboard/>} />
          <Route path='/end-room/:lang' element={<EndPage/>} />
          <Route path={'/privacy'} element={<PrivacyComponent/>} />
          <Route path={'/version'} element={<Version/>} />
        </Routes>
      </Router>
      <div className="footer-container">
        <SpotiveyFooter participant={participant}/>
      </div>
    </React.Fragment>
  );
}