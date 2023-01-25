import React from "react";

export const chartOptions = (audioFeaturesData, title, label) => {

    const lineOptions = {
        plugins: {
            title: {
                display: true,
                text: `Spotify Audio Features density - ${title.toString()}`
            },
            legend: {
                display: false
            },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: `${title.toString()}`
            }
          },
          y: {
            min: 0,
            display:true,
            title:{
              display:true,
              text: 'density'
            }
          },
        },
    }

    function upDown(ctx, value1, value2, value3, title) {
      if(title === 'speechiness'){
        if(ctx.p1DataIndex<7) { //bis ungefähr 0.33
          return(value1)
        }
        if(ctx.p1DataIndex>=7 && ctx.p1DataIndex<14) { //bis ungefähr 0.66
          return(value2)
        } else {
          return(value3)
        }
      } 
      if(title === 'liveness'){
        if(ctx.p1DataIndex<17) { //bis ungefähr 0.8
          return(value1)
        } else {
          return(value3)
        }
      } else {
        return(value2)
      }
    }

    const data = {
        labels: label,
        datasets: [{
            id: 1,
            fill: true,
            //cubicInterpolationMode: 'monotone',
            tension: 0.1,
            data: audioFeaturesData,
            borderColor: 'rgba(196, 13, 30, 0)',
            backgroundColor: 'rgba(196, 13, 30, 0)',
            segment: {
              backgroundColor: ctx => upDown(
                ctx, 'rgba(237, 182, 187)', 'rgba(196, 13, 30, 0.7)', 'rgba(196, 13, 30, 1)', title
              ),
            }
        }],
    }
    return {
        lineOptions: lineOptions,
        dataOption: data,
    }
}