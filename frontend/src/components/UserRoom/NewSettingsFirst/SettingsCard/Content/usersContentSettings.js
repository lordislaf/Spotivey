import * as React from "react";
import { Checkbox, Slider } from "@mui/material";
import { marks } from './Components/settingsConst';
import TimeRange from './Components/time_range';
import { confirmCheck } from "./Components/ConfirmCheck";
import LimitComponent from "./Components/limitComponent";
import TimeRangeComponent from "./Components/TimeRangeComponent";

export function usersContentSettings(
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
) {
    return(
    <React.Fragment>
        <React.Fragment>
            <h2 data-heading='true' class='settings-content-item-title'>
                Get Current User's Profile
            </h2>
            <div class='spotify-container'>
                <div class='spotify-check'>
                    <Checkbox
                        color="primary"
                        checked={currentUsersChecked}
                        onChange={(e) => {
                            setCurrentUsersChecked(e.target.checked);
                        }}
                        style={{
                            color: "#C40D1E"
                        }}
                    />
                </div>
                <div class='spotify-items'>
                    <div class='settings-slider-container'>
                        <h2 class='figcaption-text'>
                            Select this option to get profile information about the current user (only the information about the user's Spotify subscription level, the total number of followers and the user's country.).
                        </h2>
                    </div>
                </div>
            </div>
        </React.Fragment>
        <React.Fragment>
            <h2 data-heading='true' class='settings-content-item-title'>
                Get User's Top Items (Tracks)
            </h2>
            <h2 class='figcaption-text'>
                Select this option to get the current user's top tracks based on calculated affinity.
            </h2>
            <div class='spotify-container'>
                <div class='spotify-check'>
                    <Checkbox
                        color="primary"
                        checked={topItemsTracksChecked}
                        onChange={(e) => {
                        setTopItemsTracksChecked(e.target.checked);
                        }}
                        style={{
                        color: "#C40D1E"
                        }}
                    />
                </div>
                <div class='spotify-items'>
                    <div class='settings-slider-container'>
                        <LimitComponent />
                        <Slider 
                            aria-valuetext='tracks'
                            aria-label="SliderTopItemsTracks"
                            defaultValue={topItemsTracksLimit} 
                            onChange={(e, newValue) => {
                            setTopItemsTracksLimit(newValue);}}
                            min={1} 
                            max={50}
                            step={1}
                            marks={marks}
                            valueLabelDisplay='auto'
                        />
                    </div>
                    <TimeRangeComponent/>
                    <div className="autocomplete-container">
                        <TimeRange props={[topTracksTimeRange, setTopTracksTimeRange]}/>
                    </div>
                    {confirmCheck(confirmTopItemsTracksYes, setConfirmTopItemsTracksYes)}
                </div>
            </div>
        </React.Fragment>
        <React.Fragment>
            <h2 data-heading='true' class='settings-content-item-title'>
                Get User's Top Items (Artists)
            </h2>
            <h2 class='figcaption-text'>
                Select this option to get the current user's top artists based on calculated affinity.
            </h2>
            <div class='spotify-container'>
                <div class='spotify-check'>
                    <Checkbox
                        color="primary"
                        checked={topItemsArtistsChecked}
                        onChange={(e) => {
                        setTopItemsArtistsChecked(e.target.checked);
                        }}
                        style={{
                        color: "#C40D1E"
                        }}
                    />
                </div>
                <div class='spotify-items'>
                    <div class='settings-slider-container'>
                        <LimitComponent />
                        <Slider 
                            aria-label="SliderTopItemsArtist"
                            defaultValue={topItemsArtistsLimit} 
                            onChange={(e, newValue) => {
                            setTopItemsArtistsLimit(newValue);}}
                            min={1} 
                            max={50}
                            step={1}
                            marks={marks}
                            valueLabelDisplay='auto'
                        />
                    </div>
                    <TimeRangeComponent/>
                    <div className="autocomplete-container">
                        <TimeRange props={[topArtistsTimeRange, setTopArtistsTimeRange]}/>
                    </div>
                    {confirmCheck(confirmTopItemsArtistsYes, setConfirmTopItemsArtistsYes)}
                </div>
            </div>
        </React.Fragment>
        <React.Fragment>
            <h2 data-heading='true' class='settings-content-item-title'>
                Get Followed Artists
            </h2>
            <h2 class='figcaption-text'>
                Select this option to get the current user's followed artists.
            </h2>
            <div class='spotify-container'>
                <div class='spotify-check'>
                    <Checkbox
                        color="primary"
                        checked={followedArtistsChecked}
                        onChange={(e) => {
                        setFollowedArtistsChecked(e.target.checked);
                        }}
                        style={{
                        color: "#C40D1E"
                        }}
                    />
                </div>
                <div class='spotify-items'>
                    <div class='settings-slider-container'>
                        <LimitComponent />
                        <Slider 
                            aria-label="SliderTopItemsArtist"
                            defaultValue={followedArtistsLimit} 
                            onChange={(e, newValue) => {
                            setFollowedArtistsLimit(newValue);}}
                            min={1} 
                            max={50}
                            step={1}
                            marks={marks}
                            valueLabelDisplay='auto'
                        />
                        {confirmCheck(confirmFollowedArtistsYes, setConfirmFollowedArtistsYes)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    </React.Fragment>
    );
}