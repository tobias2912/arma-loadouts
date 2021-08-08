import firebase from "firebase";
import React, { useEffect, useState } from 'react';
import LoadoutCard from './loadoutCard';
export default function Loadoutlist() {
    const [loadouts, setLoadouts] = useState([]);
    const getLoadouts = () => {
        const dbRef = firebase.database().ref();
        return dbRef.child("loadouts").get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log("snapshot");
                console.log(snapshot.val());
                setLoadouts(snapshot.val())
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

    if (!loadouts) {
        return (<p>no loadouts</p>)
    }
    return (
        <>
            {Object.keys(loadouts).map((item, _i) => <LoadoutCard loadout={loadouts[item]}></LoadoutCard>)}
        </>
    )
}
