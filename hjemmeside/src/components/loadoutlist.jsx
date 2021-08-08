import { CircularProgress, Grid } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from 'react';
import LoadoutCard from './loadoutCard';
export default function Loadoutlist({loadouts}) {

    return (
        <Grid container spacing={2}>
            {Object.keys(loadouts).map((item, _i) => <LoadoutCard loadout={loadouts[item]}></LoadoutCard>)}
        </Grid>
    )
}
