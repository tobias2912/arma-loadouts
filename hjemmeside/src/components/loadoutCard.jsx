import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "../styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { deleteLoadout, getLoadoutImg } from "../service/realtimeAPI";
import { useEffect } from "react";
import { UserContext } from "../UserProvider";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoadoutCard({ loadout, id }) {
  const user = useContext(UserContext);
  const classes = useStyles();
  const [popupOpen, setPopupOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const [DeleteOpen, SetDeleteOpen] = React.useState(false);

  const handleDeleteOpen = () => {
    SetDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    SetDeleteOpen(false);
  };

  useEffect(() => {
    getLoadoutImg(loadout.name)
      .then((res) => {
        setImage(res);
      })
      .catch((err) => {});
  }, []);

  const handlePopupClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPopupOpen(false);
  };

  const DeleteLoadoutConfirmed = async () => {
    handleDeleteClose();
    await deleteLoadout(loadout.uid, id, loadout.name);
    setIsDeleted(true);
  };

  const copy = () => {
    navigator.clipboard.writeText(loadout.items);
    console.log("copy loadout id " + id);
    console.log(loadout);
    setPopupOpen(true);
  };
  if(isDeleted){return <></>}
  return (
    <Card className={classes.loadoutCard}>
      <CardContent>
        <Grid container direction="row" alignItems="stretch">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                align="center"
                variant="h4"
                style={{ fontFamily: "Allerta Stencil" }}
              >
                {loadout.name}
              </Typography>
              <Tooltip title="copy">
                <FileCopyIcon
                  className={classes.icon}
                  onClick={copy}
                ></FileCopyIcon>
              </Tooltip>
              {(loadout.uid === user.uid || true) && (
                <Tooltip title="delete">
                  <DeleteForeverIcon
                    className={classes.icon}
                    onClick={handleDeleteOpen}
                  ></DeleteForeverIcon>
                </Tooltip>
              )}
            </Box>
          </Grid>
          <Grid item xs={4} className={classes.imageContainer}>
            {image ? (
              <img src={image} className={classes.img}></img>
            ) : (
              <p>loading</p>
            )}
          </Grid>
          <Grid item xs={8}>
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
                      className={classes.attributeChip}
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
                <Typography variant="h7">{loadout.author}</Typography>
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
          open={popupOpen}
          autoHideDuration={3000}
          onClose={handlePopupClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handlePopupClose} severity="success">
            Copied!
          </Alert>
        </Snackbar>
        <Dialog
          open={DeleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm permanent deletion
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button onClick={DeleteLoadoutConfirmed} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
