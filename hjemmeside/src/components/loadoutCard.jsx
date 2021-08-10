import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Snackbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "../styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import tempImage from "../icons/loadout.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoadoutCard({ loadout }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(loadout.loadout);
    setOpen(true);
  };

  return (
    <Card className={classes.loadoutCard}>
      <CardContent>
        <Grid container direction="row" alignItems="stretch">
          <Grid item xs={12} >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography align="center" variant="h4">
                {loadout.name}
              </Typography>
              <Tooltip title="copy">
                <FileCopyIcon className={classes.icon} onClick={copy}></FileCopyIcon>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.imageContainer}>
            <img src={tempImage} className={classes.img}></img>
          </Grid>
          <Grid item xs={6} >
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              margin="1rem"
            >
              <Typography variant="h6">{loadout.role}</Typography>

              <Box flexDirection="row">
                {loadout.attributes?.length > 0 &&
                  loadout.attributes.map((item, _i) => (
                    <Chip
                      key={_i}
                      color="secondary"
                      size="small"
                      variant="outlined"
                      label={item}
                    ></Chip>
                  ))}
              </Box>
              <Divider className={classes.divider}></Divider>
              <Box className={classes.accountContainer}>
                <AccountBoxIcon />
                <Typography variant="h6">{loadout.author}</Typography>
              </Box>
              <Box className={classes.loadoutstringbox}>
                <Typography variant="caption" color="textSecondary">
                  {loadout.items}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            Copied!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
