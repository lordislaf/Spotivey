import React from "react";
import { useParams } from "react-router-dom";

export default function EndPage() {
    let { lang } = useParams();

    return (
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
            <div class='version-page-main'>
                <div class="room-content-main">
                    <div class='room-content-wrapper'>
                        <div class="room-content-wrapper-inner">
                            <div class="room-two-content-outer">
                                <div class='card-two-content-inner-container'>
                                    <div class='card-content'>
                                        <div className={"render-InfoplusErgebnis-container"}>
                                            <h1 class='settings-title'>
                                                {lang == 'de' ? 
                                                    'Geschafft - Vielen Dank!' : 
                                                    'Done - Thank you!'
                                                }
                                            </h1>
                                            {lang == 'de' ? 
                                                <body1 className={'endPage-Stepper-body'}>
                                                    Danke für Ihre Datenspende in Form von Informationen zu Ihrem 
                                                    Musikhörverhalten aus Ihrem Spotify-Account! 
                                                    Die Befragung ist an dieser Stelle zu Ende. <br></br>
                                                    Sie können dieses Fenster jetzt also schließen
                                                </body1> : 
                                                <body1 className={'endPage-Stepper-body'}>
                                                    Thank you for donating your data in the form of information about your 
                                                    music listening habits from your Spotify account! 
                                                    The survey ends at this point.<br></br>
                                                    So you can close this window now.
                                                </body1> 
                                            }
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