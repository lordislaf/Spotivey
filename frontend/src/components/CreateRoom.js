import React from "react";
import { useState, useEffect } from 'react';

export default function CreateRoom () {
    
    const [showError, setShowError] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setShowError(true)
        }, 2000);
    }, []);


    return (
        <React.Fragment>
            <div class="room-header">
                <header class="room-header-inner">
                    <div class="room-header-content-container">
                        <div class="room-header-content-container-inner">
                        <span class="logo-tu-berlin">
                            {/* <img src="../../../static/images/logo_grau-schwarz.png" width="25.755" height="25" />
                            <img src="../../../static/images/TU-Berlin-Logo.svg" width="34.09" height="25" /> */}
                            <img src="../../../static/images/SpotiveyLogo2_Schrift.svg" width="100%" height="100%"/>
                        </span>
                        </div>
                    </div>
                </header>
            </div>
            <div class='room-page-main'>
                <div class="room-content-main">
                    <div class='room-content-wrapper'>
                        <div class="room-content-wrapper-inner">
                            <div class="room-two-content-outer">
                                <div class='card-two-content-inner-container'>
                                    <div class='card-content'>
                                        {showError  ? 
                                        <div className={"render-InfoplusErgebnis-container"}>
                                            <h1 class='settings-title'>
                                                Error!
                                            </h1>
                                            <body1 className={'endPage-Stepper-body'}>
                                                It seems that you have already completed the survey. <br></br>
                                                Results have already been recorded with your Participant ID.
                                                <br></br>
                                                If you have any problems, contact your study administrator.
                                            </body1>
                                        </div> : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}