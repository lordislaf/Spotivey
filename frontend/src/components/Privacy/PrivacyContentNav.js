import React from "react";

export default function PrivacyContentNav () {
    return(
        <React.Fragment>
            <ul className="privacy-nav-container">
                <li className="privacy-nav-list">
                    <a href='#understanding-privacy' className="privacy-nav-list-item">
                        Understanding Privacy at Spotivey
                    </a>
                </li>
                <li className="privacy-nav-list">
                    <a href='#what-personal-data' className="privacy-nav-list-item">
                        What personal data we collect
                    </a>
                </li>
                <li className="privacy-nav-list">
                    <a href='#why-personal-data' className="privacy-nav-list-item">
                        Why we collect personal data
                    </a>
                </li>
                <li className="privacy-nav-list">
                    <a href='#how-protect-personal-data' className="privacy-nav-list-item">
                        How we protect your personal data
                    </a>
                </li>
                <li className="privacy-nav-list">
                    <a href='#how-share-personal-data' className="privacy-nav-list-item">
                        How we share / transfer your personal data?
                    </a>
                </li>
                <li className="privacy-nav-list">
                    <a href='#personal-rights' className="privacy-nav-list-item">
                        Your personal data rights
                    </a>
                </li>
                <li className="privacy-nav-list">
                    <a href='#contact-us' className="privacy-nav-list-item">
                        How to contact us
                    </a>
                </li>
            </ul>
        </React.Fragment>
    )
}