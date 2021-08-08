
import { AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import FilterBar from '../components/FilterBar';
import Header from '../components/header';
import Loadoutlist from '../components/loadoutlist';
import { getLoadouts } from '../service/realtimeAPI';
import { useStyles } from '../styles';

export default function Home() {
    const classes = useStyles();
    const [loadouts, setLoadouts] = useState([]);
    const [filteredLoadouts, setFilteredLoadouts] = useState([]);

    const getLoadouts = () => {
        const dbRef = firebase.database().ref();
        return dbRef.child("loadouts").get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setLoadouts(snapshot.val())
                setFilteredLoadouts(snapshot.val())
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(() => {
        getLoadouts()
    }, [])

    const filterLoadouts = (searchevent) => {
        const searchterm = searchevent.target.value;
        console.log(searchterm);
        let filteredAcc = {};
        Object.keys(loadouts).map((item, _i) => {
            let loadout = loadouts[item];
            if (loadout.name.includes(searchterm)) {
                console.log(loadout.name);
                filteredAcc[item] = loadout;
            }
        })
        console.log(filteredAcc);
        setFilteredLoadouts(filteredAcc)
        console.log("filtered:", filteredAcc);
        

}

return (
    <>
        <Header></Header>
        <FilterBar filterLoadouts={filterLoadouts}></FilterBar>
        <Container className={classes.rootContainer}>
            {loadouts.length === 0 ?
                <><CircularProgress /><p>loading</p></>
                :
                <Loadoutlist loadouts={filteredLoadouts}></Loadoutlist>
            }

        </Container>
    </>
)
}