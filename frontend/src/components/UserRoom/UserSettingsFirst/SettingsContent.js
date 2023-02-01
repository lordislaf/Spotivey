import * as React from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './DataGridColumns.js';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export default function SettingsContent(props) {

    const [settingsRows, setSettingsRows] = useState(null)
    const [selectedRowSettings, setSelectedRowSettings] = useState([])

    const [openTooltipCopy, setOpenTooltipCopy] = React.useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if(props.username){
            fetch("/api/get-settingslist" + "?username=" + props.username).then(response => response.json())
            .then((data) => {
                if (!data.error){
                    setSettingsRows(data.data)
                }
            });
        }
    }, [])

    function renderSettingsTable() {
        return(
            <div style={{ height: 400, width: '100%' }}>
                {settingsRows?.length !== 0 ?
                    <DataGrid
                        rows={settingsRows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = []
                            settingsRows.forEach((row) =>   
                                ids.forEach(function(item, index){
                                    if(row.id===item){
                                        selectedIDs.push(row)
                                    }
                                    return(selectedIDs)
                                })       
                            );
                            setSelectedRowSettings(selectedIDs)
                        }}
                    /> : 
                    <div className="settings-table-card-container">
                        <h3 class='settings-overview-text'>
                            No settings found
                        </h3>
                    </div>
                }
            </div>
        )
    }

    function deleteSettings(){
        let promises = [];
        for(let zaehler = 0; zaehler<selectedRowSettings.length; zaehler++){
            promises.push(fetch("/api/delete-settings" + "?surveyid=" + selectedRowSettings[zaehler].umfrageID));
        }
        Promise.all(promises)
        location.reload();
    }

    function renderDeleteButton(){
        return(
            <div>
                <Button 
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={() => {
                        deleteSettings()
                    }}
                    disabled={selectedRowSettings.length !== 0 ? false : true}
                >
                    Delete Profile
                </Button>
            </div>
        )
    }

    function updateSettings(){
        navigate('/user/settings/new', {
            state: {
                update: true,
                surveyID: selectedRowSettings[0].umfrageID
            }
       })
    }

    function renderChangeButton(){
        return(
            <div>
                <Button 
                    startIcon={<ManageHistoryOutlinedIcon />}
                    onClick={() => {updateSettings()}}
                    disabled={selectedRowSettings.length === 1 ? false : true}
                >
                    Edit Profile
                </Button>
            </div>
        )
    }

    const handleTooltipClose = () => {
        setOpenTooltipCopy(false);
    };
    
    const handleTooltipOpen = () => {
        setOpenTooltipCopy(true);
    };

    function getEndUrlSurvey() {
        const url = 'https//spotiveys.users.ak.tu-berlin.de/?surveyID={SID}&participant={SAVEDID}&lang={LANG}'
        navigator.clipboard.writeText(url)
        handleTooltipOpen()
    }

    function renderGetEndUrlSurvey() {
        return(
            <div>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            onClose={handleTooltipClose}
                            open={openTooltipCopy}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copy to Clipboard"
                        >
                            <Button 
                                startIcon={<ContentCopyIcon />}
                                onClick={() => {getEndUrlSurvey()}}
                            >
                                Copy End URL for Limesurvey Survey
                            </Button>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
            </div>
        )
    }

    function confirmTextDesign(){
        navigate( '/user/settings/confirm-text-design', {
            state: {
                update: true,
                surveyID: selectedRowSettings[0].umfrageID
            }
       })
    }

    function renderChangeConfirmButton() {
        return(
            <React.Fragment>
                <Button 
                    startIcon={<TextFieldsIcon />}
                    onClick={() => {confirmTextDesign()}}
                    disabled={selectedRowSettings.length === 1 ? false : true}
                >
                    Edit Confirmation Text
                </Button>
            </React.Fragment>
        )
    }

    return(
    <div>
        <h1 data-heading='true' class='settings-title'>
            Retrieval Settings
        </h1>
        <h3 class='settings-overview-text'>
            In order to create your first profile, press the "New Profile" button. 
            This will redirect you to a new page. There you can create and save a profile.
            <br></br>
            If you want to delete or update an existing profile, 
            check the checkbox of the profile and press the button provided for it.
            <br></br>
            You can edit the text that participants see when they confirm their Spotify data.
            To do this, press the button <i>Edit Confirmation Text</i>.
            <br></br>
            To copy an End-URL for your online survey (which you need for LimeSurvey for example), 
            press the button <i>Copy End URL for Limesurvey Survey</i>.
        </h3>
        <div className="settings-table-button-container-inner" id='copy-end-url'>
            {renderGetEndUrlSurvey()} 
        </div>
        <div className="settings-table-button-container">
            <div className="settings-table-button-container-inner">
                <Button startIcon={<AddOutlinedIcon />} href='settings/new'>
                    New Profile
                </Button>
            </div>
            <div className="settings-table-button-container-inner">
                {renderDeleteButton()}
            </div>
            <div className="settings-table-button-container-inner">
                {renderChangeButton()}
            </div>
            <div className="settings-table-button-container-inner">
                {renderChangeConfirmButton()}
            </div>
        </div>
        {renderSettingsTable()}
    </div>
    )
}