import React, { Component } from "react";
import { Checkbox } from '@mui/material';

export default function resultListArtist (list, title, checkArray, setCheckArray, i) {

    function handleCheckboxClicked (e, index) {
        let items = [...checkArray];
        items[i][index] =  e.target.checked;
        setCheckArray(items)
    }

    return(
        <React.Fragment>
            {list.map((artists, index) => 
                <div className={"result-list-card-outer"}>
                    <div className="result-list-card-outer-container">
                        <div className="result-list-card-container">
                            <img class={"result-list-img artist-img"} src={artists.image_url} />
                            <div className="result-list-card-container-inner">
                                <body1 className="result-list-card-script-track-name">
                                    {artists.artist} 
                                </body1>
                                <body1 className="result-list-card-script-artist-string"> 
                                    Genre: {artists.genre_string}
                                </body1>
                            </div>
                            <div className={"result-list-checkbox"}>
                                <Checkbox
                                    checked={checkArray[i][index]}
                                    onClick={(e) => {
                                        handleCheckboxClicked(e, index)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}