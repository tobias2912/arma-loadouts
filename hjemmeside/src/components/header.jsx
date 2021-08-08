import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
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

export default function Header() {
    const classes = useStyles();
    const user = useContext(UserContext);;
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {/* <MenuIcon /> */}

                    <Link to="/">
                        show all
                    </Link>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/addLoadout">
                        Add new
                    </Link>
                </Typography>
                <Button color="inherit">{user.displayName}</Button>
            </Toolbar>
        </AppBar>
    )
}