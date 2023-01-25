import React from "react";
import { Link } from "react-router-dom";

export default function SpotiveyFooter (props){
    return(
        <React.Fragment>
            <footer class='spotivey-footer'>
                <nav class='footer-nav-container'>
                    <div className="footer-nav-div">
                        {!props.participant ? 
                            <ul className="footer-nav-ul">
                                <li className="footer-nav-li">
                                    <a className="footer-nav-li-item" href={'/privacy'}>
                                        Privacy-Center
                                    </a>
                                </li>
                            </ul> : 
                            null 
                        }
                        <a className="footer-name" href={'/version'}>
                            2022 Spotivey v1.0
                        </a>
                    </div>
                </nav>
            </footer>
        </React.Fragment>
    )
}