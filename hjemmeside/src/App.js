import React from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Title from "./Title";
import Footer from "./Footer";
import Section from "./Section";
import Helmet from "react-helmet";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ffffff'
    },
    primary: {
      main: '#ffff00'
    }
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <title>Tobben</title>
          <description>Tobbe sin side</description>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Helmet>
        <Title />
        <Sidebar />
        <Container maxwidth="sm">
          <Grid>
            <Section filename='## overskrift Hjemmeside  <br> # this is stuff' />
            <Section filename='### overskrift Hjemmeside  sadas' />

          </Grid>

        </Container>
        <Footer color="primary"/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;