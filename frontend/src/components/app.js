import React, { Component } from "react";
import { render } from "react-dom";
import FirstPage from "./FirstPage";
import {themeOptions} from "./Theme/ConstTheme.js"
import { ThemeProvider } from '@mui/material/styles';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <FirstPage />
      </React.Fragment>
    );
  }
}

const appDiv = document.getElementById("main");
render(
  <ThemeProvider theme={themeOptions}>
    <App />
  </ThemeProvider>, 
  appDiv);