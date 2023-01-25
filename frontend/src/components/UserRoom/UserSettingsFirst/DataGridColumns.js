import * as React from "react";
import {Tooltip, Typography} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

function renderCellSpotifyText (params){
        return(
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            { 
              params.value.check ?
                params.field !== "text2" ?
                  <Tooltip 
                    title={
                      params.field === "text1" && params.value.market != '' ? 
                        <Typography>
                          limit: {params.value.limit} <br></br> market: {params.value.market} <br></br> confirm: {params.value.confirmCheck.toString()}
                        </Typography> : 
                      params.field === "text3" || params.field === "text4" ? 
                        <Typography>
                          limit: {params.value.limit} <br></br> time_range: {params.value.timeRange} <br></br> confirm: {params.value.confirmCheck.toString()}
                        </Typography> : 
                      params.field === "text6" ? 
                        <Typography>
                          limit: {params.value.limit} <br></br> {params.value.public ? 'Any Playlists' : 'Public Playlists'} <br></br> confirm: {params.value.confirmCheck.toString()}
                        </Typography> : 
                      <Typography>
                        limit: {params.value.limit} <br></br> confirm: {params.value.confirmCheck.toString()}
                      </Typography> 
                    } 
                    placement="top"
                  >
                    <CheckBoxOutlinedIcon/>
                  </Tooltip> : 
                  <CheckBoxOutlinedIcon/> :
              null
            }
          </div>
        )
}

export const columns = [
    { field: 'id', headerName: 'Profile ID', width: 140 },
    {
      field: 'nameUmfrage',
      headerName: 'Survey Name',
      width: 150,
    },
    {
      field: 'umfrageID',
      headerName: 'Survey ID',
      width: 150,
    },
    {
      field: 'text1',
      width: 200,
      height: 100,
      headerName: 'Get User\'s Saved Tracks',
      /* renderHeader: () => {
        return(
        <Tooltip title="Get User's Saved Tracks" placement="top">
          <Typography>
            <subtitle1>Spotify Tracks </subtitle1>
            <h6>Get User's Saved Tracks</h6>
          </Typography>
        </Tooltip>
      )}, */
      renderCell: (params) => renderCellSpotifyText(params),
    },
    {
      field: 'text7',
      width: 200,
      headerName: 'Get Last Played Tracks',
      renderCell: (params) => renderCellSpotifyText(params),
    },
    {
      field: 'text2',
      width: 150,
      headerName: 'Get User\'s Profile',
      renderCell: (params) => renderCellSpotifyText(params),
    },
    {
      field: 'text3',
      width: 200,
      headerName: "Get User's Top Items (Tracks)",
      renderCell: (params) => renderCellSpotifyText(params),
    },
    {
      field: 'text4',
      width: 200,
      headerName: "Get User's Top Items (Artists)",
      renderCell: (params) => renderCellSpotifyText(params),
    },
    {
      field: 'text5',
      width: 200,
      headerName: "Get User's Followed Artists",
      renderCell: (params) => renderCellSpotifyText(params),
    },
    {
      field: 'text6',
      width: 200,
      headerName: "Get User's Playlists",
      renderCell: (params) => renderCellSpotifyText(params),
    }
  ];

  export const columnsSecondSurvey = [
    { field: 'id', headerName: 'Profile ID', width: 140 },
    {
      field: 'nameSettings',
      headerName: 'Survey Name',
      width: 150,
    },
    {
      field: 'umfrageIDsecond',
      headerName: 'Umfrage-ID (2nd Survey)',
      width: 150,
      hide: true,
    },
    {
      field: 'secondSurveyServer',
      headerName: 'Server Name (2nd Survey)',
      width: 200,
      height: 100,
      hide: true,
    },
    {
      field: 'secondSurveyLanguage',
      headerName: 'Language (2nd Survey)',
      width: 200,
      height: 100,
      hide: true,
    },
    {
      field: 'umfrageID',
      hide: true,
    },
    {
      field: 'endURL',
      headerName: 'Follow-Up URL',
      width: 500,
    }
  ];