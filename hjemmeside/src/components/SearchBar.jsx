import { AppBar, TextField, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useStyles } from "../styles";
import { UserContext } from "../UserProvider";

export default function SearchBar({ filterLoadouts }) {
  const classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Toolbar className={classes.searchtoolBar}>
      <TextField
        onChange={filterLoadouts}
        id="standard-textarea"
        label="Search"
        placeholder="Search"
      />
    </Toolbar>
  );
}
