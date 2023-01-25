import * as React from "react";
import { mainContentSettings } from "./Content/mainContentSettings";

export function mainSettingsCard (
    surveyName, setSurveyName,
    surveyID, setSurveyID
){
    return(
        <React.Fragment>
            <div class='card-content-inner-container'>
                <div class='card-content'>
                    <h1 data-heading='true' class='settings-title'>
                        Main Settings
                    </h1>
                    <h3 className='figcaption-text'>
                        Give a name of your choice. 
                        This name serves as an identifier for several similar survey settings. 
                        In addition, please enter the unique ID of your survey. 
                    </h3>
                    <h3 className='figcaption-text' style={{paddingTop: '1em'}}>
                        If you have already saved a setting with this ID, you can update and change it in your account.
                    </h3>
                    <h3 className='figcaption-text' style={{paddingTop: '1em'}}>
                        Then indicate on the other slides which Spotify information you are interested in. 
                    </h3>
                    {mainContentSettings(
                        surveyName, setSurveyName,
                        surveyID, setSurveyID
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}