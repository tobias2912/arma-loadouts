import { Grid } from "@material-ui/core";
import React from "react";
import LoadoutCard from "./loadoutCard";
export default function Loadoutlist({ loadouts }) {
  return (
    <Grid container direction="row">
      {Object.keys(loadouts).map((userloadouts, _i) =>
        Object.keys(loadouts[userloadouts]).map((item, _i) => (
          <LoadoutCard
            key={_i}
            loadout={loadouts[userloadouts][item]}
          ></LoadoutCard>
        ))
      )}
    </Grid>
  );
}
