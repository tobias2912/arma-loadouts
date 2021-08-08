const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    loadoutstringbox:{
        maxHeight:"4rem",
        overflowY:"scroll",
        overflowWrap:"break-word",
        color:"#777777"
    },
    loadoutCard:{
        margin:"1rem",
    },
    formField:{
        width:"100%",
        margin:"1rem",
    },
    rootContainer:{
        padding:"2rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    }

}));