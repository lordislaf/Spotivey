import * as React from "react";
import TextFieldMain from "./Components/TextFieldMain";


export function mainContentSettings(
    surveyName, setSurveyName,
    surveyID, setSurveyID
) {

  function renderTooltipName(){
    return(
      <div className='tooltip-render-container'>
        <body1 className='tooltip-render-text'>
          Give a representative name of your choice. This expression serves as a recognition feature for several similar survey settings.
        </body1>
      </div>
    )
  }

  function renderTooltipID(){
    return(
      <div className='tooltip-render-container'>
        <body1 className='tooltip-render-text'>
          Please enter the unique ID of your survey. 
          If you have already saved a setting with this ID, you can update and change it in your account.
        </body1>
      </div>
    )
  }

    return(
      <React.Fragment>
        <div className="main-content-card">
          {TextFieldMain('Name of Setting', 'Name Survey', setSurveyName, surveyName, true, false, renderTooltipName())}
          {TextFieldMain('1st Survey ID', '1st Survey ID', setSurveyID, surveyID, true, false, renderTooltipID())}
        </div>
      </React.Fragment>
    );
  }