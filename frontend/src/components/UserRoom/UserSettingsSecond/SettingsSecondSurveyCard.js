import * as React from "react";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsSecondSurvey } from '../UserSettingsFirst/DataGridColumns.js';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';

export default function SettingsSecondSurveyCard(props) {
    const [settingsRows, setSettingsRows] = useState(null)
    const [selectedRowSettings, setSelectedRowSettings] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function settingsInRoom() {
            fetch("/api/get-settings-second-survey" + "?username=" + props.username).then(response => response.json())
            .then((data) => {
                if (!data.error){
                    console.log(data.data)
                    setSettingsRows(data.data)
                }
            });
        }
        if(props.username){
          settingsInRoom();
        }
      }, [props.username])

      function renderSettingsTable() {
        return(
            <div style={{ height: 400, width: '100%' }}>
                {settingsRows?.length !== 0 ?
                    <DataGrid
                        rows={settingsRows}
                        columns={columnsSecondSurvey}
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

    function renderNewSettingsButton(){
        return(
            <Button 
                startIcon={<AddOutlinedIcon />} 
                onClick={() => {
                    navigate('/user/settings2/new', {
                        state: {
                            surveyID: selectedRowSettings[0].umfrageID,
                            surveyIDsecond: selectedRowSettings[0].umfrageIDsecond !== '' ? 
                                selectedRowSettings[0].umfrageIDsecond : 
                                null,
                            endURL: selectedRowSettings[0].endURL,
                            passLang: selectedRowSettings[0].passLang,
                        }
                    })
                }}
                disabled={selectedRowSettings.length === 1 && 
                    !selectedRowSettings[0].onlyProfile ? false : true}
            >
                {selectedRowSettings.length === 1 ? selectedRowSettings[0]?.umfrageIDsecond === '' ? 'Edit Follow-Up Settings' : 'Modify Follow-Up URL':'Edit Follow-Up Settings'}
            </Button>
        )
    }

    function deleteSettings(){
        let promises = [];
        for(let zaehler = 0; zaehler<selectedRowSettings.length; zaehler++){
            promises.push(fetch("/api/delete-settings-second-survey" + "?surveyid=" + selectedRowSettings[zaehler].umfrageID));
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
                    Delete Follow-Up Settings
                </Button>
            </div>
        )
    }

    function renderGetSurveyQuestion() {
        return(
            <Button 
                startIcon={<GetAppIcon/>}
                disabled={selectedRowSettings.length === 1 && 
                    selectedRowSettings[0].umfrageIDsecond !== '' &&
                    !selectedRowSettings[0].onlyProfile ? false : true}
                onClick={()=>{
                    navigate('/user/settings2/new2', {
                        state: {
                            surveyID: selectedRowSettings[0].umfrageID,
                            username: props.username,
                        }
                    })
                }}
            >
                Generate Question Files
            </Button>
        )
    }

    return(
        <React.Fragment>
            <h1 data-heading='true' class='settings-title'>
                Follow-Up Settings 
            </h1>
            <h3 class='settings-overview-text'>
                Similar to your retrieval setting, press <i>Edit Follow-Up Settings</i> to edit the profile in depth.
            </h3>
            <h3 class='settings-overview-text'>
                In order to delete your follow-up setting, press the button <i>Delete Follow-Up Settings</i>after 
                checking a checkbox.
            </h3>
            <h3 class='settings-overview-text'>
                Use <i>Generate Question Files</i> to specify how many and which results you want to give to a possible follow-up questionnaire. <br></br>
                Note: Without this information, Spotivey cannot properly forward to a follow-up questionnaire. <br></br>
                Finally, the configured question group can be exported using a button.
            </h3>
            <div className="settings-table-button-container">
                <div className="settings-table-button-container-inner">
                    {renderNewSettingsButton()}
                </div>
                <div className="settings-table-button-container-inner">
                    {renderDeleteButton()}
                </div>
                <div className="settings-table-button-container-inner">
                    {renderGetSurveyQuestion()}
                </div>
            </div>
            {renderSettingsTable()}
        </React.Fragment>
    )
}