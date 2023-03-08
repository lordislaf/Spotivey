import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AudioFeaturesDashboard from './AudioFeaturesDashboard.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function ResultContent(props) {

    const chartRef = useRef(null);

    const [dataAudioFeatures, setDataAudioFeatures] = useState([])

    const [fileData, setFileData] = useState(null);

    const [listEntriesShow, setListEntriesShow] = useState([false, false, false, false, false, false, false]);

    const [currentPage, setCurrentPage] = useState(1);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const dataLimit = 100
    const [pages, setPages] = useState(0)

    const navigate = useNavigate()

    function handleCloseDialog () {
        setOpenDeleteDialog(false);
    }

    function getSpotifyAudioFeautures(dataString) {
        fetch("/spotify/audio-features-spotify" + "?dataString=" + dataString + '&surveyID=' + props.surveyID)
        .then(response => response.json())
        .then((data) => {
            if (!data.error){
                setDataAudioFeatures(data)
            }
        })
    }

    const handleDataFetch = async() => {
        fetch("/api/save-to-csv-file" + '?surveyID=' + props.surveyID)
        .then(response => response.json())
        .then((data) => {
            if (!data.error){
                if(data.length !== 0){
                    setFileData(data)
                }
            }
        });
      };

      useEffect(() => {
        async function userInRoom() {
          fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                if (data.username === null){
                    navigate('/login')
                }
            });
        }
        userInRoom();
        handleDataFetch();
    }, [])

    function renderBackButton() {
        return(
            <div className={'back-button-result'}>
                <IconButton
                    onClick={() => {
                        props.setFirstPage(true)
                        setListEntriesShow(listEntriesShow.fill(false))
                    }}
                >
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </div>
        )
    }

    function renderTable(data, type, index){
        let pageLimit = 5

        let dataString = index===0 ? 'savedTracksData' : index===1 ? 'topTracksData' : 'recentlyTracksData'

        function goToNextPage() {
            setCurrentPage((page) => page + 1);
        }

        function goToPreviousPage() {
            setCurrentPage((page) => page - 1);
        }

        function goToLastPage() {
            setCurrentPage(pages);
        }

        function goToFirstPage() {
            setCurrentPage(1);
        }

        function changePage(event) {
            const pageNumber = Number(event.target.textContent);
            setCurrentPage(pageNumber);
        }

        const getPaginatedData = () => {
            const startIndex = currentPage * dataLimit - dataLimit;
            const endIndex = startIndex + dataLimit;
            return data.slice(startIndex, endIndex);
        };

        const getPaginationGroup = () => {
            let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
            if (currentPage >=4){
                start = currentPage-3
            }
            if (pages-start < pageLimit){
                start = pages-pageLimit
            }
            if (pages < pageLimit) {
                pageLimit = pages
            }
            if (start<0){
                start=0
            }
    
            return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        };

        function renderPagination(){
            return(
                <div className="pagination">
                    <IconButton
                        size="small"
                        onClick={goToFirstPage}
                        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                    >
                        <FirstPageIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={goToPreviousPage}
                        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                    >
                        <ArrowBackIosNewIcon fontSize="inherit" />
                    </IconButton>
                    {getPaginationGroup().map((item, index) => (
                        <button
                            key={index}
                            onClick={changePage}
                            className={`paginationItem ${currentPage === item ? 'active' : null}`}
                        >
                            <span>{item}</span>
                        </button>
                    ))}
                    <IconButton
                        size="small"
                        onClick={goToNextPage}
                        className={`next ${currentPage === pages ? 'disabled' : ''}`}
                    >
                        <ArrowForwardIosIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={goToLastPage}
                        className={`prev ${currentPage === pages ? 'disabled' : ''}`}
                    >
                        <LastPageIcon fontSize="inherit" />
                    </IconButton>
                </div>
            )
        }

        return(
            <React.Fragment>
                {type === 'Tracks' ? 
                <Button
                    onClick={() => {getSpotifyAudioFeautures(dataString)}}
                    variant="outlined"
                >
                    Get Spotify Audio Features Results
                </Button> : null }
                {renderPagination()}
                <table id={'tableResultParticipant'}>
                    <tr>
                        <th>Participant ID</th>
                        <th>No</th>
                        {type !== 'Profile' ? 
                        <React.Fragment>
                            <th>Cover</th>
                            {type === 'Tracks' ? <th>Title</th> : null}
                            {type === 'Artists' ? <th>Title</th> : null}
                            {type === 'Playlists' ? <th>Title</th> : null}
                            {type === 'Tracks' ? <th>Artists Name</th> : null}
                            <th>Spotify ID</th>
                            {type === 'Tracks' ? <th>ISRC Number</th> : null}
                            {type === 'Artists' ? <th>Type</th> : null}
                            {type === 'Artists' ? <th>Popularity</th> : null}
                            {type === 'Artists' ? <th>Followers Total</th> : null}
                            {type === 'Artists' ? <th>Genres</th> : null}
                            {type === 'Playlists' ? <th>Public?</th> : null}
                            {type === 'Playlists' ? <th>Tracks Total</th> : null}
                            {type === 'Playlists' ? <th>Collaborative?</th> : null}
                        </React.Fragment> : 
                        <React.Fragment>
                            <th>Country</th>
                            <th>Followers Total</th>
                            <th>Product</th>
                        </React.Fragment>
                        }
                    </tr>         
                    {getPaginatedData().map((item, index) => { 
                        let idTableRow = (getPaginatedData()[index+1]?.participant[0] !== getPaginatedData()[index].participant[0] &&
                        getPaginatedData()[index+1]?.participant[0]) ? 
                            'divider-table' : 'no-divider'
                        return(
                            <tr id={idTableRow}>
                                <td>{item.participant}</td>
                                <td>{item.no}</td>
                                {type !== 'Profile' ? 
                                <React.Fragment>
                                    <td>
                                        <img className={'img-table'} src={item.cover}></img>
                                    </td>
                                    {type === 'Tracks' ? <td>{item.trackName}</td> : null}
                                    {type === 'Artists' ? <td>{item.artistName}</td> : null}
                                    {type === 'Playlists' ? <td>{item.playlistName}</td> : null}
                                    {type === 'Tracks' ? <td>{item.spotify_artist_string}</td> : null}
                                    <td>{item.spotifyID}</td>
                                    {type === 'Tracks' ? <td>{item.isrc}</td> : null}
                                    {type === 'Artists' ? <td>{item.type}</td> : null}
                                    {type === 'Artists' ? <td>{item.popularity}</td> : null}
                                    {type === 'Artists' ? <td>{item.followers}</td> : null}
                                    {type === 'Artists' ? <td>{item.genre_string}</td> : null}
                                    {type === 'Playlists' ? <td>{item.public ? <CheckBoxIcon/> : <NotInterestedIcon/>}</td> : null}
                                    {type === 'Playlists' ? <td>{item.tracks_total}</td> : null}
                                    {type === 'Playlists' ? <td>{item.collaborative ? <CheckBoxIcon/> : <NotInterestedIcon/>}</td> : null}
                                </React.Fragment> : 
                                <React.Fragment>
                                    <td>
                                        <img className={'img-table'} src={`https://flagcdn.com/w20/${item.country.toLowerCase()}.png`}></img>
                                    </td>
                                    <td>{item.followers}</td>
                                    <td>{item.product}</td>
                                </React.Fragment>}
                            </tr>
                        )
                    })}
                </table>
                {renderPagination()}
            </React.Fragment>
        )
    }

    function renderListEntriesData(data, title, resultCount, participantCount, type, index) {
        return(
            <div>
                {renderBackButton()}
                <h1 data-heading='true' class='settings-title'>
                    Results - {title}
                </h1>
                <h1 className="user-result-headline-subtitle">
                    Survey Name: {props.surveyName} <br></br> 
                    Survey ID: {props.surveyID}
                </h1>
                <h2>
                    {resultCount} results from {participantCount} participants
                </h2>
                <div className={'saved-tracks-dashboard-outer'}>
                    {type === 'Tracks' ? renderTable(data, 'Tracks', index)
                    : type === 'Artists' ? renderTable(data, 'Artists', index) 
                    : type === 'Playlists' ? renderTable(data, 'Playlists', index) : renderTable(data, 'Profile', index)}
                </div>
            </div>
        )
    }

    function renderResultsCard(title) {
        return(
            <React.Fragment>
                <h1 data-heading='true' class='result-card-title'>
                    {title}
                </h1>
            </React.Fragment>
        )
    }

    function clickListEntryCard(index) {
        props.setFirstPage(false)
        let items = [...listEntriesShow]
        items[index] = true
        setListEntriesShow(items)
        setPages(Math.ceil(props.data.rowGesamt[index][0].length / 100))
    }

    function deleteResults(surveyID){
        fetch("/api/delete-only-results" + "?surveyid=" + surveyID)
        .then((response) => response.json())
        .then((data) => {
            location.reload();
        });
    }

    return(
        <React.Fragment>
            {dataAudioFeatures.length===0 ? 
            <React.Fragment>
                <div className='buttons-result-wrapper'>
                    {fileData ?
                        <div className={'button-result-user-container'}>
                            <CSVLink
                                className={'csv-link-export-file'}
                                data={fileData}
                                filename={"Spotivey_Result_" + props.surveyID + "_Data.csv"}
                                target="_blank"
                                separator={";"}
                            >   
                                <div className={'button-csv-inner-container'}>
                                    <div className={'button-csv-title'}>
                                        Export CSV-File
                                    </div>
                                    <div className={'button-csv-icon'}>
                                        <FileDownloadIcon/>
                                    </div>
                                </div>
                            </CSVLink>
                            <Button
                                onClick={() => {setOpenDeleteDialog(true)}}
                                variant={'outlined'}
                                startIcon={<DeleteOutlinedIcon />}
                            >
                                Delete Results
                            </Button>
                        </div> : null
                    }
                </div>
                {props.firstPage ? 
                <div className={'render-result-card-container'}>
                    {props.data.rowGesamt.map((item, index) => {
                        return(
                            <React.Fragment>
                            {item[0]?.length ? 
                            <div 
                                className={'render-result-card'}
                                onClick={() => {
                                    clickListEntryCard(index)
                                }}
                            >
                                {item[0]?.length !== 0 ? renderResultsCard(item[1]) : null}
                            </div> : null }
                            </React.Fragment>
                        )
                    })}
                </div> : 
                <div>
                    {renderListEntriesData(
                        props.data.rowGesamt[listEntriesShow.indexOf(true)][0].sort((a, b) => parseFloat(a.id) - parseFloat(b.id)), 
                        props.data.rowGesamt[listEntriesShow.indexOf(true)][1], 
                        props.data.rowGesamt[listEntriesShow.indexOf(true)][2].resultCount, 
                        props.data.rowGesamt[listEntriesShow.indexOf(true)][2].participantCount, 
                        props.data.rowGesamt[listEntriesShow.indexOf(true)][3],
                        listEntriesShow.indexOf(true)
                    )}
                </div>
                }
                <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>
                        {"Delete Results?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you really want to delete all results for the survey with ID {props.surveyID}? 
                            All results will be removed and you will not be able to get them back.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Disagree</Button>
                        <Button onClick={() => {deleteResults(props.surveyID)}}>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment> : 
            AudioFeaturesDashboard(dataAudioFeatures, setDataAudioFeatures, chartRef)}
        </React.Fragment>
    )
}