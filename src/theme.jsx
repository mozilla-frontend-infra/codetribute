import { createMuiTheme } from '@material-ui/core/styles';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
const Roboto700 = { fontFamily: 'Roboto700, sans-serif' };
const theme = createMuiTheme({
  typography: {
    ...Roboto500,
    display4: Roboto300,
    display3: Roboto500,
    display2: Roboto700,
    display1: Roboto700,
    headline: Roboto700,
    title: Roboto700,
    subheading: Roboto500,
    body2: Roboto300,
    body1: Roboto300,
    caption: Roboto300,
    button: Roboto300,
  },
});

export default theme;
