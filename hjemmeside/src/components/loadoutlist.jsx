import { Grid } from "@material-ui/core";
import React from "react";
import LoadoutCard from "./loadoutCard";

function isEmpty(loadouts) {
  for (const user in loadouts) {
    if (Object.keys(loadouts[user]).length > 0) {
      return false;
    }
  }
  return true;
}
export default function Loadoutlist({ loadouts }) {
  if (isEmpty(loadouts)) {
    return <a>No loadouts found :/</a>;
  }
  return (
    <Grid container direction="row">
      {Object.keys(loadouts).map((userloadouts, _i) =>
        Object.keys(loadouts[userloadouts]).map((item, _i) => (
          <LoadoutCard
            key={_i}
            loadout={loadouts[userloadouts][item]}
            loadoutId={item}
          ></LoadoutCard>
        ))
      )}
    </Grid>
  );
}
