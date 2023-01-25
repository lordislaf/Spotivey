import React from "react";
import { Checkbox } from '@mui/material';

export default function resultListTrack (list, title, checkArray, setCheckArray, i, index) {

    function handleCheckboxClicked (e, indexTracks) {
        let items = [...checkArray];
        if (i !== 3) {
            items[i][indexTracks] =  e.target.checked;
        } else {
            items[i][index][indexTracks] =  e.target.checked;
        }
        setCheckArray(items)
    }

    return(
        <React.Fragment>
            {list.map((tracks, indexTracks) => 
                <div className={"result-list-card-outer"}>
                    <div className="result-list-card-outer-container">
                        <div className="result-list-card-container">
                            <img class={"result-list-img"} src={i !== 3 ? tracks.image_url : tracks.cover.url} />
                            <div className="result-list-card-container-inner">
                                <body1 className="result-list-card-script-track-name">
                                    {i !== 3 ? tracks.track_name : tracks.name} 
                                </body1>
                                <body1 className="result-list-card-script-artist-string"> 
                                    by: {i !== 3 ? tracks.spotify_artist_string : tracks.artistName}
                                </body1>
                            </div>
                            {i !== 3 ? 
                                <div className={"result-list-checkbox"}>
                                    <Checkbox
                                        checked={i !== 3 ? checkArray[i][indexTracks] : checkArray[i][index][indexTracks]}
                                        onClick={(e) => {
                                            handleCheckboxClicked(e, indexTracks)
                                        }}
                                    />
                                </div> : null 
                            }
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}