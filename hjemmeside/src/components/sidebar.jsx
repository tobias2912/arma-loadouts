import {
  AppBar,
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Toolbar,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  getAttributes,
  loadoutCamos,
  loadoutTags,
  loadoutRoles as loadoutRoles,
} from "../consts/loadoutConsts";
import { useStyles } from "../styles";
import { UserContext } from "../UserProvider";
import SearchBar from "./SearchBar";

export default function Sidebar({ filterLoadouts, loadouts }) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [author, setAuthor] = useState("");
  const [camo, setCamo] = useState("");
  const [switchStates, setStates] = useState(tagsToButtonDict(loadoutTags));

  function tagsToButtonDict(list) {
    let dict = {};
    list.forEach((element) => {
      dict[element] = false;
    });
    return dict;
  }

  function filterSearch(e) {
    const searchterm = e.target.value.toLowerCase();
    setSearch(searchterm);
    filterLoadouts(searchterm, role, camo, getAttributeList(), author);
  }

  function getAttributeState() {
    return getAttributeList(switchStates);
  }
  function getAttributeList(dict) {
    if(!dict){
        console.warn("no attributes");
        return [];
    }
    let attributes = [];
    for (const [name, enabled] of Object.entries(dict)) {
      if (enabled) {
        attributes.push(name);
      }
    }
    return attributes;
  }

  function handleAttribute(event) {
    let newdict = {};
    Object.assign(newdict, switchStates);
    newdict[event.target.name] = !newdict[event.target.name];
    setStates(newdict);
    let l = Object.entries(loadouts);
    filterLoadouts(search, role, camo, getAttributeList(newdict), author);
  }
  function handleRole(e) {
    let val = e.target.value;
    setRole(val);
    filterLoadouts(search, val, camo, getAttributeState(), author);
  }
  function handleCamo(e) {
    let val = e.target.value;
    setCamo(val);
    filterLoadouts(search, role, val, getAttributeState(), author);
  }
  function handleAuthor(e) {
    let val = e.target.value;
    setAuthor(val);
    filterLoadouts(search, role, camo, getAttributeState(), val);
  }

  function getUserList() {
    let arr = [];
    arr.push("Any");
    Object.keys(loadouts).map((key, i) => {
      let userloadouts = loadouts[key];
      let firstLoadout = Object.values(userloadouts)[0];
      arr.push(firstLoadout.author);
    });
    return arr;
  }

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.sideBarItem}>
        <SearchBar
          filterLoadouts={filterSearch}
          className={classes.filterTopSearch}
        ></SearchBar>
      </Box>
      <Box className={classes.sideBarItem}>
        Author:
        <Select onChange={handleAuthor}>
          {getUserList().map((key, i) => {
            return <MenuItem value={key}>{key}</MenuItem>;
          })}
        </Select>
      </Box>
      <Box className={classes.sideBarItem}>
        Roles:
        <Select onChange={handleRole}>
          {loadoutRoles.map((attr, i) => {
            return <MenuItem value={attr}>{attr}</MenuItem>;
          })}
        </Select>
      </Box>
      <Box className={classes.sideBarItem}>
        Camo:
        <Select onChange={handleCamo}>
          {loadoutCamos.map((attr, i) => {
            return <MenuItem value={attr}>{attr}</MenuItem>;
          })}
        </Select>
      </Box>
      <Box className={classes.sideBarItem}>
        <InputLabel id="type">Filters:</InputLabel>
        {loadoutTags.map((attr, i) => {
          return (
            <FormControlLabel
              control={
                <Switch
                  checked={switchStates[attr]}
                  onChange={(e) => handleAttribute(e)}
                  name={attr}
                ></Switch>
              }
              label={attr}
            />
          );
        })}
      </Box>
    </Box>
  );
}
