import * as React from "react";
import { json } from "react-router-dom";

export default function getGetParams(
    questionTypeCheck, selectedOption, dataFieldsCheck, idName, idTracks, idArtists, idPlaylists, dataAll, endURLSecondSurvey, checkArray
){
    let idsAll = [idTracks, idArtists, idPlaylists]
    let stringParam = ''

    for (let i=0; i<selectedOption.length; i++){ //loop all selectedOption
        if (selectedOption[i] !== 0){ //only bigger than 0
            let indexDataFieldType = 0 
            let indexTwo = i
            if(!(i<3)){  //tracks, artists, playlists?
                if (i===5){ //playlist
                    indexDataFieldType = 2
                    indexTwo = i - 5
                } else { //artists
                    indexDataFieldType = 1
                    indexTwo = i - 3
                }
            }
            let getIDs = []
            for(let indexZaehler = 0; indexZaehler < dataFieldsCheck[indexDataFieldType][indexTwo].length; indexZaehler++){
                if (dataFieldsCheck[indexDataFieldType][indexTwo][indexZaehler] === true){
                    getIDs.push(idsAll[indexDataFieldType][indexZaehler])
                }
            } //which ids were clicked
            let questionID = 0
            let id = idName[i] // which type?
            let questionTypeSingleCheck = questionTypeCheck[indexDataFieldType][indexTwo][0] //single Questiontype?
            let questionName = ''

            let dataAllOnlyCheck = checkArray[i].map((checkItem, index) => {
                if (checkItem == true){
                    return(
                        dataAll[i][index]
                    )
                }}).filter(item => item);

            let checkArrayOnlyCheck = checkArray[i].filter(item => item == true)

            for (let j=0; j<selectedOption[i]; j++){ //loop number selected Option
                //all DataFields (e.g. name)
                for (let idZaehler = 0; idZaehler<getIDs.length; idZaehler++){

                    if (checkArrayOnlyCheck.length < selectedOption[i]){
                        let arrayConcat = Array(selectedOption[i]-checkArrayOnlyCheck.length).fill(false)
                        checkArrayOnlyCheck.concat(arrayConcat)
                    }
                    
                    if (checkArrayOnlyCheck[j]){
                        stringParam += endURLSecondSurvey.search('\\?') === -1 && j===0 ? '?' : '&'
                        questionID = j<9 ? '0' + (j+1).toString() : j+1
                        questionName = 'SV'+id+getIDs[idZaehler]+questionID //survey Question Name
                    
                        //Tracks
                        if (indexDataFieldType === 0){
                            if (getIDs[idZaehler] === 'SpotID'){
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].spotify_id
                            } else if (getIDs[idZaehler] === 'Title'){
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].track_name
                            } else if (getIDs[idZaehler] === 'Artist'){
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].spotify_artist_string.join('')
                            } else if (getIDs[idZaehler] === 'Label') {
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].albumLabel
                            } else if (getIDs[idZaehler] === 'Cover') {
                                let coverSrc = encodeURIComponent(dataAllOnlyCheck[j].image_url).replaceAll('.', '%2E')
                                stringParam += questionName + '=' + coverSrc
                            } else if (getIDs[idZaehler] === 'RelDat') {
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].releaseDate
                            } else {
                                let playerSrc = encodeURIComponent(
                                    'https://open.spotify.com/embed/track/' + dataAllOnlyCheck[j].spotify_id
                                    ).replaceAll('.', '%2E')
                                stringParam += questionName + '=' + playerSrc
                            }
                        } //Artists
                        else if (indexDataFieldType === 1) {
                            if (getIDs[idZaehler] === 'SpotID') {
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].id
                            } else if (getIDs[idZaehler] === 'Title') {
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].artist
                            } else if (getIDs[idZaehler] === 'Cover') {
                                let coverSrc = encodeURIComponent(dataAllOnlyCheck[j].image_url).replaceAll('.', '%2E')
                                stringParam += questionName + '=' + coverSrc
                            } else {
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].genre_string
                            }
                        } //playlists
                        else {
                            if (getIDs[idZaehler] === 'SpotID'){
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].id
                            } else if (getIDs[idZaehler] === 'Cover') {
                                let coverSrc = encodeURIComponent(dataAllOnlyCheck[j].playlists_cover).replaceAll('.', '%2E')
                                stringParam += questionName + '=' + coverSrc
                            } else {
                                stringParam += questionName + '=' + dataAllOnlyCheck[j].name
                            }
                        }
                    }
                }
            }
        }
    }

    return stringParam
}