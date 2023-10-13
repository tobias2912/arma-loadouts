

import { AppBar, Button, Container, Grid, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/header';
import LoadoutForm from '../components/LoadoutForm';
import Loadoutlist from '../components/loadoutlist';
import { useStyles } from '../styles';



const initialFormData = Object.freeze({
    name: "",
    loadout: ""
});

export default function AddNew() {
    const classes = useStyles();
    const [formData, updateFormData] = React.useState(initialFormData);

    return (
        <>
            <Header showSearch={false}></Header>
            <Container className={classes.rootContainer} maxWidth="md">
                <Grid container direction="column">
                    <LoadoutForm></LoadoutForm>
                </Grid>

            </Container>
        </>
    )
}