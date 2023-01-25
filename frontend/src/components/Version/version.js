import React from "react";
import { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Button, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";

export default function Version() {

    const [userInRoomCheck, setUserInRoomCheck] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function userInRoom() {
          fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
              if (data.username === null){
                setUserInRoomCheck(false)
              } else {
                setUserInRoomCheck(true)
              }
            });
        }
        userInRoom();
      }, [])

    
    return (
        <React.Fragment>
            <div class="setting-header">
                <header class="setting-header-inner">
                    <div class="setting-header-content-container">
                        <div class="setting-header-content-container-inner">
                            <div className="logo-header">
                                <span class="logo-tu-berlin">
                                <a href='https://www.ak.tu-berlin.de/menue/fachgebiet_audiokommunikation' target={'_blank'}>
                                    <img src="../../static/images/TU-Berlin-Logo.svg" width="81.816" height="60">
                                    </img>
                                    <img src="../../static/images/logo_grau-schwarz.png" width="61.812" height="60">
                                    </img>
                                </a>
                                </span>
                                <h1 class="setting-header-tu-berlin">
                                    Spotivey
                                </h1>
                            </div>
                        </div>
                        <div class='header-logout'>
                            <IconButton 
                                variant="text" 
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                <KeyboardBackspaceIcon/>
                            </IconButton>
                        </div>
                    </div>
                </header>
            </div>
            <div class='version-page-main'>
                <div class="room-content-main">
                    <div class='room-content-wrapper'>
                        <div class="room-content-wrapper-inner">
                            <div class="room-two-content-outer">
                                <div class='card-two-content-inner-container'>
                                    <div class='card-content'>
                                        <div className={"render-InfoplusErgebnis-container"}>
                                            <h1 class='settings-title'>
                                                Application Info:
                                            </h1>
                                            <div className="welcome-page-card">
                                                <div className="welcome-page-card-inner">
                                                    <body1 className={'endPage-Stepper-body'}>
                                                        Version: 1.0 (2022)
                                                        <br></br>
                                                        Spotivey was originally developed as part of a master thesis 
                                                        in audio communication by Matthias Ladleif using Python (backend) 
                                                        and React (frontend). 
                                                        The thesis was supervised by Dr. Steffen Lepa and Prof. Stefan Weinzierl at 
                                                        Audio Communication Group, Technische Universität Berlin, Germany. 
                                                        Spotivey is hosted on a TU Berlin server as a public service free of 
                                                        charged for academics interested in music research. 
                                                        If you are drawing on Spotivey in your own research, please don't forget 
                                                        to cite the original authors as follows: 
                                                        <div className="cite-version">
                                                            Ladleif, M. & Lepa, S. (2023). Spotivey – 
                                                            Eine Web-Applikation zur vereinfachten Nutzung der Spotify-API im 
                                                            Rahmen Online-Fragebogenstudien. <i>Publizistik</i>. In press. 
                                                        </div>  
                                                    </body1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}