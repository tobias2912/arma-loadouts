import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { postLoadout } from "../service/realtimeAPI";
import { useStyles } from "../styles";
import { UserContext } from "../UserProvider";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import firebase from "firebase";
import { storage } from "../firebase";

export default function LoadoutForm() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [classValue, setClassValue] = useState("Assault");
  const [openError, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageAsFile, setImageAsFile] = useState(null)
  const [imageAsUrl, setImageAsUrl] = useState('')
  /**
   * gather fields from form, validate and send to server
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    let attributes = [];
    if (e.target.nighttime.checked) {
      attributes.push("Night time");
    }
    if (e.target.grenadier.checked) {
      attributes.push("Grenadier");
    }
    if (e.target.medic.checked) {
      attributes.push("medic");
    }
    if (e.target.frogman.checked) {
      attributes.push("frogman");
    }
    if (e.target.jtac.checked) {
      attributes.push("JTAC/ Drone");
    }
    if (e.target.ghillie.checked) {
      attributes.push("Ghillie suit");
    }


    let loadout = {
      name: e.target.name.value,
      items: e.target.items.value,
      author: user.displayName,
      role: e.target.role.value,
      attributes: attributes,
    };
    if (!isValidInput(loadout)) {
      //error
    } else {
      postImage(loadout.name);
      postLoadout(loadout).then(() => {
        history.push("/");
      });
    }
  };

  const postImage = (imageName) =>{
    console.log('start of upload')
    // async magic goes here...
    if(imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageName}`).put(imageAsFile)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageName).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })
  }

  const isValidInput = (loadout) => {
    if (loadout.items.length < 20) {
      //probably not valid
      setErrorMsg("Exported loadout does not seem to be correct");
      setOpen(true);
      return false;
    }
    if (loadout.name.length < 3) {
      setErrorMsg("Too short name");
      setOpen(true);
      return false;
    }
    return true;
  };

  const handleClassChange = () => { };

  const onFileChange = event => { 
    // Update the state 
    setSelectedFile(event.target.files[0]); 
  };
  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
}
  return (
    <Grid xs={12} item>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning">{errorMsg}</Alert>
      </Snackbar>
      <form
        className={classes.loadoutform}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormHelperText id="component-helper-text">Loadout Name</FormHelperText>
        <TextField
          variant="outlined"
          className={classes.formField}
          id="standard-basic"
          label="e.g. 'Russian Team Lead'"
          name="name"
        />
        <FormHelperText id="component-helper-text">
          paste text from arma 3 arsenal
        </FormHelperText>
        <TextField
          color="secondary"
          variant="outlined"
          multiline
          className={classes.formField}
          id="standard-basic"
          label="[[binoculars]...]"
          name="items"
        />
        <Box className={classes.optionsBox}>
          <FormControl
            component="fieldset"
            margin="dense"
            className={classes.formControl}
          >
            <FormLabel component="legend">Role:</FormLabel>
            <RadioGroup
              name="role"
              //   value={classValue}
              onChange={handleClassChange}
            >
              <FormControlLabel
                value="Rifleman"
                control={<Radio />}
                label="Rifleman"
              />
              <FormControlLabel
                value="Marksman"
                control={<Radio />}
                label="Marksman"
              />

              <FormControlLabel
                value="Heavy weapons"
                control={<Radio />}
                label="Heavy weapons"
              />

              <FormControlLabel
                value="Driver"
                control={<Radio />}
                label="Pilot/ Driver"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <FormControl
            component="fieldset"
            margin="dense"
            className={classes.formControl}
          >
            <FormLabel component="legend">Camo:</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="role"
              //   value={classValue}
              onChange={handleClassChange}
            >
              <FormControlLabel
                value="Multicam"
                control={<Radio />}
                label="Multicam"
              />
              <FormControlLabel
                value="Norwegian"
                control={<Radio />}
                label="Norwegian"
              />
              <FormControlLabel
                value="Desert"
                control={<Radio />}
                label="Desert"
              />

              <FormControlLabel
                value="Woodland"
                control={<Radio />}
                label="Woodland"
              />
              <FormControlLabel
                value="Arctic"
                control={<Radio />}
                label="Arctic"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            margin="dense"
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">Extra gear:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="nighttime" />}
                label="night time"
              />
              <FormControlLabel
                control={<Checkbox name="grenadier" />}
                label="Grenadier"
              />
              <FormControlLabel
                control={<Checkbox name="medic" />}
                label="Medic"
              />
              <FormControlLabel
                control={<Checkbox name="frogman" />}
                label="Frogman"
              />
              <FormControlLabel
                control={<Checkbox name="jtac" />}
                label="JTAC/ Drone Operator"
              />

              <FormControlLabel
                control={<Checkbox name="ghillie" />}
                label="Ghillie suit"
              />
            </FormGroup>
          </FormControl>
        </Box>
        <input type="file" onChange={handleImageAsFile} />
        <Button type="submit" variant="contained" color="primary">
          send
          <SendIcon></SendIcon>
        </Button>
      </form>
    </Grid>
  );
}
