import { colors } from "./colors";

const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    loadoutstringbox: {
        maxHeight: "4rem",
        overflowY: "scroll",
        overflowWrap: "break-word",
        color: "#777777"
    },
    loadoutCard: {
        margin: "1rem",
        backgroundColor: colors.background.medium,
    },
    formField: {
        width: "100%",
        margin: "1rem",
    },
    rootContainer: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.background.dark
    },
    searchbar: {
        width: "80%",
        margin: "0rem"
    },
    headerButton: {
        color: "#dddddd",
        "&:visited": {
            color: "#dddddd"
        },

    }

}));