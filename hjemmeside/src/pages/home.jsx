import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import Header from "../components/header";
import Loadoutlist from "../components/loadoutlist";
import { getLoadouts, mockedLoadouts } from "../service/realtimeAPI";
import { useStyles } from "../styles";

export default function Home() {
  const classes = useStyles();
  const [loadouts, setLoadouts] = useState([]);
  const [filteredLoadouts, setFilteredLoadouts] = useState([]);

  const getLoadouts = () => {
    if (process.env.REACT_APP_RUN_OFFLINE == "TRUE") {
        console.log("true");
        setLoadouts(mockedLoadouts);
        setFilteredLoadouts(mockedLoadouts);
        return;
    }
    const dbRef = firebase.database().ref();
    return dbRef
      .child("loadouts")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setLoadouts(snapshot.val());
          setFilteredLoadouts(snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getLoadouts();
  }, []);

  const filterLoadouts = (searchevent) => {
    const searchterm = searchevent.target.value;
    let filteredAcc = {};
    Object.keys(loadouts).map((item, _i) => {
      let loadout = loadouts[item];
      if (loadout.name.includes(searchterm)) {
        filteredAcc[item] = loadout;
      }
    });
    setFilteredLoadouts(filteredAcc);
  };

  return (
    <>
      <Header></Header>
      <Container className={classes.rootContainer}>
        <FilterBar filterLoadouts={filterLoadouts}></FilterBar>
        {loadouts.length === 0 ? (
          <>
            <CircularProgress />
            <p>loading</p>
          </>
        ) : (
          <Loadoutlist loadouts={filteredLoadouts}></Loadoutlist>
        )}
      </Container>
    </>
  );
}
