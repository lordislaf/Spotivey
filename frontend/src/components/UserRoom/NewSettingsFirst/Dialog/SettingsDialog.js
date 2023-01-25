import * as React from "react";
import { Button } from '@mui/material';
import { useNavigate } from "react-router";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import {createSettings} from './CreateSettingsButtonPressed';
import updateSettings from './CreateSettingsButtonPressed';

export default function SettingsDialog(props) {

    const textSpotify = ["Get User's Saved Tracks", "Get User's Profile", "Get User's Top Items (Tracks)", 
            "Get User's Top Items (Artists)", "Get User's Followed Artists", "Get User's Playlists", 
            "Get Last Played Tracks"]

    function getTextfromCheckbox(){
        const textArray = []
        props.props[1].forEach(function(item, i){
            if(item){
                if(i===2 || i===3){
                    textArray.push ({
                        text: textSpotify[i],
                        limit: props.props[2][i][0],
                        time_range: props.props[2][i][1],
                        market: undefined,
                        public: undefined,
                    })
                }
                else if(i===0){
                    textArray.push ({
                        text: textSpotify[i],
                        limit: props.props[2][i][0],
                        time_range: undefined,
                        market: props.props[2][i][1],
                        public: undefined,
                    })
                } else if(i===5){
                    textArray.push ({
                        text: textSpotify[i],
                        limit: props.props[2][i][0],
                        time_range: undefined,
                        market: undefined,
                        public: props.props[2][i][1],
                    })
                } else {
                    textArray.push ({
                        text: textSpotify[i],
                        limit: props.props[2][i][0],
                        time_range: undefined,
                        market: undefined,
                        public: undefined,
                    })
                }
            }
        })
        return textArray
    }

    const data = {
        dataCheck: {
            '0': props.props[1][0],
            '1': props.props[1][1],
            '2': props.props[1][2],
            '3': props.props[1][3],
            '4': props.props[1][4],
            '5': props.props[1][5],
            '6': props.props[1][6],
        },
        dataSettings: {
            '0': {
                'limit': props.props[2][0][0],
                'market': props.props[2][0][1] ? props.props[2][0][1] : '',
                'confirmCheck': props.props[5][0],
            },
            '1': '',
            '2': {
                'limit': props.props[2][2][0],
                'time_range': props.props[2][2][1] ? props.props[2][2][1] : '',
                'confirmCheck': props.props[5][2],
            },
            '3': {
                'limit': props.props[2][3][0],
                'time_range': props.props[2][3][1] ? props.props[2][3][1] : '',
                'confirmCheck': props.props[5][3],
            },
            '4': {
                'limit': props.props[2][4][0],
                'confirmCheck': props.props[5][4],
            },
            '5': {
                'limit': props.props[2][5][0],
                'public': props.props[2][5][1],
                'confirmCheck': props.props[5][5],
            },
            '6': {
                'limit': props.props[2][6][0],
                'confirmCheck': props.props[5][6],
            },
        },
        text: getTextfromCheckbox(),
        textDefault: textSpotify,
        generelleEinstellung: {
            'umfrageName': props.props[3][0],
            'umfrageID': props.props[3][1],
            'umfrageEndUrl': '',
        },
        username: props.props[4],
        confirmCheck: {
            '0': props.props[5][0],
            '1': props.props[5][1],
            '2': props.props[5][2],
            '3': props.props[5][3],
            '4': props.props[5][4],
            '5': props.props[5][5],
            '6': props.props[5][6],
        },
    }


    const handleCloseDialog = () => {
        props.props[0][1](false)
    }

    const navigate = useNavigate();

    function handleOkayDialog (data) {
        let body = {
            data: {
              "generelleEinstellung": data.generelleEinstellung,
              "textDefault": data.textDefault,
              "dataCheck": data.dataCheck,
              "dropdown": {
                "valueSettings": data.text,
                "valueDropdown": {},
              },
              "confirmCheck": data.confirmCheck,
            },
            umfrageName: props.props[3][0],
            umfrageID: props.props[3][1],
            umfrageEndUrl: '',
            username: data.username,
            confirmCheck: data.confirmCheck,
          }
        if (props.props[6]) {
            body.updateID = props.props[7]
            updateSettings(body, navigate)
        } else {
            createSettings(body, navigate)
        }
    }

    function getSpotifyText(){
        
        return(
            <React.Fragment>
                {props.props[1].map(function(item,i){
                    if(item){
                        return(
                            <h3  className="settings-dialog-text">
                                {textSpotify[i]} <br></br> {props.props[2][i].map(function(item2, j){
                                    if(j === 0 && item2.length !== 0) {
                                        if (props.props[2][i].length === 1) {
                                            return('(limit: ' + item2 + ')')
                                        }
                                        else {return('(limit: ' + item2)}
                                    } else {
                                        if (item2) {
                                            if (item2 === '' || item2.name === 'medium_term' || item2.name === 'short_term' || 
                                            item2.name === 'long_term') {
                                                if (item2 === 'medium_term') {
                                                    return('; time_range: ' + item2 + ')')
                                                } else if (item2 === '') {
                                                    return(')')
                                                } else {
                                                    return('; time_range: ' + item2.name + ')')
                                                }
                                            } else {
                                                if(item2.Code === ''){
                                                    return(')')
                                                }
                                                else {
                                                    return('; market: ' + item2.Code + ')')
                                                }
                                            }
                                        } else {
                                            return(')')
                                        }
                                    }
                                })}
                            </h3>
                        )
                    }
                })}
            </React.Fragment>
        )
    }

    function renderSpotifyText() {
        return(
            <React.Fragment>
                <h5 className="settings-dialog-text-title">
                    Spotify API Settings:
                </h5>
                {getSpotifyText()}
            </React.Fragment>
        )
    }

    function renderTextSettings() {
        return(
            <React.Fragment>
                <div className="settings-dialog-container">
                    <div className='settings-dialog-content-outer'>
                        <h3 className="settings-dialog-text-title" >
                            Settings Name:
                        </h3>
                        <h3 className="settings-dialog-text" >
                            {props.props[3][0]}
                        </h3>
                        <h3 className="settings-dialog-text-title" >
                            Survey ID (1st Survey):
                        </h3>
                        <h3 className="settings-dialog-text" >
                            {props.props[3][1]}
                        </h3>
                    </div>
                    <Divider 
                        orientation="vertical" 
                        variant="middle" 
                        flexItem 
                        style={{margin: '0 1rem'}}
                    />
                    <div className='spotify-settings'>
                        {renderSpotifyText()}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <h1 className="settings-dialog-title">
                Settings Overview 
            </h1>
            <DialogContent dividers={scroll === 'paper'}>
                <h3 className="settings-overview-text" >
                    Please check your settings details
                </h3>
                <Divider variant="middle" style={{margin: '1rem 0'}} />
                {renderTextSettings()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>
                    Change
                </Button>
                <Button onClick={() => {handleOkayDialog(data)}}>
                    Okay
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}