import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#014009',
      contrastText:"#ddd",
    },
    secondary: {
      main: '#906400'
    },
    text:{
      primary:"#ffffff",
      secondary:"#cccccc",
    }

  },

});