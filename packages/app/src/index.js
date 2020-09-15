import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import BlockainContext from './contexts/blockchain';
import AppContext from './contexts/app';

const theme = createMuiTheme({
  typography: {
    fontFamily: "Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
  },
  palette: {
    primary: {
      main: "#f7b201",
      contrastText: "#ffffff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#fafafc",
    },
    text: {
      primary: "rgb(76, 76, 76)",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "10px",
        padding: "10px 40px 10px 40px",
      },
    },
  },
});

ReactDOM.render(
  <AppContext>
    <BlockainContext>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BlockainContext>
  </AppContext >,
  document.getElementById('root')
);
