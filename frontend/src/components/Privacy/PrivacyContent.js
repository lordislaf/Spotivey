import React from "react";
import PrivacyContentNav from "./PrivacyContentNav";

export default function PrivacyContent() {
    return(
        <div className="privacy">
            <div className='privacy-banner'>
                <h1 className="privacy-banner-title">
                    Privacy Center
                </h1>
                <div className="privacy-banner-subtitle-container">
                    <h2 className="privacy-banner-subtitle">
                        Spotivey uses personal data to be the best platform for simplified use 
                        of the Spotify API in online survey studies. Learn more about your data rights.
                    </h2>
                </div>
            </div>
            <div className="privacy-content-container">
                <div>
                    <PrivacyContentNav/>
                </div>
                <div>
                    <div id='understanding-privacy'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title'>
                                Understanding Privacy at Spotivey
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            At Spotivey, we want to give you the best possible experience. 
                            To do this we use some personal data about you to provide your personalized Spotivey 
                            service and to develop the best platform to simplify the use of the Spotify API in online survey studies 
                            for our researchers and interested persons. We are also committed to protecting the privacy and security of your data. 
                            Check out the below privacy resources on this page to learn more.
                        </h3>
                    </div>
                    <div id='what-personal-data'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title2'>
                                What personal data does Spotivey collect about me?
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            It is very important to us that you understand what personal data we collect about you, 
                            how we collect it, and why it's necessary.
                        </h3>
                        <h3 class='settings-overview-text'>
                            We collect your personal information in the following ways:
                        </h3>
                        <ol class='privacy-list-personal-info'>
                            <li class='privacy-list-personal-info-item'> 
                                <u>When you sign up for the Spotivey Service</u>, we collect certain personal data to create 
                                your Spotivey account so you can use the Spotivey Service. 
                                This includes your profile name and email address.
                            </li>
                            <li class='privacy-list-personal-info-item'> 
                                <u>Through your use of the Spotify Service:</u> When you use or access the Spotify Service, 
                                we collect and process personal data about your actions. 
                                This includes URL information and Online identifiers such as cookie data and IP addresses and 
                                Information about devices you use.
                            </li>
                            <li class='privacy-list-personal-info-item'>
                                <u>Personal data that you choose to give us as a Participant:</u> When you use or access the Spotivey Service 
                                as a participant, we collect and process personal data about your actions. 
                                This includes survey and research data.
                            </li>
                        </ol>
                    </div>
                    <div id='why-personal-data'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title2'>
                                Why does Spotivey collect and use this personal data?
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            We collect and use your personal data for the following reasons:
                        </h3>
                        <ul class='privacy-list-personal-info'>
                            <li class='privacy-list-personal-info-item'> 
                                to provide the Spotivey service
                            </li>
                            <li class='privacy-list-personal-info-item'>
                                to conduct studies and surveys
                            </li>
                        </ul>
                    </div>
                    <div id='how-protect-personal-data'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title2'>
                                How does Spotivey protect my personal data?
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            We are committed to protecting our users' personal data.
                            We implement appropriate technical and organizational measures to help protect the security of your personal data.
                            However, please note that no system is ever completely secure.
                        </h3>
                        <h3 class='settings-overview-text'>
                            To protect your user account, we encourage you to:
                        </h3>
                        <ul class='privacy-list-personal-info'>
                            <li class='privacy-list-personal-info-item'> 
                                use a strong password which you only use for your Spotivey account
                            </li>
                            <li class='privacy-list-personal-info-item'>
                                never share your password with anyone
                            </li>
                            <li class='privacy-list-personal-info-item'> 
                                limit access to your computer and browser
                            </li>
                            <li class='privacy-list-personal-info-item'>
                                log out once you have finished using the Spotivey Service on a shared device
                            </li>
                        </ul>
                    </div>
                    <div id='how-share-personal-data'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title2'>
                                How does Spotivey share / transfer my personal data?
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            Your personal data will never be shared. They are processed anonymously. And with no use, deleted.
                        </h3>
                    </div>
                    <div id='personal-rights'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title2'>
                                Your Personal Data Rights
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            You may be aware that privacy laws, including the General Data Protection Regulation or "GDPR", 
                            give certain rights to individuals over their personal data. These are described below.
                        </h3>
                        <div class='privacy-rights-container'>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Access to your personal data
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to be informed of the personal data we process about you and to request access to it.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Be informed
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to be informed of the personal data we process about you and how we process it.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Update your personal data
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to request that we amend or update your personal data where it's inaccurate or 
                                    incomplete.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Restricting the use of your personal data
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to request that we temporarily or permanently stop processing all or some of 
                                    your personal data.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Object to the use of your personal data
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to object to us processing your personal data at any time, 
                                    on grounds relating to your particular situation.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Port your personal data
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to request a copy of your personal data in an electronic format and 
                                    the right to transmit that personal data for use in another party's service.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Erase your personal data
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to request that we delete your personal data.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Withdraw your consent
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to withdraw your consent to us collecting or using your personal data.
                                </h3>
                            </div>
                            <div class='privacy-rights-grid-item'>
                                <h3 className='settings-overview-literatur-title'>
                                    Lodge a complaint
                                </h3>
                                <h3 class='settings-overview-text'>
                                    It's your right to contact 
                                    the <a href='https://www.bfdi.bund.de' target={'_blank'}>German Data Protection Agency</a> or 
                                    your local data protection authority about any questions or concerns.
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div id='contact-us'>
                        <div class='settings-overview-title'>
                            <h1 data-heading='true' class='privacy-content-title2'>
                                How to contact us
                            </h1>
                        </div>
                        <h3 class='settings-overview-text'>
                            For any questions or concerns about this page, contact our Data Protection Officer any one of these ways:
                        </h3>
                        <ul class='privacy-list-personal-info'>
                            <li class='privacy-list-personal-info-item'> 
                                Email <a href='mailto:marc.voigt@tu-berlin.de'>marc.voigt@tu-berlin.de</a>
                            </li>
                            <li class='privacy-list-personal-info-item'>
                                Write to us at: Technische Universität Berlin, Fachgebiet Audiokommunikation / Sek. EN-8,
                                Einsteinufer 17c, 10587 Berlin, Germany
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}