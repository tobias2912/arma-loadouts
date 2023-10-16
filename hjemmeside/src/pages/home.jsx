import { Box, CircularProgress, Container } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Loadoutlist from "../components/loadoutlist";
import Sidebar from "../components/sidebar";
import { mockedLoadouts } from "../service/realtimeAPI";
import { useStyles } from "../styles";

export default function Home() {
  const classes = useStyles();
  const [loadouts, setLoadouts] = useState([]);
  const [filteredLoadouts, setFilteredLoadouts] = useState({});

  const getLoadouts = () => {
    if (process.env.REACT_APP_RUN_OFFLINE === "TRUE") {
      console.log("running offline");
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

  const filterLoadouts = (searchterm, type, camo, attributeList) => {
    console.log("filtering for ", searchterm);
    let mathingLoadouts = {};
    for (var userid in loadouts) {
      let userloadouts = loadouts[userid];
      mathingLoadouts[userid] = {};
      for (var loadoutid in userloadouts) {
        let loadout = userloadouts[loadoutid];
        if (loadout.name.toLowerCase().includes(searchterm)) {
          console.log("match with", loadout);
          mathingLoadouts[userid][loadoutid] = loadout;
        }
      }
    }
    setFilteredLoadouts(mathingLoadouts);
  };

  return (
    <>
      <Header filterLoadouts={filterLoadouts} />
      <Box className={classes.contentWrapper}>
        <Sidebar filterLoadouts={filterLoadouts}></Sidebar>
        <Container className={classes.rootContainer}>
          {loadouts.length === 0 ? (
            <>
              <CircularProgress />
              <p>loading</p>
            </>
          ) : (
            <Loadoutlist loadouts={filteredLoadouts}></Loadoutlist>
          )}
        </Container>
      </Box>
    </>
  );
}
