import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from './colors';
export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.green,
      contrastText:"#ddd",
    },
    secondary: {
      main: colors.orange,
    },
    text:{
      primary:"#ffffff",
      secondary:"#cccccc",
    }
  },

});