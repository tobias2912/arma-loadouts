import React from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Helmet from "react-helmet";
import CssBaseline from '@material-ui/core/CssBaseline';
import { colors, Container, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Error from './pages/error';

import {theme} from './colors'
import AddNew from './pages/addNew';

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
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/addLoadout" component={AddNew} exact />
            <Route component={Error} />
          </Switch>
        </main>
        {/* <Title />
          <Sidebar />
          <Container maxwidth="sm">
            <Grid>
              <Section filename='## overskrift Hjemmeside  <br> # this is stuff' />
              <Section filename='### overskrift Hjemmeside  sadas' />

            </Grid>

          </Container>
          <Footer color="primary" /> */}
      </MuiThemeProvider>
    </div>
  );
}

export default App;