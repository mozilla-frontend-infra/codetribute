import { createMuiTheme } from '@material-ui/core/styles';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto400 = { fontFamily: 'Roboto400, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
const LIGHT_GREY = '#F5F5F6';
const AQUA = '#80deea';
const BLUE = '#01579b';
const theme = createMuiTheme({
  palette: {
    background: {
      default: LIGHT_GREY,
    },
    type: 'light',
    primary: {
      light: '#4f83cc',
      main: BLUE,
      dark: '#002f6c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b4ffff',
      main: AQUA,
      dark: '#4bacb8',
      contrastText: '#000',
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
        color: '#fff',
      },
    },
    MuiTableCell: {
      head: {
        fontSize: 16,
        color: BLUE,
      },
      body: {
        color: '#fff',
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: AQUA,
      },
    },
    MuiTableRow: {
      root: {
        '&$hover:hover': {
          backgroundColor: '#686868',
        },
      },
    },
  },
});

export default theme;
