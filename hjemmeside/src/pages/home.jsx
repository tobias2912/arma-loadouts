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

  function filterLoadouts(searchterm, role, camo, attributeList, author) {
    console.log(
      "filtering for ",
      searchterm,
      role,
      camo,
      attributeList,
      author
    );
    let mathingLoadouts = {};
    for (var userid in loadouts) {
      let userloadouts = loadouts[userid];
      mathingLoadouts[userid] = {};
      for (var loadoutid in userloadouts) {
        let loadout = userloadouts[loadoutid];
        console.log("comparing loadout", loadout.name);
        if (doesMatch(loadout, searchterm, role, camo, attributeList, author)) {
          console.log("match with", loadout.name);
          mathingLoadouts[userid][loadoutid] = loadout;
        }
      }
    }
    setFilteredLoadouts(mathingLoadouts);
  }

  function doesMatch(loadout, searchterm, role, camo, attributeList, author) {
    if (searchterm && !loadout.name.toLowerCase().includes(searchterm)) {
      console.log("no match with ", loadout.name);
      return false;
    }
    if (camo && loadout.attributes && !loadout.attributes.includes(camo)) {
      console.log("no match with ", loadout.name);
      return false;
    }
    if (role && loadout.role !== role) {
      console.log("no match with ", loadout.name);
      return false;
    }
    if (author && loadout.author !== author && author !== "Any") {
      console.log("no match with ", loadout.name);
      return false;
    }
    let valid = true;
    attributeList.forEach((attr) => {
      console.log("check", attr);
      if (loadout.attributes) {
        console.log("attr present", loadout.attributes, attr);
        if (!loadout.attributes.includes(attr)) {
          console.log("no match with ", loadout.name);
          valid = false;
        }
      }
    });
    return valid;
  }

  return (
    <>
      <Header filterLoadouts={filterLoadouts} />
      <Box className={classes.contentWrapper}>
        <Sidebar filterLoadouts={filterLoadouts} loadouts={loadouts}></Sidebar>
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
