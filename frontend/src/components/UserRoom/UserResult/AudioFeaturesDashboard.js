import * as React from "react";
import { Line } from 'react-chartjs-2';
import { chartOptions } from './lineOptionsAudioFeatures';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chart from 'chart.js/auto';

export default function AudioFeaturesDashboard(data, setData, chartRef) {

    function renderDashboardAudioFeatures(title, dataList, label) {
        const {lineOptions, dataOption} = chartOptions(dataList, title, label)
        return(
                <div className={'dashboard-audio-feature-card'}>
                    <div>
                        <Line
                            ref={chartRef}
                            datasetIdKey='id'
                            data={dataOption}
                            options={lineOptions}
                            height={250}
                        />
                    </div>
                </div>
            
        )
    }

    return(
        <React.Fragment>
            <div className={'back-button-result'}>
                <IconButton
                    onClick={() => {setData([])}}
                >
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </div>
            <h1 data-heading='true' class='settings-title'>
                Audio Features
            </h1>
            <div className={'saved-tracks-dashboard-outer'}>
                {data ?  
                <div className='dashboard-audio-feature-container'>
                    {renderDashboardAudioFeatures('danceability', data.hist_danceability, data.hist_x)}
                    {renderDashboardAudioFeatures('acousticness', data.hist_acousticness, data.hist_x)}
                    {renderDashboardAudioFeatures('energy', data.hist_energy, data.hist_x)}
                    {renderDashboardAudioFeatures('loudness', data.hist_loudness, data.loudness_x)}
                    {renderDashboardAudioFeatures('speechiness', data.hist_speechiness, data.hist_x)}
                    {renderDashboardAudioFeatures('instrumentalness', data.hist_instrumentalness, data.hist_x)}
                    {renderDashboardAudioFeatures('liveness', data.hist_liveness, data.hist_x)}
                    {renderDashboardAudioFeatures('valence', data.hist_valence, data.hist_x)}
                </div> : null }
            </div>
        </React.Fragment>
        
    )
}