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
  loadoutTypes,
} from "../consts/loadoutConsts";
import { useStyles } from "../styles";
import { UserContext } from "../UserProvider";
import SearchBar from "./SearchBar";

export default function Sidebar({ filterLoadouts }) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [camo, setCamo] = useState("");
  const [switchStates, setStates] = useState(toCheckedDict(loadoutTags));

  function handleChange(event) {
    let newdict = {};
    Object.assign(newdict, switchStates);
    newdict[event.target.name] = !newdict[event.target.name];
    setStates(newdict);
  }

  function toCheckedDict(list) {
    let dict = {};
    list.forEach((element) => {
      dict[element] = false;
    });
    return dict;
  }

  function filterSearch(e) {
    const searchterm = e.target.value.toLowerCase();
    setSearch(searchterm);
    filterLoadouts(searchterm, type, camo, getAttributeList());
  }

  function getAttributeList() {
    let attributes = [];
    for (const [name, enabled] of Object.entries(switchStates)) {
      if (enabled) {
        attributes.push(name);
      }
    }
    return attributes;
  }

  return (
    <Box className={classes.sidebar}>
      filter:
      <SearchBar
        filterLoadouts={filterSearch}
        className={classes.filterTopSearch}
      ></SearchBar>
      types:
      <Select>
        {loadoutTypes.map((attr, i) => {
          return <MenuItem value={attr}>{attr}</MenuItem>;
        })}
      </Select>
      camo:
      <Select>
        {loadoutCamos.map((attr, i) => {
          return <MenuItem value={attr}>{attr}</MenuItem>;
        })}
      </Select>
      <InputLabel id="type">Tags</InputLabel>
      {loadoutTags.map((attr, i) => {
        return (
          <FormControlLabel
            control={
              <Switch
                checked={switchStates[attr]}
                onChange={(e) => handleChange(e)}
                name={attr}
              ></Switch>
            }
            label={attr}
          />
        );
      })}
    </Box>
  );
}
