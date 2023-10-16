import { colors } from "./colors";

const { makeStyles } = require("@material-ui/core");
export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    main: {
        backgroundColor: colors.background.dark,
    },

    //add loadout
    button: {
        margin: "1rem",
        maxWidth: "15rem",
        alingSelf: "center",
    },
    loadoutstringbox: {
        width: "100%",
        maxHeight: "4rem",
        overflowY: "scroll",
        overflowWrap: "break-word",
        color: "#777777",
        backgroundColor: colors.background.dark,
    },
    uploadedImage: {
        maxHeight: "500px"
    },
    icon: {
        '&:hover': {
            color: colors.orange,
        },
        margin: "1rem",
        width: "2rem",
    },
    loadoutform: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    formField: {
        width: "100%",
        margin: "1rem",
        borderColor: "#ff0"
    },
    optionsBox: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",

    },
    formControl: {
        minWidth: "10rem",
    },

    rootContainer: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.background.dark,
        minHeight: "80rem",
    },

    //loadoutcards
    loadoutCard: {
        margin: "1rem",
        backgroundColor: colors.background.medium,
        width: "35rem"
    },
    accountContainer: {
        width: "5rem",
        // backgroundColor:colors.background.dark,
        padding: "0rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
    },
    attributeChip: {
        margin: "0.1rem",
    },
    img: {
        // objectFit: "scale-down",
        width: "10rem"
    },
    imageContainer: {
        backgroundColor: colors.background.dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        color: colors.background.dark,
        width: "100%",
        height: "2px",
    },
    searchtoolBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",

    },
    headerButtonLink: {
        "&:visited": {
            color: "#ffffff",
            textDecoration: "none",
        },
    },
    headerbar: {
        alignItems: "space-between",
        justifyContent: "space-between",
    },
    sidebar: {
        width: "250px",
        backgroundColor: "black",
        display:"flex",
        flexDirection:"column"
    },
    contentWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch"
    }
}));
