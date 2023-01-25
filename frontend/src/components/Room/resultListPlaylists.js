import React, { Component } from "react";
import { Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import resultListTrack from "./resultList";
import { IndexKind } from "typescript";

export default function resultListPlaylist (
    list, title, checkArray, setCheckArray, i, setCollapseOpen, collapseOpen, checkArray2, setCheckArray2
    ) {

    function handleCheckboxClicked (e, index) {
        let items = [...checkArray];
        items[i][index] =  e.target.checked;
        setCheckArray(items)
        let items2 = [...checkArray2];
        items2[3][index] =  Array(50).fill(e.target.checked);
        setCheckArray2(items2)
    }

    function handleCollapseClicked (e, indexCollaps) {
        let items = [...collapseOpen];
        items[indexCollaps] =  !items[indexCollaps];
        setCollapseOpen(items)
    }

    return(
        <React.Fragment>
            {list.map((playlists, index) => { 
                return(
                    <React.Fragment>
                        <div className={"result-list-card-outer"}>
                            <div className="result-list-card-outer-container">
                                <div className="result-list-card-container">
                                    <img class={"result-list-img"} src={playlists.playlists_cover} />
                                    <div className="result-list-card-container-outer" onClick={(e) => handleCollapseClicked(e, index)}>
                                        <div className="result-list-card-container-inner">
                                            <body1 className="result-list-card-script-track-name">
                                                {playlists.name} 
                                            </body1>
                                            <body1 className="result-list-card-script-artist-string"> 
                                                Owner: {playlists.owner} || collaborative: {playlists.collaborative ? "Yes" : "No"}
                                            </body1>
                                        </div>
                                        <div style={{margin: 'auto 0'}}>
                                            {collapseOpen[index] ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                        </div>
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
                        {collapseOpen[index] ? 
                            <div style={{width: '80%', margin: '0 auto'}}>
                            {resultListTrack(playlists.playlistsTracksRow.slice(0,playlists.playlistsTracksRow.length), 
                            '', checkArray2, setCheckArray2, 3, index)}
                            </div> : 
                        null}
                    </React.Fragment>
                )}
            )}
        </React.Fragment>
    )
}