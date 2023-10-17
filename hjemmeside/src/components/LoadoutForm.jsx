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
import ReactCrop from "react-image-crop";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { postImage, postLoadout } from "../service/realtimeAPI";
import { useStyles } from "../styles";
import { UserContext } from "../UserProvider";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "react-image-crop/dist/ReactCrop.css";
import {
  loadoutCamos,
  loadoutTags,
  loadoutRoles,
} from "../consts/loadoutConsts";

export default function LoadoutForm() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [openError, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //crop states
  const aspectRatio = 3 / 4;
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: aspectRatio,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  /**
   * gather fields from form, validate and send to server
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let attributes = [];
    loadoutTags.forEach((element) => {
      if (document.getElementById(element).checked) {
        attributes.push(element);
      }
    });
    let camo = e.target.camo.value;
    attributes.push(camo);
    let loadout = {
      name: e.target.name.value,
      items: e.target.items.value,
      author: user.displayName,
      role: e.target.role.value,
      attributes: attributes,
    };
    if (!ValidateInput(loadout, camo)) {
      //error
    } else {
      postLoadout(loadout);
      postCroppedImage(loadout.name);
    }
  };

  function postCroppedImage(name) {
    const canvas = previewCanvasRef.current;
    console.log(canvas);
    canvas.toBlob(function (blob) {
      console.log(blob);
      postImage(name, blob, history);
    });
  }

  function ValidateInput(loadout, camo) {
    if (loadout.items.length < 20) {
      //probably not valid
      // DisplayError("Exported loadout does not seem to be correct");
      // return false;
    }
    if (loadout.name.length < 3) {
      DisplayError("Too short name");
      return false;
    }
    if (!loadout.role) {
      DisplayError("Missing Role");
      return false;
    }
    if (!camo) {
      DisplayError("Missing Camo");
      return false;
    }
    return true;
  }

  function DisplayError(msg) {
    setErrorMsg(msg);
    setOpen(true);
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
    setImageIsLoaded(true);
  }, []);

  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));

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
          paste text from ARMA arsenal
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
            <RadioGroup name="role">
              {loadoutRoles.map((val, i) => {
                return (
                  <FormControlLabel
                    value={val}
                    control={<Radio />}
                    label={val}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>

          <FormControl
            component="fieldset"
            margin="dense"
            className={classes.formControl}
          >
            <FormLabel component="legend">Camo:</FormLabel>
            <RadioGroup aria-label="gender" name="camo">
              {loadoutCamos.map((val, i) => {
                return (
                  <FormControlLabel
                    value={val}
                    control={<Radio />}
                    label={val}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormControl
            margin="dense"
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">Tags:</FormLabel>
            <FormGroup>
              {loadoutTags.map((val, i) => {
                return (
                  <FormControlLabel
                    control={<Checkbox name={val} id={val} />}
                    label={val}
                  />
                );
              })}
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
        {imageIsLoaded && (
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            save loadout
            <SendIcon />
          </Button>
        )}
        <Box display="flex" alignItems="flex-start">
          <Box className={classes.imagePreview}>
            <ReactCrop
              className={classes.uploadedImage}
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              minHeight={100}
            />
          </Box>

          <canvas
            ref={previewCanvasRef}
            //set size of preview if image is uploaded
            style={{
              maxWidth: imageIsLoaded ? 500 * aspectRatio : 0,
              maxHeight: imageIsLoaded ? 500 : 0,
              paddingLeft: 10,
            }}
          />
        </Box>
      </form>
    </Grid>
  );
}
