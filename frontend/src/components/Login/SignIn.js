import React, {Component, useEffect, useState} from "react";
import { useNavigate } from "react-router";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function LoginPage () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPW, setErrorPW] = useState(false)

    const [helperTextUsername, setHelperTextUsername] = useState("")
    const [helperTextPW, setHelperTextPW] = useState("")
  
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
  
    const handleEmailAddress = (e) => {
      setEmail(e.target.value)
    }

    function handleLoginButtonPressed() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      fetch("/api/login-settings-user", requestOptions)
        .then((response) => {
          if (!response.ok) {
        } else {
          return response.json();
        }
      })
        .then((data) => {
        if (data.error===true){
          setErrorUsername(data.errorUsername)
          setErrorPW(data.errorPW)

          setHelperTextUsername(data.msgUsername)
          setHelperTextPW(data.msgPW)
        }
        else {
          navigate("/user");
        }
      });
    }
  
    const renderLoginPage = () => {
      return (
        <React.Fragment>
          <div className = "login-container-outer">
            <div className={'login-container'}>
              <div className={'login-container-inner'}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <div className={'login-container-textfield-container'}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username or Email Address"
                    name="email"
                    autoComplete="username or email"
                    autoFocus
                    onChange={handleEmailAddress}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleLoginButtonPressed()
                      }
                    }}
                    error={errorUsername}
                    helperText={errorUsername ? helperTextUsername : null}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handlePassword}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleLoginButtonPressed()
                      }
                    }}
                    error={errorPW}
                    helperText={errorPW ? helperTextPW : null}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLoginButtonPressed}
                    component={Link}
                  >
                    Sign In
                  </Button>
                  <div className={'password-forgot-container'}>
                    <Link to="/sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
        <React.Fragment>
            <div class="setting-header">
                <header class="setting-header-inner">
                    <div class="setting-header-content-container">
                        <div class="setting-header-content-container-inner">
                          <div className="logo-header">
                            <span class="logo-tu-berlin">
                              {/* <a href='https://www.ak.tu-berlin.de/menue/fachgebiet_audiokommunikation' target={'_blank'}>
                                <img src="../../static/images/TU-Berlin-Logo.svg" width="81.816" height="60" />
                                <img src="../../static/images/logo_grau-schwarz.png" width="61.812" height="60" />
                              </a> */}
                              <img src="../../../static/images/SpotiveyLogo2_Schrift.svg" width="100%" height="100%"/>
                            </span>
                          </div>
                        </div>
                    </div>
                </header>
            </div>
            <div class='setting-page-main'>
              {renderLoginPage()}               
            </div>
        </React.Fragment>
    );
  }