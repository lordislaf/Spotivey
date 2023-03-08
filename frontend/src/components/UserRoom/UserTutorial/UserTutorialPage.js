import * as React from "react";
import headerSettings from '../Header/headerSettings';
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";
import TutorialContentNav from "./TutorialContentNav";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


export default function UserTutorialPage(props) {
    const [username, setUsername] = useState(null)
    const [collapseOpen, setCollapseOpen] = useState([false, false, false, false, false, false, false])
    const [lang, setLang] = useState('de')

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
            lang ==='de' ? 
            <React.Fragment>
              <h3 class='tutorial-list-collapse-title'>
                Abrufen einer Liste der in der "Lieblingssongs"-Bibliothek des/r aktuellen Spotify-Benutzer*in gespeicherten Songs.
              </h3>
              <h3 class='tutorial-list-collapse-text'>
                Sie können auch ein Limit (die Menge der gesammelten Daten) 
                und den Markt (es werden nur die in diesem Markt verfügbaren Inhalte zurückgegeben) festlegen. 
                Außerdem wird angegeben, ob eine Bestätigung des Befragten erwünscht ist.
              </h3>
            </React.Fragment> :
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
              lang ==='de' ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Abrufen von Titeln aus den zuletzt gespielten Titeln des/der aktuellen Benutzer*in.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  Sie können auch ein Limit (die Menge der gesammelten Daten) festlegen. 
                  Außerdem wird angegeben, ob eine Bestätigung des Befragten erwünscht ist.
                </h3>
              </React.Fragment> :
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
              lang ==='de' ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Abrufen von Profilinformationen über den/die aktuelle Benutzer*in.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  Sie erhalten lediglich Informationen über das Spotify-Abonnement des Nutzers, 
                  die Gesamtzahl der Follower und das Land des Nutzers.
                </h3>
              </React.Fragment> :
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
              lang ==='de' ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Ermittelt die Top-Tracks des/der aktuellen Nutzer*in anhand der berechneten Affinität.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  Sie können auch ein Limit (die Menge der erfassten Daten) und einen Zeitbereich 
                  (über den die Affinitätsberechnung durchgeführt wird) festlegen.
                  Außerdem wird angegeben, ob eine Bestätigung des Befragten gewünscht ist.
                </h3>
              </React.Fragment> : 
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
              lang ==='de' ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Ermittelt die Top-Künster*innen des/der aktuellen Nutzer*in anhand der berechneten Affinität.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  Sie können auch ein Limit (die Menge der erfassten Daten) und einen Zeitbereich 
                  (über den die Affinitätsberechnung durchgeführt wird) festlegen.
                  Außerdem wird angegeben, ob eine Bestätigung des Befragten gewünscht ist.
                </h3>
              </React.Fragment> :
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
              lang ==='de' ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Ermittelt die Künstler*innen, denen der/die aktuelle Benutzer*in folgt.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  Sie können auch ein Limit (die Menge der gesammelten Daten) festlegen. 
                  Außerdem wird angegeben, ob eine Bestätigung des Befragten erwünscht ist.
                </h3>
              </React.Fragment> :
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
              lang ==='de' ? 
              <React.Fragment>
                <h3 class='tutorial-list-collapse-title'>
                  Abrufen einer Liste der Wiedergabelisten, die der/die aktuelle Benutzer*in besitzt oder denen er/sie folgt.
                </h3>
                <h3 class='tutorial-list-collapse-text'>
                  Sie können auch ein Limit (die Menge der gesammelten Daten) festlegen. 
                  Außerdem wird angegeben, ob eine Bestätigung des Befragten erwünscht ist.
                </h3>
              </React.Fragment> :
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

    function TutorialContentEnglish() {
        return(
            <React.Fragment>
                <div id='requirements-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Requirements
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    Using Spotivey requires that you have already created an online survey and 
                    that you have access to the survey administration settings in order to edit the survey's end-URL. <br></br>
                    We recommend to use Spotivey together with LimeSurvey. 
                    However, most other online survey applications should work, too.
                  </h3>
                </div>
                <div id='general-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      General information
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    Spotivey, like the LimeSurvey survey system, runs in any internet browser, 
                    both on desktop PCs and mobile devices. 
                    As shown in Fig. 1, Spotivey is technically framed by two online questionnaires 
                    (but without a problematic 'break' in the user experience). 
                    This technical trick allows respondents to implement music data retrieval at any point in an online survey, 
                    rather than just at the end. 
                    It also allows referencing individually retrieved data in questionnaire 
                    sections that follow the music data retrieval.
                    A unique respondent ID is passed from Limesurvey to Spotivey and back to Limesurvey via a URL parameter, 
                    so that each music transaction record can later be reliably linked to both questionnaire records. 
                    A permanently programmed data protection notice before the music data retrieval also protects the 
                    operators of the survey and the server application from a legal point of view on the one hand, 
                    and on the other hand it seems to be necessary from a research ethics point of view to inform the 
                    respondents of exactly which music data will be collected, analysed and stored. 
                    Optionally, the researcher can also set that the test persons must explicitly confirm all individual 
                    music transaction data records (e.g. individual titles, artists or playlists) directly after retrieval 
                    with regard to a specific question that can be formulated freely. 
                    In this way, the problem of multiple profile use can be addressed.
                    In general, Spotivey has been programmed in such a way that the few personal data of the user account 
                    (in the case of Spotify: name, email address and year of birth) 
                    are not retrieved and linked to the questionnaire data. 
                    In this way, the research ethics requirement is upheld that respondents themselves decide 
                    which personal data they want to make available to the research.
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/imagesTutorial/Abb1.svg" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 1: Practical functional structure of the Spotivey application
                      </figcaption>
                  </figure>
                  <h3 class='settings-overview-text'>
                    The functionality of the Spotivey app can be divided into two parts: 
                    The <i>backend</i>, which is the area that researchers use to plan the study and manage and 
                    retrieve the results, and the <i>frontend</i>, which is the area that is visible to respondents 
                    in the browser and allows them to donate their digital music usage data to the researchers 
                    as part of the online survey.
                  </h3>
                </div>
                <div id='retrieval-settings-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Retrieval-Settings
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    The first step is to create a Retrieval Profile that links to an existing Limesurvey questionnaire 
                    via the study name and the Limesurvey questionnaire ID. 
                    This initial questionnaire should be designed in such a way that participants are informed on 
                    the start page that the study will retrieve survey data as well as music data from the music 
                    streaming user account and, in accordance with the European General Data Protection Regulation, 
                    also include the necessary general data protection notice on the purposes and storage of the data. 
                    Furthermore, the following link must be set in Limesurvey as the end URL of the questionnaire:
                  </h3>
                  <h3 class='settings-overview-text'>
                    https://spotivey.users.ak.tu-berlin.de/?surveyID=&#123;SID&#125;&participant=&#123;SAVEDID&#125;&lang=&#123;LANG&#125;
                  </h3>
                  <h3 class='settings-overview-text'>
                    This ensures that the Spotivey App is automatically started after the input questionnaire 
                    is completed and that all necessary information 
                    (study ID, respondent ID and survey language) can first be 'passed through' to the Spotivey App and 
                    later to the follow-up questionnaire.
                  </h3>
                  <h3 class='settings-overview-text'>
                    The second part of the configuration of a Retrieval Profile to be done in the backend concerns 
                    the question of what kind of information the Spotivey app should specifically retrieve from 
                    the Spotify profiles of the survey participants (see Fig. 2 left) and whether and with what text 
                    they are prompted. 
                    These individual possibilities and options for data retrieval 
                    (most recently listened to music tracks, most listened to songs or artists, followed artists or 
                    created playlists) are explained as comprehensively as possible. 
                    Checkboxes, slides and drop-down menus can be used to confirm and set the individual functions 
                    (see fig. 2, bottom right). As soon as these settings have been made, 
                    the online survey study with integrated music data retrieval can in principle be started immediately.
                  </h3>
                  <figure class='overview-img'>
                    <div className="grid-abb2-tutorial">
                      <img src="../../../static/images/imagesTutorial/Abb5_1.svg" width='100%' /*height={'50%'}*/ />
                      <div>
                        <img src="../../../static/images/imagesTutorial/Abb5_2.png" width='40%' />
                        <img src="../../../static/images/imagesTutorial/Abb5_3.png" width='100%' />
                      </div>
                    </div>
                    <figcaption class='figcaption-text'>
                      Fig. 2: Spotivey - New Retrieval Profile with setting options (left); Main Settings (top right); 'Get User's Saved
                      Tracks' sample setting (bottom right)
                    </figcaption>
                  </figure>
                  <h3 class='settings-overview-text'>
                    In principle, Spotivey itself can conduct any number of such studies at the same time and manage 
                    any number of different users; for this purpose, all Retrieval Profiles already configured 
                    on the server are displayed compactly with the corresponding settings in an overview table for 
                    logged-in users (see fig. 3, left). 
                    The profile settings can be adjusted at any time, typically after a pretest with corresponding 
                    feedback from the respondents, but technically it is even possible during an ongoing study.
                  </h3>
                  <figure class='overview-img'>
                    <div className="grid-abb3-tutorial">
                      <img src="../../../static/images/imagesTutorial/Abb6_1.svg" width='100%' />
                      <img src="../../../static/images/imagesTutorial/Abb6_2.png" width='100%' />
                    </div>
                    <figcaption class='figcaption-text'>
                        Fig. 3: Spotivey - Retrieval Profile overview (left); confirmation function (right)
                    </figcaption>
                  </figure>
                </div>
                <div id='spotify-information-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Spotify information that can be configured
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
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
                  </h3>
                </div>
                <div id='followup-settings-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      FollowUp-Settings
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    If researchers want respondents to be presented with a follow-up questionnaire 
                    after the music data retrieval including even specific questions related to the 
                    retrieved music data, they may optionally configure this in the FollowUp-Settings of Spotivey.
                    All they have to do is enter the start URL of the follow-up questionnaire. 
                    Spotivey then forwards each respondent to this URL after retrieving the music data. 
                    In this way, for example, the use of a commercial panel provider for respondent recruitment 
                    can also be combined with the use of Spotivey, as technically these usually rely on a dedicated 
                    landing page for calculating the incentive after completing an online questionnaire. 
                    In most cases, however, it will be the URL of a follow-up questionnaire programmed 
                    in advance with Limesurvey, which is automatically supplemented by Spotivey with the 'to-be-satisfied' 
                    parameters from the input questionnaire. 
                    For this follow-up questionnaire, the option "Welcome page" in Limesurvey should be switched off, 
                    so that there is a visually 'seamless' transition from the music data retrieval to the 
                    follow-up questions for the respondents.
                  </h3>
                  <h3 class='settings-overview-text'>
                    If researchers want to directly ask questions about the retrieved music data (such as titles or artists) 
                    in the follow-up questionnaire, Spotivey supports this with additional functions:
                    On the one hand, the researcher can set in Spotivey how many and which types of music 
                    transaction data records should be directly included in the follow-up questionnaire. 
                    These are then also forwarded to Limesurvey as parameters via the URL, so that this 
                    information can be accessed in the form of variables when programming the follow-up questionnaire.
                  </h3>
                  <h3 class='settings-overview-text'>
                    In order to ease this not-so-simple creation of questions with reference to the retrieved music, 
                    Spotivey also creates automatically pre-programmed LimeSurvey questions on request, 
                    either of the single question type or of the matrix question type.  
                    These then directly read out the variable contents configured for transmission and write 
                    them into the question text, either in the form of text modules, or even in the form of a 
                    small web player that makes the respective titles playable again and visually presents the 
                    cover of the respective music release.
                    These prefabricated questions can then be exported from Spotivey in the form of an XML question group file, 
                    imported into the LimeSurvey follow-up questionnaire and then adapted, 
                    redesigned and extended with regard to the specific needs of the respective survey (see fig. 4 right).
                  </h3>
                  <figure class='overview-img'>
                    <div className="grid-abb3-tutorial">
                      <img src="../../../static/images/imagesTutorial/Abb7_1.svg" width='100%' />
                      <img src="../../../static/images/imagesTutorial/Abb7_2.png" width='100%' />
                    </div>
                      <figcaption class='figcaption-text'>
                          Fig. 4: Spotivey - FollowUp-Setting (left); Question group configuration (right)
                      </figcaption>
                  </figure>
                </div>
                <div id='results-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Results Page
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    On the Results Page of the backend, researchers can finally get an overview of the music data 
                    donations made so far for each Retrieval Profile created, delete them (e.g. after a pretest) 
                    or export them as a CSV file including the participant ID for the purpose of data linkage with 
                    the questionnaire data from Limesurvey (see Fig. 5). 
                    In order to give researchers a quick overview of whether and which music data has already 
                    been collected, a preview of 16 cover artworks of the individual Spotify data donations is displayed. 
                    As soon as the researcher decides on one of the Retrieval Profiles, all data already 
                    collected by the respective study is displayed in a clear table (cf. Figure 5). 
                    Here, up to 100 results can be displayed on one page and the study participants can browse 
                    through all results. This preview of results can also be done via mobile devices; 
                    the only requirement is a browser-based login to the Spotivey backend area.
                  </h3>
                  <figure class='overview-img'>
                      <img src="../../../static/images/imagesTutorial/Abb8.svg" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 5: Spotivey - Results Page
                      </figcaption>
                  </figure>
                </div>
                <div id='testphase-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Test and field phase
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    As soon as at least the initial questionnaire has been generated in LimeSurvey and the corresponding 
                    Retrieval Profile has been configured in Spotivey, researchers can conduct the first test trials. 
                    For this, the initial questionnaire must at minimum be activated in Limesurvey so that all necessary 
                    parameters are forwarded to Spotivey (in test mode, Limesurvey does not yet transmit URL parameters). 
                    If the 'passing through' of the data to the follow-up questionnaire, 
                    including possible questions with reference to individual data records, is also to be tested, 
                    this must first be activated in Limesurvey. 
                    The results generated in such test runs can be easily deleted after the test phase via the user 
                    profile on the results page using a button. After a successful test phase, 
                    researchers can start the actual field phase, typically by deactivating both questionnaires once in 
                    Limesurvey and activating them again, which also deletes the survey data accumulated there during testing. 
                  </h3>
                  <h3 class='settings-overview-text'>
                    For the field phase, it should be noted that the Spotify API is accessed by the Spotivey app 
                    via a so-called developer account, which is subject to a user limit for private developers 
                    (maximum of 25 users at any one time). 
                    This limit has already been lifted for the university account of the authors of this article, 
                    but would still have to be negotiated with the Spotify company for the installation of Spotivey 
                    on its own server with reference to research purposes (if at all necessary). 
                    In practice, however, we have never come up against this limit, even with an ordinary developer account, 
                    as the API data retrieval for a single respondent usually only takes a maximum of about 10 seconds.
                  </h3>
                </div>
                <div id='study-participants-tutorial'>
                  <div className='settings-overview-title'>
                    <h1 className="tutorial-content-title">
                      Spotivey workflow from the perspective of study participants
                    </h1>
                  </div>
                  <h3 class='settings-overview-text'>
                    In order to avoid unnecessary dropouts, we strongly advise researcher to raise awareness 
                    of participants in online survey studies employing  Spotivey already during the recruitment 
                    process that a personal Spotify account will be a mandatory prerequisite for study participation 
                    and that, in addition to the survey, the study will also include retrieval of certain information 
                    from the participants personal Spotify account.
                    Likewise, the same facts should be pointed out on the entry page of the questionnaire. 
                    The explanations within the legally required data protection statement on data collection, 
                    data storage and data use that are displayed on the questionnaire landing page should also 
                    explicitly cover the music data to be retrieved.
                    In addition, when programming the questionnaire, a short text note should be 
                    included at the end of the questionnaire, which makes the transition from the initial 
                    questionnaire to Spotivey as 'seamless' as possible for the respondents 
                    ("As announced at the beginning, we would like to access your Spotify account in a moment, 
                    for which we will first ask you for permission in the form of your account data on the next screen").
                  </h3>
                  <h3 class='settings-overview-text'>
                    To avoid duplicating respondent data, Spotivey uses the respondent ID transmitted via URL to 
                    compare whether music transaction data has already been retrieved for this respondent. 
                    If the ID is already available, the Spotify login query does not work and a corresponding 
                    error message appears - this effectively prevents any manipulation of the data record that 
                    would otherwise be technically possible by pressing the reload button in the browser.
                  </h3>
                  <h3 class='settings-overview-text'>
                    Now a screen with the Spotivey logo appears and, with the help of a permanently programmed 
                    text in the respective survey language, respondents are informed transparently in the sense 
                    of informed consent about which specific data are to be retrieved from their own Spotify 
                    account right now and that this data will later be merged with the rest of the questionnaire data 
                    (which could, of course, also be personal) - in the sense of transparency, the app displays a list 
                    of exactly those retrieval options that were set by the study operators (see Fig. 6).
                  </h3>
                  <figure class='overview-img'>
                    <img src="../../../static/images/imagesTutorial/Abb9.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 6: Spotivey - Privacy Notice (here: only favourite songs are retrieved, and german language)
                      </figcaption>
                  </figure>
                  <h3 class='settings-overview-text'>
                    The respondents are then asked to authorise the process using the Spotify login. 
                    The data retrieval from the Spotify account then begins, which typically takes a few 
                    seconds and is therefore visualised with a small animation and accompanied by the request 
                    not to close the browser window (see Fig. 7). 
                    At this moment, only the data to which consent was explicitly given in the course of the 
                    data protection notice is retrieved; in particular, no personal data from the account is saved, 
                    although this would be technically possible.
                  </h3>
                  <figure class='overview-img'>
                    <img src="../../../static/images/imagesTutorial/Abb10.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 7: Spotivey - Data donation of favourite songs from the subjects' point of view
                      </figcaption>
                  </figure>
                  <h3 class='settings-overview-text'>
                    If this has been configured accordingly in the Retrieval Profile, 
                    the respondents are now given the opportunity to confirm each individual music record 
                    retrieved from their Spotify account with regard to a question previously configured by 
                    the study participants. Typically, this will be a request to confirm only those records 
                    that one has actually listened to oneself. In this way, the problem of the often occurring 
                    multiple use of Spotify accounts by several people can be solved. Records rejected during 
                    this process are now immediately deleted from the Spotivey database again, so that the researcher(s) 
                    do not have access to them at any time. 
                    This seemed an important measure, as otherwise data from third parties who may have not agreed 
                    with the analysis would have ended up in the hands of the researchers.
                  </h3>
                  <h3 class='settings-overview-text'>
                    After this confirmation dialogue, either the survey is over and a notice appears that the 
                    browser window can be closed, or the pre-configured follow-up questionnaire appears directly, 
                    in which detailed questions about individual retrieved data sets (such as music titles) are 
                    optionally asked. To create a transition that is as 'seamless' as possible, we also recommend 
                    programming a short text note here ("Thank you very much for your music data donation, 
                    which will help us a lot in our research. Now we have a few more questions about your personal music use.").
                  </h3>
                  <h3 class='settings-overview-text'>
                    The follow-up questions can refer to the retrieved music data in different ways. 
                    On the one hand, it is possible to refer to individual data fields such as title, artist, 
                    music label, etc., but on the other hand, a small web player can also be integrated that 
                    displays the same information but additionally offers the option to briefly play the respective 
                    title again. Furthermore, the references can be made either in individual questions, so that a 
                    single question is asked for each data set (e.g. artist) (cf. Figure 11), or in the form of 
                    so-called matrix questions, in which the same question is asked for a larger number of data sets 
                    (e.g. music titles) (cf. Figure 12). The further design of the follow-up questionnaire is up 
                    to the person conducting the survey. However, we recommend that at the end of the survey, 
                    a note is given again that the consent given to store and analyse all donated music and 
                    questionnaire data can be revoked at any time by notifying the study operator, which then leads to 
                    data deletion accordingly.
                  </h3>
                  <figure class='overview-img'>
                  <img src="../../../static/images/imagesTutorial/Abb11.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 8: Example of a single question in the follow-up questionnaire with reference to retrieved music data
                      </figcaption>
                  </figure>
                  <figure class='overview-img'>
                  <img src="../../../static/images/imagesTutorial/Abb12.png" width='100%' />
                      <figcaption class='figcaption-text'>
                          Fig. 9: Example of a matrix question in the follow-up questionnaire with reference to retrieved music data
                      </figcaption>
                  </figure>
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
            </React.Fragment>
        )
    }

    function TutorialContentGerman() {
      return(
          <React.Fragment>
              <div id='requirements-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Anforderungen
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Die Verwendung von Spotivey setzt voraus, dass Sie bereits eine Online-Umfrage erstellt haben und 
                  dass Sie Zugang zu den Einstellungen der Umfrageverwaltung haben, 
                  um die End-URL der Umfrage zu bearbeiten. <br></br>
                  Wir empfehlen, Spotivey zusammen mit LimeSurvey zu verwenden. 
                  Die meisten anderen Online-Umfrageanwendungen sollten jedoch ebenfalls funktionieren.
                </h3>
              </div>
              <div id='general-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Allgemeine Informationen
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Spotivey läuft ähnlich wie das LimeSurvey-Befragungssystem in jedem Internetbrowser, und das sowohl
                  auf dem Desktop-PC als auch auf Mobilgeräten. Wie in Abb. 1 ersichtlich, wird Spotivey aus technischer
                  Perspektive von zwei Online Fragebögen umrahmt (allerdings ohne, dass es dabei für User*innen zu
                  einem problematischen ‚Bruch‘ in der Nutzerführung kommt). Dieser technische Trick ermöglicht es
                  Befragenden, den Musikdatenabruf an beliebiger Stelle einer Online-Befragung, anstatt nur am Ende zu
                  implementieren. Ferner ermöglicht er die Bezugnahme auf einzeln abgerufene Daten in Fragebogenabschnitten,
                  welche auf den Musikdatenabruf folgen. Eine einzigartige Proband*innen ID wird dazu über
                  einen URL-Parameter von Limesurvey nach Spotivey und wieder nach Limesurvey ‚durchgereicht‘, sodass
                  jeder Musiktransaktionsdatensatz später zuverlässig mit den beiden Fragebogendatensätzen verbunden
                  werden kann. Ein fest einprogrammierter Datenschutzhinweis vor dem Musikdatenabruf sichert
                  ferner einerseits juristisch die Betreibenden der Befragung und der Serverapplikation ab, anderseits erscheint
                  es ohnehin forschungsethisch geboten, die Proband*innen darauf hinzuweisen, welche Musikdaten
                  genau erfasst, analysiert und gespeichert werden. Der/die Forschende kann optional zusätzlich
                  einstellen, dass Proband*innen alle einzelnen Musiktransaktionsdatensätze (etwa: einzelne Titel,
                  Künstler*innen oder Playlists) direkt nach dem Abruf explizit im Hinblick auf eine bestimmte frei formulierbare
                  Frage bestätigen müssen. Auf diese Weise kann etwa ein typisches Profilmehrfachnutzungsproblem
                  adressiert werden. Generell ist Spotivey ferner so programmiert worden,
                  dass die wenigen personenbezogenen Daten des Nutzeraccounts (im Falle von Spotify: Name,
                  Emailadresse und Geburtsjahr) keinesfalls abgerufen und mit den Fragebogendaten verknüpft werden.
                  Auf diese Weise wird der forschungsethische Anspruch gewahrt, dass in jedem Fall Befragte selbst
                  entscheiden, welche personenbezogenen Daten sie der Forschung zur Verfügung stellen wollen.
                </h3>
                <figure class='overview-img'>
                    <img src="../../../static/images/imagesTutorial/Abb1.svg" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 1: Praktischer Funktionsaufbau der Spotivey Applikation
                    </figcaption>
                </figure>
                <h3 class='settings-overview-text'>
                  Die Funktionsweise der Spotivey App kann funktional in zwei Aspekte unterteilt werde: Das <i>Backend</i>,
                  also der Bereich welcher Forschenden zur Studienplanung und Verwaltung und Abruf der Ergebnisse
                  dient, sowie das <i>Frontend</i>, der Bereich der für Befragte im Browser sichtbar ist und Ihnen ermöglicht,
                  ihre digitalen Musiknutzungsdaten im Rahmen der Online-Befragung den Forschenden zu spenden.
                </h3>
              </div>
              <div id='retrieval-settings-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Retrieval-Profil-Einstellungen
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Der erste Schritt ist die Erstellung eines Retrieval-Profils welches über den Studienname und die Limesurvey
                  Fragebogen ID eine Verknüpfung mit einem bereits bestehenden Limesurvey-Fragebogen herstellt.
                  Dieser Eingangsfragebogen sollte so gestaltet werden, dass bereit auf der Startseite die Teilnehmenden
                  aufgeklärt werden, dass die Studie neben Befragungsdaten auch Musikdaten aus dem Musikstreamingnutzerkonto
                  abrufen wird und gemäß der europäischen Datenschutzgrundverordnung auch
                  den notwendigen allgemeinen Datenschutzhinweis zu Zwecken und Speicherung der Daten beinhalten.
                  Ferner muss der folgende Link in Limesurvey als End-URL des Fragebogens eingestellt werden:
                </h3>
                <h3 class='settings-overview-text'>
                  https://spotivey.users.ak.tu-berlin.de/?surveyID=&#123;SID&#125;&participant=&#123;SAVEDID&#125;&lang=&#123;LANG&#125;
                </h3>
                <h3 class='settings-overview-text'>
                  Dies sorgt dafür, dass nach Ausfüllen des Eingangsfragebogens automatisch die Spotivey App gestartet
                  wird und dass alle notwendigen Informationen (Studien-ID, Befragten-ID und Befragungssprache) erst
                  zur Spotivey App und später zum Anschlussfragebogen ‚durchgereicht‘ werden können.
                </h3>
                <h3 class='settings-overview-text'>
                  Der zweite Teil der im Backend vorzunehmenden Konfiguration eines Retrieval-Profils betrifft die
                  Frage, welche Art von Informationen die Spotivey-Anwendung aus den Spotify-Profilen der Umfrageteilnehmer*
                  innen konkret abrufen soll (siehe Abb. 2 links) und ob und mit welchem Text diese aufgefordert
                  werden. Diese einzelnen Möglichkeiten und Optionen des Datenabrufs (zuletzt gehörte Musiktracks,
                  die meistgehörten Songs oder Artists, die gefolgten Interpreten*innen oder die erstellten Playlists)
                  werden dabei jeweils möglichst umfassend erklärt. Durch Checkboxen, Slides und Dropdownmenüs
                  lassen sich die einzelnen Funktionen bestätigen und einstellen (siehe Abb. 2 rechts unten). Sobald
                  diese Einstellungen getätigt wurden, kann die Online-Befragungsstudie mit integriertem Musikdatenabruf
                  im Prinzip sofort gestartet werden.
                </h3>
                <figure class='overview-img'>
                  <div className="grid-abb2-tutorial">
                    <img src="../../../static/images/imagesTutorial/Abb5_1.svg" width='100%' /*height={'50%'}*/ />
                    <div>
                      <img src="../../../static/images/imagesTutorial/Abb5_2.png" width='40%' />
                      <img src="../../../static/images/imagesTutorial/Abb5_3.png" width='100%' />
                    </div>
                  </div>
                  <figcaption class='figcaption-text'>
                    Fig. 2: Spotivey – Neues Retrieval-Profil mit Einstellmöglichkeiten (links); main Settings (rechts oben); `Get User‘s Saved
                            Tracks`-Beispiel-Einstellung (rechts unten)
                  </figcaption>
                </figure>
                <h3 class='settings-overview-text'>
                  Spotivey selbst kann grundsätzlich beliebig viele solcher Studien gleichzeitig durchführen und beliebig
                  viele unterschiedliche Nutzer*innen verwalten, dazu werden eingeloggten Nutzer*innen alle auf dem
                  Server bereits konfigurierten Retrieval-Profile kompakt mit den dazugehörigen Einstellungen in einer
                  Übersichtstabelle dargestellt (siehe Abb. 3 links). Die Profileinstellungen können jederzeit angepasst
                  werden, typischerweise nach einem Pretest mit entsprechenden Rückmeldungen der Befragten, es ist
                  rein technisch allerdings sogar während einer bereits laufenden Studie möglich.
                </h3>
                <figure class='overview-img'>
                  <div className="grid-abb3-tutorial">
                    <img src="../../../static/images/imagesTutorial/Abb6_1.svg" width='100%' />
                    <img src="../../../static/images/imagesTutorial/Abb6_2.png" width='100%' />
                  </div>
                  <figcaption class='figcaption-text'>
                      Fig. 3: Spotivey – Retrieval-Profil-Übersicht (links); Bestätigungs-Funktion (rechts)
                  </figcaption>
                </figure>
              </div>
              <div id='spotify-information-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Spotify Informationen, die konfiguriert werden können
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Die folgenden Spotify-Informationen können erfasst werden:
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
                </h3>
              </div>
              <div id='followup-settings-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    FollowUp-Einstellungen
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Soll nach dem Musikdatenabruf den Befragten noch ein Anschlussfragebogen präsentiert werden, der
                  gegebenenfalls sogar Fragen mit Bezug auf die abgerufenen Musikdaten stellt, können Forschende dies
                  optional in den FollowUp-Einstellungen von Spotivey konfigurieren. Dazu muss lediglich die Start-URL
                  des Anschlussfragebogens hinterlegt werden. Spotivey leitet dann jede/n Proband*in nach dem Musikdatenabruf
                  an diese URL weiter. Auf diese Weise lässt sich zum Beispiel auch die Nutzung eines kommerzielle
                  Panel Providers zur Befragtenrekrutierung mit der Verwendung von Spotivey kombinieren, da
                  diese technisch meist auf eine dedizierte landing page zur Berechnung der Incentivierung nach Ausfüllen
                  eines Online-Fragebogens angewiesen sind. In den meisten Fällen wird es sich jedoch um die URL
                  eines vorab mit Limesurvey programmierten Anschlussfragebogen handeln, welche von Spotivey automatisch
                  um die ‚durchzureichenden‘ Parameter aus dem Eingangsfragebogen ergänzt wird. Für diesen
                  Anschlussfragebogen sollte die Option „Willkommensseite“ in Limesurvey abgeschaltet werden, damit
                  es für die Befragten zu einem visuell ‚bruchlosen‘ Übergang vom Musikdatenabruf zu den Anschlussfragen
                  kommt.
                </h3>
                <h3 class='settings-overview-text'>
                  Wenn nun der Wunsch besteht, im Anschlussfragebogen unmittelbar Fragen zu den abgerufenen Musikdaten
                  (etwa Titeln oder Künstler*innen) zu stellen, so unterstützt dies Spotivey durch weitere Funktionen:
                  Einerseits kann dazu der/die Forschende in Spotivey einstellen, wie viele und welche Typen von
                  Musiktransaktionsdatensätze im Anschlussfragebogen direkt eingebunden werden sollen. Diese werden
                  dann ebenfalls über die URL als Parameter an Limesurvey weitergeleitet, so dass auf diese Informationen
                  bei der Programmierung des Anschlussfragebogens in Form von Variablen zugegriffen werden
                  kann.
                </h3>
                <h3 class='settings-overview-text'>
                  Um diese nicht ganz einfache Erstellung von Fragen mit Referenz auf die abgerufenen Musikdaten für
                  Studiendurchführende so einfach wie möglich zu gestalten, erstellt Spotivey auf Wunsch zusätzlich automatisch
                  vorprogrammierte LimeSurvey-Fragen, entweder vom Typ Einzelfrage oder vom Typ Matrixfragen,
                  welche direkt die zur Übertragung konfigurierten Variableninhalte auslesen und in den Fragetext
                  schreiben, entweder in Form von Textbausteinen, oder sogar in Form eines kleinen Webplayers,
                  der die jeweiligen Titel noch einmal abspielbar macht und das Cover des jeweiligen Musikreleases dazu
                  visuell präsentiert. Diese vorkonfektionierten Fragen können dann in Form einer XML-Fragegruppendatei
                  aus Spotivey exportiert, in den LimeSurvey-Anschlussfragebogen importiert und dort dann noch
                  im Hinblick auf spezifischen Bedürfnisse der jeweiligen Befragung anpasst, umgestaltet und erweitert
                  werden (siehe Abb. 4 rechts).
                </h3>
                <figure class='overview-img'>
                  <div className="grid-abb3-tutorial">
                    <img src="../../../static/images/imagesTutorial/Abb7_1.svg" width='100%' />
                    <img src="../../../static/images/imagesTutorial/Abb7_2.png" width='100%' />
                  </div>
                    <figcaption class='figcaption-text'>
                        Fig. 4: Spotivey – Retrieval-Profil-Übersicht (links); Bestätigungs-Funktion (rechts)
                    </figcaption>
                </figure>
              </div>
              <div id='results-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Ergebnisseite
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Auf der Ergebnis-Seite des Backends können Forschende schließlich während und nach Ablauf einer
                  Studie zu jedem erstellten Retrieval-Profil eine Übersicht über die bisher erfolgten Musikdatenspenden
                  bekommen, diese löschen (z. B. nach Ablauf eines Pretests) oder aber als CSV-Datei inklusive der Proband*
                  innen-ID zwecks Data Linkage mit den Fragebogendaten aus Limesurvey exportieren (siehe Abb.
                  5). Um Forschenden schnell einen Überblick zu geben, ob und welche Musikdaten bereits erfasst worden
                  sind, wird eine Vorschau aus jeweils 16 Cover-Artworks der einzelnen Spotify-Datenspenden abgebildet.
                  Sobald der/die Forschende sich für eines der Retrieval-Profile entscheidet, werden alle bereits
                  von der jeweiligen Studie gesammelten Daten in einer übersichtlichen Tabelle dargestellt (vgl. Abbildung
                  5). Hier können bis zu 100 Resultate auf einer Seite angezeigt werden und die Studiendurchführende
                  können durch alle Ergebnisse durchblättern. Diese Ergebnisvorschau kann auch über mobile Endgeräte
                  erfolgen, Voraussetzung ist lediglich ein browserbasiertes Login in den Spotivey Backend-Bereich.
                </h3>
                <figure class='overview-img'>
                    <img src="../../../static/images/imagesTutorial/Abb8.svg" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 5: Spotivey - Ergebnisseite
                    </figcaption>
                </figure>
              </div>
              <div id='testphase-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Test- and Feldphase
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Sobald zumindest der Eingangsfragebogen in LimeSurvey generiert und das dazugehörige Abrufprofil
                  in Spotivey konfiguriert wurde, können Forschende erste Testversuche durchführen. Dafür muss mindestens
                  der Eingangsfragebogen in Limesurvey aktiviert werden, damit alle notwendigen Parameter an
                  Spotivey weitergeleitet werden (im Testmodus überträgt Limesurvey noch keine URL-Parameter). Soll
                  ebenfalls das ‚Durchreichen‘ der Daten an den Anschlussfragebogen inklusive möglicher Fragen mit
                  Bezugnahme zu einzelnen Datensätzen getestet werden, muss auch dieser dafür zunächst in Limesurvey
                  aktiviert werden. Die in solchen Testläufen generierten Ergebnisse können nach der Testphase über das
                  Nutzer*innenprofil auf der Results-Seite mittels eines Buttons problemlos gelöscht werden. Nach erfolgreicher
                  Testphase können Forschende die eigentliche Feldphase beginnen, typischerweise indem in
                  Limesurvey beide Fragebögen einmal deaktiviert und wieder aktiviert werden, was auch die dort während
                  des Testens angefallenen Befragungsdaten löscht.
                </h3>
                <h3 class='settings-overview-text'>
                  Für die Feldphase zu beachten ist, dass die Spotify API von der Spotivey App über einen sogenannten
                  Developer-Account angesteuert wird, der für private Entwickler einem Nutzerlimit unterliegt (zeitgleich
                  maximal 25 User). Diese Limitierung ist beim Universitäts-Account der Autoren dieses Artikels bereits
                  aufgehoben worden, müsste jedoch bei der Installation von Spotivey auf einem eigenem Server mit der
                  Firma Spotify unter Bezugnahme auf Forschungszwecke (falls überhaupt notwendig) noch ausgehandelt
                  werden. In der Praxis stießen wir jedoch auch mit einem gewöhnlichen Developer-Account bislang niemals
                  an dieses Limit, da der API-Datenabruf für eine einzelne Befragtenperson in der Regel nur maximal
                  ca. 10 Sekunden dauert.
                </h3>
              </div>
              <div id='study-participants-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Spotivey-Workflow aus Sicht von Studienteilnehmer*innen
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Um unnötige Abbrüche zu vermeiden raten wir dazu, Teilnehmende von Online-Befragungsstudien die
                  sich Spotivey bedienen bereits während der Rekrutierung auf Webseiten oder per E-Mail darauf aufmerksam
                  zu machen, dass für die Durchführung ein persönlicher Spotify-Account zwingende Voraussetzung
                  ist und die Studie neben der Befragung auch den Abruf bestimmter Informationen aus diesem
                  Account beinhaltet. Ebenso sollte auf der Eingangsseite des Fragebogens auf dieselben Tatsachen hingewiesen
                  werden. Auch die Ausführungen innerhalb der gesetzlich notwendigen, zustimmungspflichtigen
                  Datenschutzerklärung zu Datenerfassung, Datenspeicherung und Datenverwendung sollten sich explizit
                  ebenso auf die abzurufenden Musikdaten erstrecken. Darüber hinaus sollte bei der Fragebogenprogrammierung
                  ein kurzer Texthinweis am Ende des Fragebogens eingebaut werden, welcher den
                  Übergang vom Eingangsfragebogen zu Spotivey möglichst ‚bruchlos‘ für die Befragten gestaltet
                  („Gleich möchten wir wie eingangs angekündigt auf Ihr Spotify-Konto zugreifen, dazu werden wir Sie
                  gleich auf dem nächsten Bildschirm zunächst um Erlaubnis in Form Ihrer Accountdaten bitten.“).
                </h3>
                <h3 class='settings-overview-text'>
                    Damit keine Befragtendaten doppelt erfasst werden, vergleicht Spotivey direkt nach dem Start zunächst
                    mittels der per URL übertragenen Befragten-ID ob zu dieser bereits Musiktransaktionsdaten abgerufen
                    wurden. Ist die ID schon vorhanden, funktioniert die Spotify Login-Abfrage nicht und es erscheint eine
                    entsprechende Fehlermeldung – dies verhindert effektiv etwaige Manipulationen des Datensatzes die
                    sonst durch das Drücken des Reload-Buttons im Browser technisch möglich wären.
                </h3>
                <h3 class='settings-overview-text'>
                  Nun erscheint ein Bildschirm mit dem Spotivey Logo und es wird mit Hilfe eines fest einprogrammierten
                  Texts in der jeweiligen Befragungssprache im Sinne des Informed Consent transparent darüber aufgeklärt,
                  welche Daten konkret jetzt gleich vom eigenen Spotify-Account abgerufen werden sollen und dass
                  diese Daten mit den restlichen Fragebogendaten (die natürlich auch personenbezogen sein könnten) später
                  fusioniert werden – dabei zeigt die App im Sinne der Transparenz eine Liste genau jener Abrufoptionen
                  an, welche durch die Studienbetreibenden eingestellt wurden (siehe Abb. 6).
                </h3>
                <figure class='overview-img'>
                  <img src="../../../static/images/imagesTutorial/Abb9.png" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 6: Spotivey - Datenschutzhinweis (hier: nur Lieblingssongs werden abgerufen)
                    </figcaption>
                </figure>
                <h3 class='settings-overview-text'>
                  Daraufhin werden die Befragten zur Autorisation des Vorgangs mit Hilfe des Spotify-Login gebeten.
                  Anschließend beginnt dann der Datenabruf aus dem Spotify-Account, welcher typischerweise einige
                  Sekunden dauert und darum visuell mit einer kleinen Animation visualisiert wird und durch die Bitte
                  begleitet ist, nicht das Browserfenster zu schließen (siehe Abb. 7). Es werden in diesem Moment nur
                  jene Daten von Spotify angefordert, zu denen auch im Zuge des Datenschutzhinweises Einverständnis
                  gegeben wurde, insbesondere werden dabei keine personenbezogenen Daten aus dem Account abgespeichert,
                  obwohl dies rein technisch durchaus möglich wäre.
                </h3>
                <figure class='overview-img'>
                  <img src="../../../static/images/imagesTutorial/Abb10.png" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 7: Spotivey - Datenspende der Lieblingssongs aus Sicht der Proband*innen
                    </figcaption>
                </figure>
                <h3 class='settings-overview-text'>
                  Wurde dies im Retrieval-Profil entsprechend konfiguriert bekommen die Befragten jetzt direkt im Anschluss
                  die Möglichkeit, jeden einzelnen abgerufenen Musikdatensatz aus ihrem Spotify-Konto im Hinblick
                  auf eine durch die Studiendurchführenden vorher konfigurierte Frage zu bestätigen. Typischerweise
                  wird dies die Bitte sein, nur diejenigen Datensätze zu bestätigen, die man selbst tatsächlich gehört
                  hat. Auf diesem Wege kann das Problem der oft vorkommenden Mehrfachnutzung von Spotify-Accounts
                  durch mehrere Personen gelöst werden. Bei diesem Vorgang abgelehnte Datensätze werden jetzt
                  unmittelbar aus der Spotivey-Datenbank wieder gelöscht, so dass der/die Forschenden zu keinem Zeitpunkt
                  Zugriff darauf haben. Dies erschien eine wichtige Maßnahme, da ansonsten Daten von Dritten,
                  die möglicherweise nicht mit der Analyse einverstanden sind, in die Hände der Forschenden gekommen
                  wären.
                </h3>
                <h3 class='settings-overview-text'>
                  Nach diesem Bestätigungsdialog ist nun entweder die Befragung zu Ende und es erscheint ein Hinweis,
                  dass das Browserfenster geschlossen werden kann, oder es erscheint direkt der vorab konfigurierte Anschlussfragebogen,
                  in dem optional detaillierte Fragen zu einzelnen abgerufenen Datensätzen (etwa Musiktiteln)
                  gestellt werden. Zur Gestaltung eines möglichst ‚bruchlosen‘ Übergangs empfehlen wir auch
                  hier das Programmieren eines kurzen Texthinweises („Vielen Dank für Ihre Musikdatenspende, die uns
                  bei der Forschung sehr helfen wird. Jetzt haben wir noch einige Fragen zu Ihrer persönlichen Musiknutzung.“).
                </h3>
                <h3 class='settings-overview-text'>
                  Die Anschlussfragen können in unterschiedlicher Weise Bezug auf die abgerufenen Musikdaten nehmen.
                  Einerseits ist es möglich auf einzelne Datenfelder wie Titel, Interpret, Musiklabel, etc. zu referenzieren,
                  andererseits kann aber auch ein kleiner Webplayer integriert werden, der dieselben Informationen
                  anzeigt, aber zusätzlich die Option bietet, den jeweiligen Titel noch einmal kurz anzuspielen. Des
                  Weiteren können die Bezugnahmen entweder in Einzelfragen erfolgen, so dass zu jedem Datensatz
                  (z. B. Künstler*in) eine einzelne Frage gestellt wird (vgl. Abbildung 8), oder aber in Form sogenannter
                  Matrixfragen, bei denen dieselbe Frage zu einer größeren Anzahl Datensätze (z. B. Musiktitel) gestellt
                  wird (vgl. Abbildungen 9). Die weitere Gestaltung des Anschlussfragebogens obliegt den Durchführenden.
                  Wir empfehlen aber am Ende der Befragung erneut einen Hinweis zu geben, dass die gegebene
                  Einwilligung zur Speicherung und Analyse aller gespendeten Musik- und Fragebogendaten jederzeit
                  durch einen Hinweis an den Studienbetreibenden widerrufen werden kann, was dann entsprechend zu
                  einer Datenlöschung führt.
                </h3>
                <figure class='overview-img'>
                <img src="../../../static/images/imagesTutorial/Abb11.png" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 8: Beispiel für eine Einzelfrage im Anschlussfragebogen mit Bezugnahme auf abgerufene Musikdaten
                    </figcaption>
                </figure>
                <figure class='overview-img'>
                <img src="../../../static/images/imagesTutorial/Abb12.png" width='100%' />
                    <figcaption class='figcaption-text'>
                        Fig. 9: Beispiel für eine Matrixfrage im Anschlussfragebogen mit Bezugnahme auf abgerufene Musikdaten
                    </figcaption>
                </figure>
              </div>
              <div id='done-tutorial'>
                <div className='settings-overview-title'>
                  <h1 className="tutorial-content-title">
                    Erledigt - Sie haben es geschafft
                  </h1>
                </div>
                <h3 class='settings-overview-text'>
                  Sie haben nun das Tutorial beendet.
                  Jetzt können Sie jede Funktion von Spotivey selbst ausprobieren. 
                  Spotivey wünscht Ihnen viel Spaß und interessante Erkenntnisse.
                </h3>
              </div>
          </React.Fragment>
      )
  }

    function languageToggle(){
      return(
        <React.Fragment>
          <div className='language-tutorial'>
            <ToggleButtonGroup 
              onChange={(event, newLang) => {
                setLang(newLang)
              }} 
              value={lang}
              exclusive
            >
              <ToggleButton value='de' size='large'>
                <img 
                  loading="lazy" 
                  width="30" 
                  src={'https://flagcdn.com/w20/de.png'} 
                  srcSet={'https://flagcdn.com/w20/de.png 2x'}
                  alt='german' 
                />
              </ToggleButton>
              <ToggleButton value='en' size='large'>
              <img 
                  loading="lazy" 
                  width="30" 
                  src={'https://flagcdn.com/w20/gb.png'} 
                  srcSet={'https://flagcdn.com/w20/gb.png 2x'}
                  alt='german' 
                />
              </ToggleButton>
            </ToggleButtonGroup>
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
                        {lang==='de' ? 
                          <h2 className="privacy-banner-subtitle">
                            Im Folgenden wird die Nutzung von "Spotiveys" mit Hilfe eines Tutorials veranschaulicht. 
                            Grundlegende Vorkenntnisse im Umgang mit der Spotify-API und der Nutzung einer 
                            Online-Umfrageanwendung wird vorausgesetzt.
                          </h2> : 
                          <h2 className="privacy-banner-subtitle">
                            In the following, the use of "Spotiveys" is illustrated with the help of a tutorial. 
                            A basic prior knowledge with the handling of the Spotify API and 
                            the use of an online survey application is assumed.
                          </h2>}
                      </div>
                    </div>
                    <div className="tutorial-content-container">
                      <div>
                        <TutorialContentNav lang={lang}/>
                      </div>
                      <div>
                        {lang==='de' ? TutorialContentGerman() : TutorialContentEnglish()}
                      </div>
                      {languageToggle()}
                    </div>
                  </div>
              </React.Fragment>
           
    )
}