import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles';
import { UserContext } from '../UserProvider';



export default function Header() {
    const classes = useStyles();
    const user = useContext(UserContext);
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.title} color="inherit" aria-label="menu">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        show all
                    </Link>
                </IconButton>
                <Button className={classes.headerButton}>
                    <Link to="/addLoadout" style={{ textDecoration: 'none' }}>
                        Add new
                    </Link>
                </Button>
                <Button >{user.displayName}</Button>
            </Toolbar>
        </AppBar>
    )
}