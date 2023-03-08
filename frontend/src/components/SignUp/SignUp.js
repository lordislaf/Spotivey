import * as React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { Typography, Avatar, TextField, Button, Alert, AlertTitle, Collapse, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function SignUpPage () {
    const [name, setName] = useState('')
    const [vorname, setVorname] = useState('')
    const [nachname, setNachname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailAddress, setEmailAddress] = useState('')

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    function handleSignUpButtonPressed() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailAddress,
            password: password,
            first_name: vorname,
            last_name: nachname,
            name:name,
            username: username,
          }),
        };
        fetch("/api/create-settings-user", requestOptions)
          .then((response) => {
            if (!response.ok) {
                console.log(setError(true))
          } else {
            navigate("/login");
          }
        })
      }

    function Name(){
        setName(vorname + ' ' + nachname)
    }

    useEffect(() => {
        Name()
    }, [vorname, nachname])
    
    function handleUsername(e){
        setUsername(e.target.value)
    }
    
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    
    function handleEmailAddress(e) {
        setEmailAddress(e.target.value)
    }
    
    function handleVorname(e) {
        setVorname(e.target.value)
    }
    
    function handleNachname(e) {
        setNachname(e.target.value)
    }
    
    function renderSignUpPage() {
        return (
          <React.Fragment>
            <div className = "login-container-outer">
                <div className={'login-container'}>
                    <div className={'login-container-inner'}>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={error}>
                            <Alert 
                                severity="error"
                                action={
                                    <IconButton
                                      aria-label="close"
                                      color="inherit"
                                      size="small"
                                      onClick={() => {
                                        setError(false);
                                      }}
                                    >
                                      <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }
                                  sx={{ mb: 2 }}
                            >
                                <AlertTitle>Error</AlertTitle>
                                Incorrect input — <strong>check it out!</strong>
                            </Alert>
                        </Collapse>
                    </Box>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PersonAddAltOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <div className={'login-container-textfield-container'}>
                            <div className={'signup-container-name-container'}>
                                <div className={"signup-container-name-container-textfield"}>
                                    <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleVorname}
                                    />
                                </div>
                                <div className={"signup-container-name-container-textfield"}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleNachname}
                                    />
                                </div>
                            </div>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={handleUsername}
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleEmailAddress}
                            />    
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={handlePassword}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSignUpButtonPressed}
                            >
                                Sign Up
                            </Button>
                            <div className={'already-account-container'}>
                                <Link to="/login" variant="body2"  className="already-account">
                                    Already have an account? Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
    }
    
    return(
        <React.Fragment>
            <div class="setting-header">
                <header class="setting-header-inner">
                    <div class="setting-header-content-container">
                        <div class="setting-header-content-container-inner">
                        <div className="logo-header">
                            <span class="logo-tu-berlin">
                                <a href='https://www.ak.tu-berlin.de/menue/fachgebiet_audiokommunikation' target={'_blank'}>
                                    <img src="../../static/images/TU-Berlin-Logo.svg" width="81.816" height="60">
                                    </img>
                                    <img src="../../static/images/logo_grau-schwarz.png" width="61.812" height="60">
                                    </img>
                                </a>
                            </span>
                            <h1 class="setting-header-tu-berlin">
                                Spotivey
                            </h1>
                        </div>
                        </div>
                    </div>
                </header>
            </div>
            <div class='setting-page-main'>
                {renderSignUpPage()}
            </div>
        </React.Fragment>
    );
}
