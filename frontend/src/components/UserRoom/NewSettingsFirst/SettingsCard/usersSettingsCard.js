import * as React from "react";
import { usersContentSettings } from "./Content/usersContentSettings";

export function usersSettingsCard (
    currentUsersChecked, setCurrentUsersChecked,
    topItemsTracksChecked, setTopItemsTracksChecked,
    topItemsTracksLimit, setTopItemsTracksLimit,
    topTracksTimeRange, setTopTracksTimeRange,
    topItemsArtistsChecked, setTopItemsArtistsChecked,
    topItemsArtistsLimit, setTopItemsArtistsLimit,
    topArtistsTimeRange, setTopArtistsTimeRange,
    followedArtistsChecked, setFollowedArtistsChecked,
    followedArtistsLimit, setFollowedArtistsLimit,
    confirmTopItemsTracksYes, setConfirmTopItemsTracksYes,
    confirmTopItemsArtistsYes, setConfirmTopItemsArtistsYes,
    confirmFollowedArtistsYes, setConfirmFollowedArtistsYes
){
    return(
        <React.Fragment>
            <div class='card-content-inner-container'>
                <div class='card-content'>
                    <h1 data-heading='true' class='settings-title'>
                        User's Settings
                    </h1>
                    <h3 className='figcaption-text'>
                        Indicate which Spotify information you are interested in. 
                        On the following slides, you have the choice of track, artist and playlist information. 
                        You can also select the correct setting for user information. 
                        To do this, confirm the checkbox for the corresponding setting.
                    </h3>
                    <h3 className='figcaption-text' style={{paddingTop: '1em'}}>
                        On this slide, the options 'Get Current User's Profile', 'Get User's Top Items (Tracks)', 
                        'Get User's Top Items (Artists)' and 'Get Followed Artists' can be selected. 
                        <br></br>
                        If you do not prefer either option, slide to the next page.
                    </h3>
                    {usersContentSettings(
                        currentUsersChecked, setCurrentUsersChecked,
                        topItemsTracksChecked, setTopItemsTracksChecked,
                        topItemsTracksLimit, setTopItemsTracksLimit,
                        topTracksTimeRange, setTopTracksTimeRange,
                        topItemsArtistsChecked, setTopItemsArtistsChecked,
                        topItemsArtistsLimit, setTopItemsArtistsLimit,
                        topArtistsTimeRange, setTopArtistsTimeRange,
                        followedArtistsChecked, setFollowedArtistsChecked,
                        followedArtistsLimit, setFollowedArtistsLimit,
                        confirmTopItemsTracksYes, setConfirmTopItemsTracksYes, 
                        confirmTopItemsArtistsYes, setConfirmTopItemsArtistsYes, 
                        confirmFollowedArtistsYes, setConfirmFollowedArtistsYes
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}