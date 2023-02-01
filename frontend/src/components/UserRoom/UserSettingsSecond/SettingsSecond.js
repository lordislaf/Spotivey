import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IconButton, Button } from "@mui/material";
import headerSettings from '../Header/headerSettings';
import TextFieldMain from "../NewSettingsFirst/SettingsCard/Content/Components/TextFieldMain";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { goBackToLogin } from '../NewSettingsFirst/Button/BackButtonFunction';

export default function SettingsPageSecond() {
    const navigate = useNavigate()
    const location = useLocation()
    const surveyID = location.state.surveyID

    const [secondSurveyServer, setSecondSurveyServer] = useState('https://student-surveys.ak.tu-berlin.de')
    const [secondSurveyID, setSecondSurveyID] = useState(location?.state.surveyIDsecond?location.state.surveyIDsecond:'')
    const [secondSurveyLanguage, setSecondSurveyLanguage] = useState('de')

    const [changeURLCheck, setChangeURLCheck] = useState(false)

    const [endURL, setEndURL] = useState(
        location?.state.endURL ?
            location.state.endURL : 
            'https://student-surveys.ak.tu-berlin.de/index.php/'+location?.state.surveyIDsecond+'?lang=de&newtest=Y'
    )

    const [username, setUsername] = useState('')

    const url = useRef(location.state.surveyIDsecond ?
        'https://student-surveys.ak.tu-berlin.de/index.php/'+location.state.surveyIDsecond+'?lang=de&newtest=Y' :
        'https://student-surveys.ak.tu-berlin.de/index.php/?lang=de&newtest=Y'
        )

    useEffect(() => {
        if (url.current != secondSurveyServer+'/index.php/'+secondSurveyID+'?lang='+secondSurveyLanguage+'&newtest=Y'){
            setEndURL(secondSurveyServer+'/index.php/'+secondSurveyID+'?lang='+secondSurveyLanguage+'&newtest=Y')
        }
    }, [secondSurveyServer, secondSurveyID, secondSurveyLanguage])

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
                            <List
                                sx={{ width: '100%', maxWidth: 360}}
                            > 
                                <ListItem>
                                    <IconButton href="/user/settings2">
                                        <ArrowBackIosNewOutlinedIcon />
                                    </IconButton>
                                </ListItem>
                            </List>
                        </nav>
                    </div>
                </div>
                <div class="setting-content-main">
                    <div class='setting-content-wrapper'>
                        <div class="setting-content-wrapper-inner">
                            <div class="setting-content-outer">
                                <div class='card-content-inner-container'>
                                    <div class='card-content-second'>
                                        <h1 data-heading='true' class='settings-title'>
                                            Settings 2nd Survey
                                        </h1>
                                            <div className="main-content-card-container-outer">
                                                <div className="main-content-card" id={'second-settings-main'}>
                                                    {TextFieldMain(
                                                        '2nd Survey Server', '2nd Survey Server', 
                                                        setSecondSurveyServer, secondSurveyServer, true, changeURLCheck
                                                    )}
                                                    {TextFieldMain(
                                                        '2nd Survey ID', 'e.g. 347491', 
                                                        setSecondSurveyID, secondSurveyID, true, changeURLCheck
                                                    )}
                                                    {TextFieldMain(
                                                        '2nd Survey Language', '2nd Survey Language', 
                                                        setSecondSurveyLanguage, secondSurveyLanguage, true, changeURLCheck
                                                    )}
                                                </div>
                                                <div className="main-content-card-end-url">
                                                    {changeURLCheck ? 
                                                        <React.Fragment>
                                                            {TextFieldMain(
                                                                'Start URL for the second survey', 'Change URL', 
                                                                setEndURL, endURL, true, false
                                                            )}
                                                            <div className={'buttons-change-end-url-container'}>
                                                                <button 
                                                                    className="button-change-end-url"
                                                                    onClick={() => {
                                                                        setChangeURLCheck(false)
                                                                    }}
                                                                >
                                                                    Change
                                                                </button>
                                                                <button 
                                                                    className="button-change-end-url"
                                                                    onClick={() => {
                                                                        setEndURL(`${secondSurveyServer}/index.php/
                                                                        ${secondSurveyID}?lang=${secondSurveyLanguage}`)
                                                                        setChangeURLCheck(false)
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </React.Fragment>
                                                    :
                                                        <React.Fragment>
                                                        <h2 data-heading='true' class='settings-content-item-title'>
                                                            2nd Survey Start-URL
                                                        </h2>
                                                        <h3 className="card-end-url-title">
                                                            {endURL}
                                                        </h3>
                                                        <button 
                                                            className="button-change-end-url"
                                                            onClick={() => {
                                                                setChangeURLCheck(true)
                                                            }}
                                                        >
                                                            Change Start-URL
                                                        </button>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="settings-second-next-button">
                {!location.state.endURL ? 
                <Button 
                    variant="contained" 
                    endIcon={<SaveOutlinedIcon />} 
                    color='inherit'
                    onClick={()=>{
                        const requestOptions = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                surveyID: surveyID,
                                username: username,
                                secondSurveyID: secondSurveyID,
                                secondSurveyServer: secondSurveyServer,
                                secondSurveyLanguage: secondSurveyLanguage,
                                endURL: endURL,
                                data: {}
                            }),
                          };
                          fetch("/api/create-settings-second-survey", requestOptions)
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
                    disabled={endURL == 'https://surveys.ak.tu-berlin.de/index.php/?lang=de' || endURL == '' ? true : false}
                >
                    Save
                </Button> : 
                <Button
                    variant="contained" 
                    endIcon={<SaveOutlinedIcon />} 
                    color='inherit'
                    onClick={()=>{
                        const requestOptions = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                surveyID: surveyID,
                                username: username,
                                secondSurveyID: secondSurveyID,
                                secondSurveyServer: secondSurveyServer,
                                secondSurveyLanguage: secondSurveyLanguage,
                                endURL: endURL,
                            }),
                        };
                        fetch("/api/update-settings-second-survey-end-url", requestOptions)
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
                    Edit End URL
                </Button>
                }
            </div>
        </React.Fragment>
    )
}