

import { AppBar, Button, Container, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/header';
import Loadoutlist from '../components/loadoutlist';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function AddNew() {
    const classes = useStyles();
    return (
        <>
            <Header></Header>
            <Container>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="name" />
                    <TextField id="filled-basic" label="paste in loadout from arma" variant="filled" />
                </form>
            </Container>
        </>
    )
}