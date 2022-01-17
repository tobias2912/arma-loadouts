import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStyles } from '../styles';
import { UserContext } from '../UserProvider';
import FilterBar from './FilterBar';

export default function Header({filterLoadouts}) {
    const classes = useStyles();
    const user = useContext(UserContext);
    return (
        <AppBar position="static">
            <Toolbar className={classes.headerbar} >
                <Box>
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
                </Box>
                <FilterBar filterLoadouts={filterLoadouts}></FilterBar>
                <Button sx={{ flexGrow: 0 }}>{user.displayName}</Button>
            </Toolbar>
        </AppBar>
    )
}
