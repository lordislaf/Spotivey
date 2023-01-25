import * as React from "react";
import headerSettings from '../Header/headerSettings';
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";
import TutorialContentNav from "./TutorialContentNav";


export default function UserTutorialPage(props) {
    const [username, setUsername] = useState(null)
    const [collapseOpen, setCollapseOpen] = useState([false, false, false, false, false, false, false])

    const navigate = useNavigate()

    useEffect(() => {
        async function userInRoom() {
          fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
              if (data.username === null){
                navigate('/login')
              } else {
                setUsername(data.username)
              }
            });
        }
        userInRoom();
    }, [])

    function handleCollapseClicked (e, indexCollapse) {
      let items = [...collapseOpen];
      items[indexCollapse] =  !items[indexCollapse];
      setCollapseOpen(items)
    }

    const listItem = ['Get User\'s Saved Tracks', 'Get Last Played Tracks', 'Get User\'s Profile',
      'Get User\'s Top Items (Tracks)', 'Get User\'s Top Items (Artists)', 'Get User\'s Followed Artists', 
      'Get User\'s Playlists']

    function renderCollapseItem(index) {
      return(
        <React.Fragment>
          {index === 0 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get a list of the songs saved in the current Spotify user's 'Your Music' library.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You can also set a limit (the amount of data collected) 
                  and the market (only content available in that market will be returned). 
                  In addition, it is specified whether a confirmation of the respondent is desired.
                </h3>
              </React.Fragment>
            : null}
            {index === 1 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get tracks from the current user's recently played tracks.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You can also set a limit (the amount of data collected). 
                  In addition, it is specified whether a confirmation of the respondent is desired.
                </h3>
              </React.Fragment>
            : null}
            {index === 2 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get profile information about the current user.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You get only the information about the user's Spotify subscription level, 
                  the total number of followers and the user's country.
                </h3>
              </React.Fragment>
            : null}
            {index === 3 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get the current user's top tracks based on calculated affinity.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You can also set a limit (the amount of data collected) 
                  and a time range (over which the affinity calculation is performed).
                  In addition, it is specified whether a confirmation of the respondent is desired.
                </h3>
              </React.Fragment>
            : null}
            {index === 4 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get the current user's top artists based on calculated affinity.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You can also set a limit (the amount of data collected) 
                  and a time range (over which the affinity calculation is performed).
                  In addition, it is specified whether a confirmation of the respondent is desired.
                </h3>
              </React.Fragment>
            : null}
            {index === 5 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get the current user's followed artists.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You can also set a limit (the amount of data collected). 
                  In addition, it is specified whether a confirmation of the respondent is desired.
                </h3>
              </React.Fragment>
            : null}
            {index === 6 ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Get a list of the playlists owned or followed by the current Spotify user.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  You can also set a limit (the amount of data collected). 
                  In addition, it is specified whether a confirmation of the respondent is desired.
                </h3>
              </React.Fragment>
            : null}
        </React.Fragment>
      )
    }

    function TutorialContent() {
        return(
            <React.Fragment>
                <div id='requirements-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Requirements
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    Before you can use Spotivey, it is required that you already have an online survey with an ID 
                    number in an online survey application for example LimeSurvey
                  </h3>
                </div>
                <div id='start-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Now it can start - Create first settings
                    </h1>
                  </div>
                  <h3 className='settings-overview-literatur-title'>
                    User's Settings Page (empty)
                  </h3>
                  <h3 class='settings-overview-text'>
                    Now, when you have fulfilled all the requirements, you can take full advantage of Spotivey. 
                    To do this, go to the "Settings" tab and create an initial setting. 
                    This can be adjusted later on.<br></br>
                    Before you have saved your first settings, you will not be shown any settings (see figure 1).
                    To save your first settings, press the "New Setting" button. 
                    This will redirect you to a new page so that a setting can be created and saved later.
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/Empty Settings Page.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 1: Empty User Settings page - no settings have been created before
                      </figcaption>
                  </figure>
                  <h3 className='settings-overview-literatur-title'>
                    "New Settings" Page
                  </h3>
                  <h3 class='settings-overview-text'>
                    In the "New Settings" page, first enter a representative name for the setting. 
                    Also enter the unique ID of the previously created online survey from, for example, LimeSurvey (see figure 2).
                  </h3>
                  <figure class='overview-img'>
                    <img src="../../../static/images/NewSettingsPage.png" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 2: "New Settings" page with representative Name <i>Tutorial-Setting</i> and 
                        unique ID <i>933836</i> of online survey
                    </figcaption>
                  </figure>
                  <h3 class='settings-overview-text'>
                    Furthermore, indicate on the other slides what Spotify information you are interested in.
                    To do this, activate the checkbox provided in each case.
                    The following Spotify information can be collected:
                    <ul class='tutorial-list'>
                      {listItem.map((item, index) => {
                        return(
                          <React.Fragment>
                            <div class='tutorial-list-item-container' onClick={(e) => handleCollapseClicked(e, index)}>
                              <li class='tutorial-list-item'> 
                                {item}
                              </li>
                              <div  className={'tutorial-list-collapse-icon'}>
                                  {collapseOpen[index] ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                              </div>
                            </div>
                            {collapseOpen[index] ? 
                                <div className={'tutorial-list-collapse-item'}>
                                    {renderCollapseItem(index)}
                                </div> : 
                            null}
                          </React.Fragment>
                        )
                      })}
                    </ul>
                    After you have selected a representative name, a unique ID and at least one checkbox, 
                    you can save the setting. To do this, press the Save button. 
                    A dialogue window opens that gives you an overview of the settings you have made (see figure 3).
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/Settings-Dialog.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 3: Dialogue window with exemplary data with representative name <i>Tutorial-Setting</i>, 
                          ID <i>933836</i> and the activated checkboxes <i>Get User's Saved Tracks</i>&nbsp;
                          (limit: <i>33</i>;market: <i>AO</i>) and <i>Get User's Top Items (Tracks)</i> (limit: 
                          <i>50</i>; time_range: <i>long_term</i>).
                      </figcaption>
                  </figure>
                  <h3 className='settings-overview-literatur-title'>
                    User's Settings Page (with setting you have now saved)
                  </h3>
                  <h3 class='settings-overview-text'>
                    If you now confirm the dialogue window, you will be redirected back to the User Settings Page, 
                    where you can now also see the setting you have now saved (see figure 4).
                    Now you have the possibility to change and delete this setting. 
                    You can also generate an end URL for your online survey (e.g. LimeSurvey). 
                    To use these functions, activate the checkbox of the setting.
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/SettingsPage.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 4: User Settings Page with setting you have now saved
                      </figcaption>
                  </figure>
                </div>
                <div id='ready-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Ready to use - Start your first survey and get results
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    Now you are ready to use Spotivey for the first time in an online survey. 
                    To do this, go to your online survey (e.g. LimeSurvey) to the <i>Settings</i> tab and 
                    change the End-Url in the <i>Text Elements</i> tab: 
                    "https://spotiveys.users.ak.tu-berlin.de/?surveyID=&#123;SID&#125;&amp;participant=&#123;SAVEDID&#125;".
                    This End URL will now redirect each participant to Spotivey after they have completed the survey. 
                    Spotivey calls up the setting saved for the Survey ID via the Get parameters and 
                    records the respondent's Spotify information (see figure 5).
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/room.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 5: Results confirmation page of Survey ID 933836 (with Saved Tracks and Top Tracks)
                      </figcaption>
                  </figure>
                </div>
                <div id='results-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Get Results
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    To save the results in a CSV file and explore them for analysis purposes, 
                    you can view the results in a table via the Results tab.
                    The first thing you need to do is sign up to Spotify, 
                    this way you can also get a first impression of the audio features of the tracks. 
                    Press the correct Survey ID beforehand to see the correct results.
                    You will only see results confirmed by the Participant. 
                    Unconfirmed ones will be deleted. If you have disabled confirmation, all data will be taken as confirmed.
                    In our example, you have the possibility to see the results of "Saved Tracks" and "Top Tracks" (see Figure 6).
                    At the same time, in our example we get exemplary results from one participant. 
                    The participant has confirmed all Spotify data (33 Saved Tracks).
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/Results.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 6: Results - Saved Tracks
                      </figcaption>
                  </figure>
                </div>
                <div id='settings-two-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Create Settings (2nd Survey) - Optional
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    Furthermore, Spotivey can be prompted to ask further questions with references to the collected music
                    usage data in a second survey.
                    For this a second setting can be saved under the <i>Settings (2nd Survey)</i> tab similar to the first setting.
                    Here all settings are also displayed in a table, you select the setting and press the <i>New Setting</i> button. 
                    On the following page, you specify an Start-URL to which Spotivey should redirect after collecting the Spotify data. 
                    You can enter the Start-URL directly or generate it using the server, ID and language code of the second survey
                    (see Figure 7).
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/Settings(2nd).png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 7: Settings (2nd Survey) Page
                      </figcaption>
                  </figure>
                  <h3 class='settings-overview-text'>
                    On the following page, you now indicate whether you want to reference results in a second survey and if so, 
                    how many you want to reference. In addition, you specify which data fields should be displayed. 
                    You can also select a music player for the category <i>Tracks</i>. 
                    Finally, you tell Spotivey in which question type the results should be displayed 
                    (single question, matrix question). 
                    If you have specified everything correctly, you can now export a question group directly and 
                    import it later into your online survey application (see Figure 8).
                    When you save the setting, you are done.
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/ReferenceSurvey.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 8: Indicate whether you want to reference results in a second survey
                      </figcaption>
                  </figure>
                </div>
                <div id='import-question-group'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Import Question Group into LimeSurvey
                    </h1>
                  </div>
                  <div className="tutorial-import-question-grid">
                    <div style={{placeSelf: 'center'}}>
                      <h3 class='settings-overview-text'>
                        Now you can import the exported question set into LimeSurvey.
                        If you do not know how to import a question group into LimeSurvey,&nbsp;
                        <a href="https://manual.limesurvey.org/Question_groups_-_introduction" target='_blank'>
                          LimeSurvey's Manual
                        </a> is recommended.
                      </h3>
                      <h3 class='settings-overview-text'>
                        After importing the question group, k-many list entries are stored in a disabled question.
                        Another question can now access this data and the user is able to create a question on his own.
                        In our example you should now have received a question group with one participant ID and 4 questions 
                        (three disabled single questions and one matrix question with reference to them) (see Fig. 9). 
                      </h3>
                    </div>
                    <figure>
                        <img src="../../../static/images/QuestionsGroup.png" width='100%' />
                        <figcaption class='figcaption-text'>
                            Fig. 9: Example Question Group with four disable (one Participant ID) 
                            single questions and one matrix question
                        </figcaption>
                    </figure>
                  </div>
                </div>
                <div id='done-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Done - You have made it
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    You have now finished the tutorial.
                    Now you are able to try out any of Spotiveys functions yourself. 
                    Spotivey wishes you a lot of fun and interesting findings.
                  </h3>
                </div>
                <hr class="solid" id='solid-tutorial-text'></hr>
                <div id='panel-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Connection to panel provider
                    </h1>
                  </div>
                    <h3 class='settings-overview-text'>
                      You can also use Spotivey including a panel provider. 
                      To do this, use the setting as a redirect to the panel provider, 
                      not as a redirect to a second online survey. <br></br>
                      To do this, you just need to change the Start-URL to an URL that redirects you to the panel provider.
                    </h3>
                </div>
            </React.Fragment>
        )
    }

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
                  <div className="tutorial">
                    <div className='tutorial-banner'>
                      <h1 className="tutorial-banner-title">
                          Tutorial
                      </h1>
                      <div className="privacy-banner-subtitle-container">
                          <h2 className="privacy-banner-subtitle">
                            In the following, the use of "Spotiveys" is illustrated with the help of a tutorial. 
                            A basic prior knowledge with the handling of the Spotify API and 
                            the use of an online survey application is assumed.
                          </h2>
                      </div>
                    </div>
                    <div className="tutorial-content-container">
                      <div>
                        <TutorialContentNav/>
                      </div>
                      <div>
                        {TutorialContent()}
                      </div>
                    </div>
                  </div>
              </React.Fragment>
           
    )
}