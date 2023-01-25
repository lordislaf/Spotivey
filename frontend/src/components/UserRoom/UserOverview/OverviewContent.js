import * as React from "react";

function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : null;
  }


export default function OverviewContent(username){
    return(
        <React.Fragment>
            <div class='settings-overview-title'>
                <h1 data-heading='true' class='settings-title2'>
                    Overview
                </h1>
                <h2 class='settings-subtitle'>
                    Welcome {capitalizeFirstLetter(username)}
                </h2>
            </div>
            <React.Fragment>
                <h3 class='settings-overview-text'>
                    In the following, you will be given a brief overview of the motivation behind the creation of Spotivey 
                    as well as a short introduction about how this web application works.
                </h3>
                <h3 class='settings-overview-text'>
                    Click <a href='/user/settings'>here</a> if you want to get going right away without any further 
                    explanations and <a href='/user/tutorial'>here</a> to have a look into the tutorial.
                </h3>
                <div class='overview-warum'>
                    <h2 class='settings-subtitle-text'>
                        Why Spotivey - Motivation
                    </h2>
                    <h3 class='settings-overview-text'>
                        Since music listening nowadays happens increasingly via streaming services such as Spotify, 
                        Apple Music or Amazon Music, it would be technically possible to perform research on music 
                        actually listened to on basis of 'digital traces' left behind (Greenberg & Rentfrow, 2017), 
                        instead of relying on self-reporting in questionnaires, a strategy which suffers from various 
                        validity issues (Lepa et al., 2020). 
                        In principle, open APIs offered by music service providers could be used for this purpose. 
                        For example, by using the Spotify API, it is possible to obtain a wide range of music-related 
                        user account information, such as the music tracks most recently listened to, 
                        favorite songs or artists, as well as artists followed or playlists created. 
                        However, using the Spotify API is normally not possible without technical knowledge of 
                        web programming. 
                        In addition, purely music-related transaction data without further socio-demographic 
                        contextual information is only helpful for academic research to a limited extent. 
                        A final problem is that streaming accounts are often used by several people at the same time, 
                        which makes it hard to attribute usage data to a specific person.
                    </h3>
                    <h2 class='settings-subtitle-text'>
                        How does Spotivey work?
                    </h2>
                    <h3 class='settings-overview-text'>
                        To address these challenges, the web application Spotivey was developed. 
                        It allows to easily integrate most user data retrieval functions of the Spotify API 
                        within an online survey (e.g. the open source survey creation tool LimeSurvey) in compliance with 
                        EU data protection regulations. 
                        In this way, individual music usage data can be fetched without web programming knowledge and 
                        linked directly with socio-demographic information from a questionnaire (see Figure 1). 
                        Optionally, it is possible to ask survey participants to confirm individual results of 
                        Spotify data retrieval via a separate window, for example to exclude transactional 
                        data stemming from another person using the same account. 
                        Furthermore, Spotify helps to automatically create LimeSurvey questions with reference 
                        to the collected music usage data for an optional follow-up online survey to be administered 
                        directly following data retrieval. 
                        For example, if the participants' last 20 songs listened to were fetched, 
                        their perceived emotional expression could then be asked for via rating items and a web music player. 
                        In general, results from Spotify API queries may be either displayed in the user area of Spotivey 
                        for a quick overview or downloaded together with the survey respondent ID in a 
                        CSV file for extended statistical analyses.
                    </h3>
                    <figure class='overview-img'>
                        <img src="../../../static/images/Masterarbeit_Uebersicht_Web-APP2.svg" width='80%' />
                        <figcaption class='figcaption-text'>
                            Fig. 1: Individual music usage data can be linked directly with socio-demographic information 
                            from a questionnaire 
                        </figcaption>
                    </figure>
                    <h2 class='settings-subtitle-text'>
                        Development and hosting of Spotivey
                    </h2>
                    <h3 class='settings-overview-text'>
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
                    </h3>
                    <h2 class='settings-subtitle-text'>
                        Plans for future developments of Spotivey
                    </h2>
                    <h3 class='settings-overview-text'>
                        For the future, we plan to extend Spotivey's functionality by connections to other major APIs
                        in the music industry, for example to other music streaming services or metadata libraries
                        such as MusicBrainz. 
                        If you are interested in participating in future development of Spotivey 
                        (e.g. as part of an academic thesis or other form of cooperation), 
                        send an email to <a href="mailto:steffen.lepa@tu-berlin.de">steffen.lepa@tu-berlin.de</a>.
                    </h3>
                    <h2 class='settings-subtitle-text'>
                        Necessary Preconditions for using Spotivey
                    </h2>
                    <h3 class='settings-overview-text'>
                        <ul class='settings-overview-list'>
                            <li class='settings-overview-list-item'> 
                                Using Spotivey requires that you have already created an online survey and that you 
                                have access to the survey administration settings in order to edit the survey's end-URL. 
                            </li>
                            <li class='settings-overview-list-item'> 
                            	We recommend to use Spotivey together with LimeSurvey. 
                                However, most other online survey applications should work, too. 
                                If you have no knowledge of using online survey applications yet, 
                                feel free to watch this LimeSurvey tutorial to get a first impression.
                            </li>
                        </ul>
                    </h3>
                    <h2 class='settings-subtitle-text'>
                        First Step in using Spotivey: Creating a new retrieval profile
                    </h2>
                    <h3 class='settings-overview-text'>
                        In a retrieval profile, you can configure which specific type of information the Spotivey 
                        application should fetch from survey respondents' Spotify profiles for a given study and 
                        whether they should be asked to confirm every single data entry. 
                        After having configured this, you simply need to copy the end-URL to your online questionnaire's 
                        administration settings in order to link your online questionnaire to Spotivey. <br></br>
                        Click <a href='/user/settings'>here</a> to create a retrieval profile for your personal study. <br></br>
                        (Prerequisite: You have already created a limesurvey questionnaire and noted its survey ID)
                    </h3>
                    <h2 class='settings-subtitle-text'>
                        Second (optional) Step in using Spotivey: Edit follow-up settings
                    </h2>
                    <h3 class='settings-overview-text'>
                        In the follow-up settings, you can configure Spotivey to open a follow-up online questionnaire 
                        directly after retrieving survey respondent's Spotify profile information. 
                        In this follow-up questionnaire it is possible to ask respondents questions with direct reference 
                        to Spotify profile information. 
                        To make this as-easy-as-possible for you, Spotivey will automatically create Limesurvey question 
                        group files according to your configuration, which you can then directly import into your 
                        Limesurvey questionnaire and then adapt to your specific needs. <br></br>
                        Click <a href='/user/settings2'>here</a> to create follow-up settings for your personal study. <br></br>
                        (Prerequisite: You have already created a second limesurvey questionnaire and also noted its survey ID)
                    </h3>
                    <h2 class='settings-subtitle-text'>
                        Third Step in using Spotivey: Check out results
                    </h2>
                    <h3 class='settings-overview-text'>
                        In the result sections, you can inspect, delete and CSV-export all Spotify data 
                        that has already been retrieved from your survey respondents. <br></br>
                        Click <a href='/user/results'>here</a> to inspect hitherto results. 
                        <br></br> <br></br>
                        If you need further explanations on how to use the Spotify web application, 
                        please have a look at the <a href='/user/tutorial'>Tutorial</a> tab.
                        <br></br>
                    </h3>
                </div>
                <div className="settings-overview-literatur-container">
                    <h2 class='settings-subtitle-text'>
                        Literature
                    </h2>
                    <h3 className='settings-overview-literatur-item'>
                        Greenberg, D. M., &amp; Rentfrow, P. J. (2017). Music and big data: A new frontier. Current Opinion in
                        Behavioral Sciences, 18, 50–56. <a href='https://doi.org/10.1016/j.cobeha.2017.07.007' target={'_blank'}>
                            https://doi.org/10.1016/j.cobeha.2017.07.007
                        </a>
                    </h3>
                    <h3 className='settings-overview-literatur-item'>
                        Lepa, S., Steffens, J., Herzog, M., &amp; Egermann, H. (2020). Popular Music as Entertainment
                        Communication: How Perceived Semantic Expression Explains Liking of Previously Unknown Music.
                        Media and Communication, 8(3), 191–204. <a href='https://doi.org/10.17645/mac.v8i3.3153' target={'_blank'}>
                        https://doi.org/10.17645/mac.v8i3.3153
                        </a>
                    </h3>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}