import { AppBar, Button, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function FilterBar({filterLoadouts}) {
    const classes = useStyles();
    const user = useContext(UserContext);
    return (
        <AppBar position="static">
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
                <Button color="inherit">{user.displayName}</Button>
            </Toolbar>
        </AppBar>
    )
}