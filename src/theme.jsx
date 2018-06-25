import { createMuiTheme } from '@material-ui/core/styles';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto400 = { fontFamily: 'Roboto400, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
const LIGHT_GREY = '#F5F5F6';
const PRIMARY = {
  LIGHT: '#4f83cc',
  MAIN: '#01579b',
  DARK: '#002f6c',
};
const SECONDARY = {
  LIGHT: '#b4ffff',
  MAIN: '#80deea',
  DARK: '#4bacb8',
};
const theme = createMuiTheme({
  palette: {
    divider: PRIMARY.DARK,
    background: {
      default: LIGHT_GREY,
    },
    type: 'light',
    primary: {
      light: PRIMARY.LIGHT,
      main: PRIMARY.MAIN,
      dark: PRIMARY.DARK,
      contrastText: '#fff',
    },
    secondary: {
      light: SECONDARY.LIGHT,
      main: SECONDARY.MAIN,
      dark: SECONDARY.DARK,
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
        marginRight: 1,
        backgroundColor: SECONDARY.DARK,
        color: 'white',
      },
    },
    MuiTypography: {
      display2: {
        color: '#fff',
      },
      display1: {
        color: '#fff',
      },
    },
    MuiTableCell: {
      root: {
        borderBottomWidth: 2,
      },
      head: {
        color: '#000',
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: SECONDARY.MAIN,
      },
    },
    MuiTableRow: {
      root: {
        '&$hover:hover': {
          backgroundColor: SECONDARY.MAIN,
        },
      },
    },
    MuiIconButton: {
      root: {
        width: 41,
        height: 41,
      },
    },
  },
});

export default theme;
