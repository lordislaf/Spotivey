import * as React from "react";
import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#C40D1E',
    },
    secondary: {
      main: '#A5A7DD',
    },
  },
  typography: {
    fontFamily: "'Kumbh Sans', sans-serif",
  },
});
