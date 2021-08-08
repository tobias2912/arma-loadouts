import { AppBar, Button, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles';
import { UserContext } from '../UserProvider';


export default function FilterBar({filterLoadouts}) {
    const classes = useStyles();
    const user = useContext(UserContext);
    return (
        <AppBar className={classes.searchbar} position="static">
            <Toolbar>

                <Typography variant="h6" className={classes.title}>
                    filter
                </Typography>
                <TextField
                    onChange={filterLoadouts}
                    id="standard-textarea"
                    label="search"
                    placeholder="Placeholder"
                />
            </Toolbar>
        </AppBar>
    )
}