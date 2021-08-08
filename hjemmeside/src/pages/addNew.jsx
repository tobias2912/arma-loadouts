

import { AppBar, Button, Container, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/header';
import LoadoutForm from '../components/LoadoutForm';
import Loadoutlist from '../components/loadoutlist';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const initialFormData = Object.freeze({
    name: "",
    loadout: ""
  });
  
export default function AddNew() {
    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        // ... submit to API or something
    };
    const classes = useStyles();
    return (
        <>
            <Header></Header>
            <Container>
<LoadoutForm></LoadoutForm>
            </Container>
        </>
    )
}