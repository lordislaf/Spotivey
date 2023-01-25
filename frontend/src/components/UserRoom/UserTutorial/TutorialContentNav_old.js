import React from "react";

export default function TutorialContentNav () {
    return(
        <React.Fragment>
            <ul className="tutorial-nav-container">
                <li className="tutorial-nav-list">
                    <a href='#requirements-tutorial' className="tutorial-nav-list-item">
                        Requirements
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#start-tutorial' className="tutorial-nav-list-item">
                        Now it can start - Create first settings
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#ready-tutorial' className="tutorial-nav-list-item">
                        Ready to use - Start your first survey and get results
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#results-tutorial' className="tutorial-nav-list-item">
                        Get Results
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#settings-two-tutorial' className="tutorial-nav-list-item">
                        Create Settings (2nd Survey) - Optional
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#import-question-group' className="tutorial-nav-list-item">
                        Import Question Group into LimeSurvey
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#done-tutorial' className="tutorial-nav-list-item">
                        Done - You have made it
                    </a>
                </li>
                <li className="tutorial-nav-list">
                    <hr class="solid"></hr>
                </li>
                <li className="tutorial-nav-list">
                    <a href='#panel-tutorial' className="tutorial-nav-list-item">
                        Connection to panel provider
                    </a>
                </li>
            </ul>
        </React.Fragment>
    )
}