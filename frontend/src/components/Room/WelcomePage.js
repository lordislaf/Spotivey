import React from "react";
import Button from '@mui/material/Button';


export default function WelcomePage (props) {

    function renderWelcomeTextGerman(){
        return(
            <body1 className={'endPage-Stepper-body'}>
                Hinweis: <br></br>
                Die Spotivey Applikation der TU Berlin wird im Rahmen einer Datenspende zu Forschungszwecken 
                gemäß der EU-Datenschutz-Grundverordnung (DSGVO) auf Ihr Spotify-Profil zugreifen. 
                Dazu bitten wir Sie nun anschließend, sich bei Spotify einzuloggen. 
                Damit erteilen Sie uns explizit Ihre Zustimmung zum Abruf folgender Accountinformationen:
                <ol style={{paddingLeft: '32px'}}>
                    {props.welcomeSettingsDeutschArray.map((item) => {
                        return(
                                <React.Fragment>
                                    {item[0] ? 
                                        <li>
                                            {item[1]}
                                        </li> : 
                                        null
                                    }
                                </React.Fragment>
                            )
                        }
                    )}
                </ol>
                Personenbezogene Profildaten wie Name, Profilbild, Emailadresse und Geburtsdatum werden in keinem Fall 
                von uns abgerufen, gespeichert, oder analysiert, auch wenn wir aus technischen Gründen 
                kurz auf Ihr Spotify-Profil zugreifen müssen, welches diese personenbezogenen Daten enthält. 
                Lediglich die oben aufgelisteten Daten zu Ihrer persönlichen Musiknutzung werden von uns abgerufen 
                und anschließend mit Ihren restlichen Fragebogendaten verknüpft. 
                Sie werden von den Durchführenden der Studie ausschließlich zu Forschungszwecken unter den 
                datenschutzrechtlichen Bedingungen verwendet, denen Sie bereits zu Beginn der Befragung zugestimmt haben. 
            </body1>
        )
    }

    function renderWelcomeTextEnglish(){
        return(
            <body1 className={'endPage-Stepper-body'}>
                Notice: <br></br>
                The Spotivey application of TU Berlin will access your Spotify profile as part of a data donation 
                for research purposes in accordance with the EU General Data Protection Regulation (GDPR). 
                For this purpose, we now subsequently ask you to log in to Spotify. 
                By doing so, you explicitly give us your consent to retrieve the following account information:
                <ol style={{paddingLeft: '32px'}}>
                    {props.welcomeSettingsEnglishArray.map((item) => {
                        return(
                                <React.Fragment>
                                    {item[0] ? 
                                        <li>
                                            {item[1]}
                                        </li> : 
                                        null
                                    }
                                </React.Fragment>
                            )
                        }
                    )}
                </ol>
                Personal profile data such as name, profile picture, email address and date of birth are never retrieved, 
                stored or analyzed by us, even if we need to briefly access your Spotify profile for technical reasons, 
                which contains this personal data. Only the data listed above regarding your personal music usage will be 
                retrieved by us and subsequently linked to the rest of your questionnaire data. 
                They will be used by those conducting the study exclusively for research purposes under the data 
                protection conditions that you already agreed to at the beginning of the survey.
            </body1>
        )
    }

    return(
        <React.Fragment>
            <div class="room-content-main">
                <div class='room-content-wrapper'>
                    <div class="room-content-wrapper-inner">
                        <div class="room-two-content-outer">
                            <div class='card-two-content-inner-container'>
                                <div class='card-content'>
                                    <h1 class='settings-title'>
                                        {props.language=='de' ? 'Datenschutzhinweis' : 'Privacy Notice'}
                                    </h1>
                                    <div className="welcome-page-card">
                                        <div className="welcome-page-card-inner">
                                            {props.language=='de' ? renderWelcomeTextGerman() : renderWelcomeTextEnglish()} 
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='speicher-button'>
                <Button variant={'contained'} onClick={() => {props.setWelcomePageOK(true)}}>
                    OK
                </Button>
            </div>
        </React.Fragment>
    )
}