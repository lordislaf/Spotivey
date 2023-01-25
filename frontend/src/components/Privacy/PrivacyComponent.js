import React from "react";
import { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Button, IconButton } from "@mui/material";
import PrivacyContent from "./PrivacyContent";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";

export default function PrivacyComponent() {

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

    return(
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
                        {userInRoomCheck ? 
                        <div class='header-logout'>
                            <IconButton 
                                variant="text" 
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                <KeyboardBackspaceIcon/>
                            </IconButton>
                        </div> :
                        <div class='header-logout'>
                            <Button variant="text" startIcon={<LoginIcon />} href={'/login'} >
                                Login
                            </Button>
                        </div>
                        }
                    </div>
                </header>
            </div>
            <PrivacyContent/>
        </React.Fragment>
    )
}