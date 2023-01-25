export default function getXMLOutputSingleQuestion(
        checkArray, idName, IDDataField, selectedOptionValue, questionType, questionGroupText
    ) {
    let xmlRow = [
        {data: '<?xml version="1.0" encoding="UTF-8"?>'},
        {data: '<document>'},
        {data: '    <LimeSurveyDocType>Group</LimeSurveyDocType>'},
        {data: '    <DBVersion>355</DBVersion>'},
        {data: '    <languages>'}, 
        {data: '        <language>de</language>'},
        {data: '    </languages>'},
        {data: '    <groups>'},
        {data: '        <fields>'},
        {data: '            <fieldname>gid</fieldname>'},
        {data: '            <fieldname>sid</fieldname>'},
        {data: '            <fieldname>group_name</fieldname>'},
        {data: '            <fieldname>group_order</fieldname>'},
        {data: '            <fieldname>description</fieldname>'},
        {data: '            <fieldname>language</fieldname>'},
        {data: '            <fieldname>randomization_group</fieldname>'},
        {data: '            <fieldname>grelevance</fieldname>'},
        {data: '        </fields>'},
        {data: '        <rows>'},
        {data: '            <row>'},
        {data: '                <gid><![CDATA[1]]></gid>'},
        {data: '                <sid><![CDATA[1]]></sid>'},
        {data: `                <group_name><![CDATA[SV${idName}]]></group_name>`},
        {data: '                <group_order><![CDATA[1]]></group_order>'},
        {data: `<description><![CDATA[In this group, we will ask you about your Spotify ${questionGroupText}.]]></description>`},
        {data: '                <language><![CDATA[de]]></language>'},
        {data: '                <randomization_group/>'},
        {data: '                <grelevance/>'},
        {data: '            </row>'},
        {data: '        </rows>'},
        {data: '    </groups>'},
        {data: '    <questions>'},
        {data: '        <fields>'},
        {data: '            <fieldname>gid</fieldname>'},
        {data: '            <fieldname>parent_qid</fieldname>'},
        {data: '            <fieldname>sid</fieldname>'},
        {data: '            <fieldname>gid</fieldname>'},
        {data: '            <fieldname>type</fieldname>'},
        {data: '            <fieldname>title</fieldname>'},
        {data: '            <fieldname>question</fieldname>'},
        {data: '            <fieldname>preg</fieldname>'},
        {data: '            <fieldname>help</fieldname>'},
        {data: '            <fieldname>other</fieldname>'},
        {data: '            <fieldname>mandatory</fieldname>'},
        {data: '            <fieldname>question_order</fieldname>'},
        {data: '            <fieldname>language</fieldname>'},
        {data: '           <fieldname>scale_id</fieldname>'},
        {data: '           <fieldname>same_de[fault</fieldname>'},
        {data: '           <fieldname>relevance</fieldname>'},
        {data: '           <fieldname>modulename</fieldname>'},
        {data: '       </fields>'},
        {data: '       <rows>'},
        {data: '           <row>'},
        {data: `               <qid><![CDATA[1]]></qid>`},
        {data: '               <parent_qid><![CDATA[0]]></parent_qid>'},
        {data: '               <sid><![CDATA[1]]></sid>'},
        {data: '               <gid><![CDATA[1]]></gid>'},
        {data: '               <type><![CDATA[S]]></type>'},
        {data: `               <title><![CDATA[partID]]></title>`},
        {data: '               <question><![CDATA[partID]]></question>'},
        {data: '               <preg/>'},
        {data: '               <help/>'},
        {data: '               <other><![CDATA[N]]></other>'},
        {data: '               <mandatory><![CDATA[N]]></mandatory>'},
        {data: `               <question_order><![CDATA[0]]></question_order>`},
        {data: '               <language><![CDATA[de]]></language>'},
        {data: '               <scale_id><![CDATA[0]]></scale_id>'},
        {data: '               <same_default><![CDATA[0]]></same_default>'},
        {data: '               <relevance><![CDATA[1]]></relevance>'},
        {data: '               <modulename/>'},
        {data: '           </row>'},
    ]
    let questionID = 1
    if (questionType === 'single'){
        for(let i=0; i<selectedOptionValue; i++){
            let idNumber = i<9 ? '0' + (i+1).toString() : i+1
            let CodeSnippetString = ''
            let relevanceString = '(( '
            let questionStart = `Question ${questionGroupText} ${i+1} (Display:`
            for(let j=0; j<checkArray.length; j++){
                if(checkArray[j]){
                    questionID = questionID + 1
                    let question = `<br></br>{SV${idName+IDDataField[j]}${idNumber}}`
                    if (IDDataField[j] === 'Cover'){
                        question = `<br></br><img alt="Picture not found" src="{SV${idName+IDDataField[j]}${idNumber}}" width="100" height="100"/>`
                    } else if (IDDataField[j] === 'Player') {
                        question = `<br></br><iframe style="border-radius:12px" src="{SV${idName+IDDataField[j]}${idNumber}}" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
                    }
                    CodeSnippetString += question
                    questionStart += ' ' + IDDataField[j]
                    relevanceString += relevanceString != '(( ' ? ' && ' : ''
                    relevanceString += `! is_empty(SV${idName+IDDataField[j]}${idNumber}.NAOK)`
                    xmlRow.push(
                        {data: '           <row>'},
                        {data: `               <qid><![CDATA[${questionID}]]></qid>`},
                        {data: '               <parent_qid><![CDATA[0]]></parent_qid>'},
                        {data: '               <sid><![CDATA[1]]></sid>'},
                        {data: '               <gid><![CDATA[1]]></gid>'},
                        {data: '               <type><![CDATA[S]]></type>'},
                        {data: `               <title><![CDATA[SV${idName+IDDataField[j]}${idNumber}]]></title>`},
                        {data: '               <question><![CDATA[]]></question>'},
                        {data: '               <preg/>'},
                        {data: '               <help/>'},
                        {data: '               <other><![CDATA[N]]></other>'},
                        {data: '               <mandatory><![CDATA[N]]></mandatory>'},
                        {data: `               <question_order><![CDATA[${questionID}]]></question_order>`},
                        {data: '               <language><![CDATA[de]]></language>'},
                        {data: '               <scale_id><![CDATA[0]]></scale_id>'},
                        {data: '               <same_default><![CDATA[0]]></same_default>'},
                        {data: '               <relevance><![CDATA[1]]></relevance>'},
                        {data: '               <modulename/>'},
                        {data: '           </row>'},
                    )
                }
                if (checkArray.includes(true) && j === checkArray.length - 1){
                    questionID = questionID + 1
                    xmlRow.push(
                        {data: '           <row>'},
                        {data: `               <qid><![CDATA[${questionID}]]></qid>`},
                        {data: '               <parent_qid><![CDATA[0]]></parent_qid>'},
                        {data: '               <sid><![CDATA[1]]></sid>'},
                        {data: '               <gid><![CDATA[1]]></gid>'},
                        {data: '               <type><![CDATA[S]]></type>'},
                        {data: `               <title><![CDATA[SV${idName}Quest${idNumber}]]></title>`},
                        {data: `               <question><![CDATA[${questionStart}) ${CodeSnippetString}]]></question>`},
                        {data: '               <preg/>'},
                        {data: '               <help/>'},
                        {data: '               <other><![CDATA[N]]></other>'},
                        {data: '               <mandatory><![CDATA[N]]></mandatory>'},
                        {data: `               <question_order><![CDATA[${questionID}]]></question_order>`},
                        {data: '               <language><![CDATA[de]]></language>'},
                        {data: '               <scale_id><![CDATA[0]]></scale_id>'},
                        {data: '               <same_default><![CDATA[0]]></same_default>'},
                        {data: `               <relevance><![CDATA[${relevanceString}))]]></relevance>`},
                        {data: '               <modulename/>'},
                        {data: '           </row>'}
                    )
                }
            }
        }
    }
    if (questionType === 'matrix'){
        let relevanceString = '(( '
        for(let i=0; i<selectedOptionValue; i++){
            let idNumber = i<9 ? '0' + (i+1).toString() : i+1
            for(let j=0; j<checkArray.length; j++){
                if(checkArray[j]){
                    questionID = questionID + 1
                    relevanceString += relevanceString != '(( ' ? '+' : ''
                    relevanceString += `SV${idName+IDDataField[j]}${idNumber}.NAOK`
                    xmlRow.push(
                        {data: '           <row>'},
                        {data: `               <qid><![CDATA[${questionID}]]></qid>`},
                        {data: '               <parent_qid><![CDATA[0]]></parent_qid>'},
                        {data: '               <sid><![CDATA[1]]></sid>'},
                        {data: '               <gid><![CDATA[1]]></gid>'},
                        {data: '               <type><![CDATA[S]]></type>'},
                        {data: `               <title><![CDATA[SV${idName+IDDataField[j]}${idNumber}]]></title>`},
                        {data: '               <question><![CDATA[]]></question>'},
                        {data: '               <preg/>'},
                        {data: '               <help/>'},
                        {data: '               <other><![CDATA[N]]></other>'},
                        {data: '               <mandatory><![CDATA[N]]></mandatory>'},
                        {data: `               <question_order><![CDATA[${questionID}]]></question_order>`},
                        {data: '               <language><![CDATA[de]]></language>'},
                        {data: '               <scale_id><![CDATA[0]]></scale_id>'},
                        {data: '               <same_default><![CDATA[0]]></same_default>'},
                        {data: '               <relevance><![CDATA[1]]></relevance>'},
                        {data: '               <modulename/>'},
                        {data: '           </row>'},
                    )
                }
            }
        }
        let MatTitle = `SV${idName}MatQuest`
        xmlRow.push(
            {data: '           <row>'},
            {data: `               <qid><![CDATA[${questionID+1}]]></qid>`},
            {data: '               <parent_qid><![CDATA[0]]></parent_qid>'},
            {data: '               <sid><![CDATA[1]]></sid>'},
            {data: '               <gid><![CDATA[1]]></gid>'},
            {data: `               <type><![CDATA[A]]></type>`},
            {data: `               <title><![CDATA[${MatTitle}]]></title>`},
            {data: `               <question><![CDATA[Please answer the question regarding every single of your ${questionGroupText}]]></question>`},
            {data: '               <preg/>'},
            {data: '               <help/>'},
            {data: '               <other><![CDATA[N]]></other>'},
            {data: '               <mandatory><![CDATA[N]]></mandatory>'},
            {data: `               <question_order><![CDATA[${questionID+1}]]></question_order>`},
            {data: '               <language><![CDATA[de]]></language>'},
            {data: '               <scale_id><![CDATA[0]]></scale_id>'},
            {data: '               <same_default><![CDATA[0]]></same_default>'},
            {data: `               <relevance><![CDATA[${relevanceString} != ''))]]></relevance>`},
            {data: '               <modulename/>'},
            {data: '           </row>'}
        )
    }
    xmlRow.push(
        {data: '       </rows>'},
        {data: '    </questions>'}
    )
    if (questionType === 'matrix'){
        questionID = questionID + 1
        let questionIDMatrix = questionID
        xmlRow.push(  
            {data: '    <subquestions>'},
            {data: '        <fields>'},
            {data: '            <fieldname>qid</fieldname>'},
            {data: '            <fieldname>parent_qid</fieldname>'},
            {data: '            <fieldname>sid</fieldname>'},
            {data: '            <fieldname>gid</fieldname>'},
            {data: '            <fieldname>type</fieldname>'},
            {data: '            <fieldname>title</fieldname>'},
            {data: '            <fieldname>question</fieldname>'},
            {data: '            <fieldname>preg</fieldname>'},
            {data: '            <fieldname>help</fieldname>'},
            {data: '            <fieldname>other</fieldname>'},
            {data: '            <fieldname>mandatory</fieldname>'},
            {data: '            <fieldname>question_order</fieldname>'},
            {data: '            <fieldname>language</fieldname>'},
            {data: '            <fieldname>scale_id</fieldname>'},
            {data: '            <fieldname>same_default</fieldname>'},
            {data: '            <fieldname>relevance</fieldname>'},
            {data: '            <fieldname>modulename</fieldname>'},
            {data: '        </fields>'},
            {data: '       <rows>'}
        )
        for(let i=0; i<selectedOptionValue; i++){
            let idNumber = i<9 ? '0' + (i+1).toString() : i+1
            let CodeSnippetString = ''
            let relevanceString = '(( '
            let questionStart = `Question ${questionGroupText} ${i+1} (Display:`
            for(let j=0; j<checkArray.length; j++){
                if(checkArray[j]){
                    let question = `<br></br>{SV${idName+IDDataField[j]}${idNumber}}`
                    if (IDDataField[j] === 'Cover'){
                        question = `<br></br><img alt="Picture not found" src="{SV${idName+IDDataField[j]}${idNumber}}" width="100" height="100"/>`
                    } else if (IDDataField[j] === 'Player') {
                        question = `<br></br><iframe style="border-radius:12px" src="{SV${idName+IDDataField[j]}${idNumber}}" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
                    }
                    CodeSnippetString += question
                    questionStart += ' ' + IDDataField[j]
                    relevanceString += relevanceString != '(( ' ? ' && ' : ''
                    relevanceString += `! is_empty(SV${idName+IDDataField[j]}${idNumber}.NAOK)`
                }
                if (checkArray.includes(true) && j === checkArray.length - 1){
                    questionID = questionID + 1
                    xmlRow.push(
                        {data: '           <row>'},
                        {data: `               <qid><![CDATA[${questionID}]]></qid>`},
                        {data: `               <parent_qid><![CDATA[${questionIDMatrix}]]></parent_qid>`},
                        {data: '               <sid><![CDATA[1]]></sid>'},
                        {data: '               <gid><![CDATA[1]]></gid>'},
                        {data: '               <type><![CDATA[S]]></type>'},
                        {data: `               <title><![CDATA[Q${idNumber}]]></title>`},
                        {data: `               <question><![CDATA[]]></question>`},
                        {data: '               <preg/>'},
                        {data: '               <help/>'},
                        {data: '               <other><![CDATA[N]]></other>'},
                        {data: '               <mandatory><![CDATA[N]]></mandatory>'},
                        {data: `               <question_order><![CDATA[${questionID}]]></question_order>`},
                        {data: '               <language><![CDATA[de]]></language>'},
                        {data: '               <scale_id><![CDATA[0]]></scale_id>'},
                        {data: '               <same_default><![CDATA[0]]></same_default>'},
                        {data: `               <relevance><![CDATA[${relevanceString}))]]></relevance>`},
                        {data: '               <modulename/>'},
                        {data: '           </row>'}
                    )
                }
            }
        }
        xmlRow.push(
            {data: '       </rows>'},
            {data: '    </subquestions>'}
        )
    }
    xmlRow.push(  
        {data: '    <question_attributes>'},
        {data: '        <fields>'},
        {data: '            <fieldname>gid</fieldname>'},
        {data: '            <fieldname>attribute</fieldname>'},
        {data: '            <fieldname>value</fieldname>'},
        {data: '            <fieldname>language</fieldname>'},
        {data: '        </fields>'},
        {data: '       <rows>'},
        {data: '           <row>'},
        {data: `               <qid><![CDATA[1]]></qid>`},
        {data: '               <attribute><![CDATA[hidden]]></attribute>'},
        {data: '               <value><![CDATA[1]]></value>'},
        {data: '           </row>'},
    )
    questionID = 1
    if (questionType === 'single') {
        for(let i=0; i<selectedOptionValue; i++){
            for(let j=0; j<checkArray.length; j++){
                if(checkArray[j]){
                    questionID = questionID + 1
                    xmlRow.push(
                        {data: '           <row>'},
                        {data: `               <qid><![CDATA[${questionID}]]></qid>`},
                        {data: '               <attribute><![CDATA[hidden]]></attribute>'},
                        {data: '               <value><![CDATA[1]]></value>'},
                        {data: '           </row>'},
                    )
                    
                }
                if (checkArray.includes(true) && j === checkArray.length - 1){
                    questionID = questionID + 1
                }
            }
        }
    } else {
        for(let i=0; i<selectedOptionValue; i++){
            for(let j=0; j<checkArray.length; j++){
                if(checkArray[j]){
                    questionID = questionID + 1
                    xmlRow.push(
                        {data: '           <row>'},
                        {data: `               <qid><![CDATA[${questionID}]]></qid>`},
                        {data: '               <attribute><![CDATA[hidden]]></attribute>'},
                        {data: '               <value><![CDATA[1]]></value>'},
                        {data: '           </row>'},
                    )
                    
                }
            }
        }
    }
    xmlRow.push(
        {data: '       </rows>'},
        {data: '    </question_attributes>'},
        {data: '</document>'}
    )
    return xmlRow
}