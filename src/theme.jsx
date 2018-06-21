import { createMuiTheme } from '@material-ui/core/styles';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto400 = { fontFamily: 'Roboto400, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
const AQUA = '#51AAD4';
const LIGHT_GREY = '#f7f9fa';
const theme = createMuiTheme({
  palette: {
    background: {
      default: LIGHT_GREY,
    },
    type: 'light',
    primary: {
      light: LIGHT_GREY,
      main: '#ecffff',
      dark: AQUA,
      contrastText: '#222222',
    },
    secondary: {
      contrastText: '#A0A0A0',
    },
  },
  typography: {
    ...Roboto400,
    display4: Roboto300,
    display3: Roboto400,
    display2: Roboto400,
    display1: Roboto400,
    headline: Roboto400,
    title: Roboto500,
    subheading: Roboto400,
    body2: Roboto500,
    body1: Roboto400,
    caption: Roboto400,
    button: Roboto500,
  },
  overrides: {
    MuiChip: {
      root: {
        height: 24,
      },
    },
    MuiTypography: {
      display2: {
        color: AQUA,
      },
    },
    MuiTableCell: {
      head: {
        fontSize: 16,
        color: '#64A4C9',
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: AQUA,
      },
    },
  },
});

export default theme;
