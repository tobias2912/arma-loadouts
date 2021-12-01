import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStyles } from '../styles';
import { UserContext } from '../UserProvider';



export default function Header() {
    const classes = useStyles();
    const user = useContext(UserContext);
    return (
        <AppBar position="static">
            <Toolbar>
                <Button >
                    <NavLink className={classes.headerButtonLink} to="/" style={{ textDecoration: 'none' }}>
                        show all
                    </NavLink>
                </Button>
                <Button >
                    <Link className={classes.headerButtonLink} to="/addLoadout" style={{ textDecoration: 'none' }}>
                        Add new
                    </Link>
                </Button>
                <Button >{user.displayName}</Button>
            </Toolbar>
        </AppBar>
    )
}