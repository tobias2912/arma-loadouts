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
import ReactCrop from 'react-image-crop';
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { postImage, postLoadout } from "../service/realtimeAPI";
import { useStyles } from "../styles";
import { UserContext } from "../UserProvider";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "react-image-crop/dist/ReactCrop.css";

export default function LoadoutForm() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [classValue, setClassValue] = useState("Assault");
  const [openError, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //crop states

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 3 / 4 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
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
      postCroppedImage(loadout.name);
      console.log("original:", upImg);
      postLoadout(loadout).then(() => {
        history.push("/");
      });
    }
  };

  const postCroppedImage = (name) => {
    const canvas = previewCanvasRef.current;
    console.log(canvas);
    canvas.toBlob(function (blob) {
      console.log(blob);
      postImage((name), blob)
    });;

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

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.download = 'cropPreview.png';
        anchor.href = URL.createObjectURL(blob);
        anchor.click();

        window.URL.revokeObjectURL(previewUrl);
      },
      'image/png',
      1
    );
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  function blobCreationFromURL(inputURI) {
  
    var binaryVal;

    // mime extension extraction
    var inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(',')[0].indexOf('base64') >= 0)
        binaryVal = atob(inputURI.split(',')[1]);

    // Decoding of base64 encoded string
    else
        binaryVal = unescape(inputURI.split(',')[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character 
    // it represents

    // Store the bytes of the string to a typed array
    var blobArray = [];
    for (var index = 0; index < binaryVal.length; index++) {
        blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray], {
        type: inputMIME
    });
}


  const handleClassChange = () => { };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));

      reader.readAsDataURL(e.target.files[0]);
    }
  };
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
        <Button
          variant="contained"
          component="label"
          className={classes.button}
        >
          Click to upload Image
          <input type="file" hidden onChange={onSelectFile} />
        </Button>
        {true ?
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          :
          <p>waiting</p>
        }
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0)/2,
            height: Math.round(completedCrop?.height ?? 0)/2
          }}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          send
          <SendIcon></SendIcon>
        </Button>
      </form>

    </Grid >
  );
}
