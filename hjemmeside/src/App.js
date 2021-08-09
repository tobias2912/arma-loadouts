import React, { useContext } from 'react';
import Helmet from "react-helmet";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Error from './pages/error';

import { theme } from './colortheme'
import AddNew from './pages/addNew';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { UserContext } from './UserProvider';
import { useStyles } from './styles';

function App() {
  const user = useContext(UserContext);
  // const user = {displayName:"tobias"};
  const classes=useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Arma Loadouts</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <main className={classes.main}>
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