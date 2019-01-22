import { createMuiTheme } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto400 = { fontFamily: 'Roboto400, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
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
  drawerWidth: 240,
  palette: {
    divider: PRIMARY.DARK,
    background: {
      default: '#fff',
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
    useNextVariants: true,
    ...Roboto400,
    h1: Roboto300,
    h2: Roboto400,
    h3: Roboto400,
    h4: Roboto400,
    h5: Roboto400,
    h6: Roboto500,
    subtitle1: Roboto400,
    body1: Roboto500,
    body2: Roboto400,
    caption: Roboto400,
    button: Roboto500,
  },
  overrides: {
    MuiChip: {
      root: {
        height: 20,
        marginRight: 4,
        backgroundColor: PRIMARY.MAIN,
        color: 'white',
      },
      clickable: {
        '&:focus': {
          backgroundColor: PRIMARY.MAIN,
        },
        '&:hover': {
          backgroundColor: emphasize(SECONDARY.DARK),
        },
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
        padding: '4px 16px',
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
    MuiIconButton: {
      root: {
        width: 41,
        height: 41,
        color: '#000',
        padding: 0,
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
    },
  },
});

export default theme;
