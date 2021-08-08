import React, { useContext } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Helmet from "react-helmet";
import CssBaseline from '@material-ui/core/CssBaseline';
import { colors, Container, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Error from './pages/error';

import { theme } from './colors'
import AddNew from './pages/addNew';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { UserContext } from './UserProvider';

function App() {
  const user = useContext(UserContext);;
  console.log("loggedin"+(Boolean(user)));
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Tobben</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <main>
        {user ? <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/" component={Home} exact />
          <Route path="/addLoadout" component={AddNew} exact />
          <Route component={Error} />
        </Switch>
        :
        <Signin></Signin>
        }

      </main>
    </MuiThemeProvider>
  );
}

export default App;