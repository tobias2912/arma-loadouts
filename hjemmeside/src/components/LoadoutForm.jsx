import { Button, FormHelperText, Grid, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { postLoadout } from '../service/realtimeAPI';
import { useStyles } from '../styles';
import { UserContext } from '../UserProvider';
import SendIcon from '@material-ui/icons/Send';
export default function LoadoutForm() {
    const classes = useStyles();
    const user = useContext(UserContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const loadout = e.target.loadout.value;
        const username = user.displayName;
        postLoadout(name, loadout, username)
    }
    return (
        <Grid item>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField className={classes.formField} id="standard-basic" label="Loadout name" name="name" />
            <TextField multiline className={classes.formField} id="standard-basic" label="arma 3 string" name="loadout" />
            <FormHelperText id="component-helper-text">paste text from arma 3 arsenal</FormHelperText>
            <Button
            type="submit"
            variant="contained"
            color="primary"
          >
              send
              <SendIcon></SendIcon>
          </Button>
        </form>

        </Grid>
    );
};