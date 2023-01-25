import * as React from "react";
import headerSettings from '../Header/headerSettings';
import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import ResultContent from "./ResultContentUserPageComponent";
import {CircularProgress, IconButton, Divider} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function UserResultPage(props) {

    const navigate = useNavigate()

    const [username, setUsername] = useState(null)
    const [surveyID, setSurveyID] = useState(null)
    const [surveyName, setSurveyName] = useState(null)
    const [resultsData, setResultsData] = useState([])
    const [resultsID, setResultsID] = useState([])
    const [resultsName, setResultsName] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [surveyIDRows, setSurveyIDRows] = useState([])
    const [checkThereAreData, setCheckThereAreData] = useState([])

    const [firstPage, setFirstPage] = useState(true)

    const [indexResultsCard, setIndexResultsCard] = useState(-1)

    useEffect(() => {
        async function settingsInRoom() {
            fetch("/api/get-settingslist" + "?username=" + username).then(response => response.json())
            .then((data) => {
                if (!data.error){
                    setSurveyIDRows(data.data)
                }
            });
        }
        if(username){
          settingsInRoom();
        }
      }, [username])

    useEffect(() => {
        async function userInRoom() {
            fetch("/api/user-in-room")
              .then((response) => response.json())
              .then((data) => {
                if (data.username === null){
                    navigate('/login')
                } else {
                  setUsername(data.username)
                  fetch("/spotify/is-authenticated")
                    .then((response) => response.json())
                    .then((data) => {
                        if (!data.status){
                            fetch("/spotify/get-auth-url2")
                            .then((response) => response.json())
                            .then((data) => {
                                window.location.replace(data.url);
                            });
                        }
                    })
                }
              });
          }
        userInRoom();
    }, [])

    useEffect(() => {
        if (indexResultsCard !== -1){
            setLoading(true)
        }
    }, [indexResultsCard])

    useEffect(() => {
        let promises = [];
        if (surveyIDRows.length > 0){
            for (let zaehler=0; zaehler<surveyIDRows.length; zaehler++){
                promises.push(fetch("/api/get-resultlist" + "?surveyid=" + surveyIDRows[zaehler].umfrageID)
                    .then(response => response.json())
                    .then((data) => {
                        if (!data.error){
                            setResultsData(resultsData => [...resultsData, data])
                            setCheckThereAreData(checkThereAreData => [...checkThereAreData,[data.rowGesamt[0][0].length > 0, data.rowGesamt[1][0].length > 0,
                                data.rowGesamt[2][0].length > 0, data.rowGesamt[3][0].length > 0,
                                data.rowGesamt[4][0].length > 0, data.rowGesamt[5][0].length > 0, data.rowGesamt[6][0].length > 0]])
                            setResultsID(resultID => [...resultID, surveyIDRows[zaehler].umfrageID])
                            setResultsName(resultName => [...resultName, surveyIDRows[zaehler].nameUmfrage])
                        }
                    }))
            }
        }
    }, [surveyIDRows])

    useEffect(() => {
        if (resultsData.length > 0 && checkThereAreData.length > 0 && resultsID.length > 0 && resultsName.length > 0 ){
            setLoading2(true)
        }
    }, [resultsData, checkThereAreData, resultsID, resultsName])

    function renderLoading () {
        return (
            <div className='loading'>
                <CircularProgress />
            </div>
        )
    }

    function renderBackButton() {
        return(
            <div className={'back-button-result'}>
                <IconButton
                    onClick={() => {
                        setSurveyID(null)
                    }}
                >
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </div>
        )
    }

    function renderDashboardCard(listItem) {
        return(
            <React.Fragment>
                <img
                    className="result-list-img2"
                    src={listItem.cover}
                    alt="Cover not found"
                />
            </React.Fragment>
        )
    }

    function shuffle(array) {
        return (
            array.sort(() => Math.random() - 0.5)
        )
    }

    function getResultListSmall(list){
        return(
            <React.Fragment>
                <div className='dashboard-container'>
                    {list.map((listItem) => {
                        return(
                            <div className={'dashboard-card'}>
                                {renderDashboardCard(listItem)}
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    function getSurveyID(){
        return(
            <React.Fragment>
                <div className={'settings-overview-title'}>
                    <h1 className="user-result-headline">
                        Results
                    </h1>
                </div>
                <h2 className="user-result-subtitle">
                    Select a Survey ID to view the results of the survey.
                </h2>
                {loading2 ?
                <React.Fragment>
                {resultsID.map((item, index) => {
                    return(
                        <React.Fragment>
                            <div 
                                className={'survey-id-check-result-list-container'}
                                onClick={(e) => {
                                    setSurveyID(item)
                                    setIndexResultsCard(index)
                                    setSurveyName(resultsName[index])
                                }}
                            >
                                <div className={'card-content-name'}>
                                    <h5 class={'card-content-survey-name'}>
                                        {resultsName[index]}
                                    </h5>
                                    <p className={'card-content-survey-id'}>
                                        {item}
                                    </p>
                                </div>
                                <div style={{display: 'flex'}}>
                                    {checkThereAreData[index].slice(0,6)?.map((check, checkIndex) => {
                                        if(check){
                                            return(
                                                <React.Fragment>
                                                    <div className="result-card-choose-id-container">
                                                    {checkIndex !== 0 ? <Divider orientation="vertical" flexItem /> : null}
                                                    {getResultListSmall(shuffle(resultsData[index].rowGesamt[checkIndex][0]).slice(0,16))}
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
                </React.Fragment> : null }
            </React.Fragment>
        )
    }

    function resultHeadline() {
        return(
            <React.Fragment>
                <div className={'settings-overview-title'}>
                <h1 className={"user-result-headline"}>
                    Results
                </h1>
                <h1 className="user-result-headline-subtitle">
                    Survey Name: {surveyName} <br></br> 
                    Survey ID: {surveyID}
                </h1>
                </div>
                {checkThereAreData[indexResultsCard]?.includes(true) ? 
                <h2 className="user-result-subtitle">
                    Select a data field to view the related results.
                </h2> :
                <h2 className="user-result-subtitle">
                    There are no results yet, start a survey and use Spotivey to get results.
                </h2>
                }
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <div class="setting-header">
                <header class="setting-header-inner">
                <div class="setting-header-content-container">
                    <div class="setting-header-content-container-inner">
                    {headerSettings()}
                    </div>
                </div>
                </header>
            </div>
            <div class='setting-page-main'>
                <div class="setting-content-main">
                    <div class='setting-content-wrapper'>
                    <div class="setting-content-wrapper-inner">
                        <div class="setting-two-content-outer">
                        <div class='card-two-content-inner-container'>
                            <div class='card-content'>
                                {surveyID ? 
                                <React.Fragment>
                                    {loading ? 
                                        resultsData.length>0 ? 
                                            <React.Fragment>
                                                {firstPage ?
                                                    <React.Fragment>
                                                        {renderBackButton()}
                                                        {resultHeadline()}
                                                    </React.Fragment> : null
                                                }
                                                <ResultContent 
                                                    username={username} 
                                                    data={resultsData[indexResultsCard]} 
                                                    surveyID={surveyID}
                                                    firstPage={firstPage}
                                                    setFirstPage={setFirstPage}
                                                    surveyName={surveyName}
                                                />
                                            </React.Fragment> : 
                                            null :
                                        renderLoading()
                                    }
                                </React.Fragment> : 
                                    <React.Fragment>
                                        {getSurveyID()}
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
           
    )
}