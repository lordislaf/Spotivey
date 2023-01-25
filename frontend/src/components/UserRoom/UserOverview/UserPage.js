import * as React from "react";
import { useState, useEffect } from 'react';
import headerSettings from '../Header/headerSettings';
import { useNavigate } from "react-router";
import OverviewContent from './OverviewContent';


export default function UserPage(props) {

  const navigate = useNavigate()

  const [username, setUsername] = useState(null)
  const [fullName, setFullName] = useState(null)

  useEffect(() => {
      async function userInRoom() {
        fetch("/api/user-in-room")
          .then((response) => response.json())
          .then((data) => {
            if (data.username === null){
              navigate('/login')
            } else {
              setUsername(data.username)
              setFullName(data.fullName)
            }
          });
      }
      userInRoom();
    }, [])

   function renderUserPage() {
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
                          {fullName ? OverviewContent(fullName) : null}
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

    return(
      <React.Fragment>
        {renderUserPage()}
      </React.Fragment>
    )
}