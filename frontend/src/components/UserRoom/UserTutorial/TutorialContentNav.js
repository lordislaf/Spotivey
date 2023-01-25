import React from "react";

export default function TutorialContentNav (props) {
    return(
        <React.Fragment>
            <ul className="tutorial-nav-container">
                <li className="tutorial-nav-list">
                    <a href='#requirements-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 'Anforderungen' : 'Requirements'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#general-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 'Allgemeine Informationen' : 'General information'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#retrieval-settings-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 'Retrieval-Profil-Einstellungen' : 'Retrieval-Settings'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#spotify-information-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 
                            'Spotify Informationen, die konfiguriert werden können' : 
                            'Spotify information that can be configured'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#followup-settings-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 'FollowUp-Einstellungen' : 'FollowUp-Settings'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#results-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 'Ergebnis-Seite' : 'Results Page'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#testphase-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 'Test- und Feldphase' : 'Test and field phase'}
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#study-participants-tutorial' className="tutorial-nav-list-item">
                        {props.lang === 'de' ? 
                            'Spotivey-Workflow aus Sicht von Studienteilnehmer*innen' : 
                            'Spotivey workflow from the perspective of study participants'}
                    </a>
                </li>
            </ul>
        </React.Fragment>
    )
}