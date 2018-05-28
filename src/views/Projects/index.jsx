import { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ReactMarkdown from 'react-markdown';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import projects from '../../data/loader';
import CustomizedCard from '../../components/CustomizedCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  mainCard: {
    backgroundColor: theme.palette.primary.dark,
    margin: theme.spacing.unit * 3,
  },
  text: {
    color: theme.palette.secondary.light,
    margin: '1px',
  },
  grid: {
    padding: '0 15px !important',
    maxWidth: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background,
    minWidth: 0,
  },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  flex1: {
    flex: 1,
  },
  columnFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects,
      search: '',
    };
  }

  handleTextInputChange = event => {
    this.setState({ search: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { projects, search } = this.state;
    const selectedProjects = Object.keys(projects)
      .filter(fileName => {
        const found =
          fileName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          projects[fileName].name
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1;

        return found;
      })
      .reduce(
        (prev, key) => ({
          ...prev,
          [key]: projects[key],
        }),
        {}
      );

    return (
      <div className={classes.root}>
        <header>
          <Grid
            container
            spacing={16}
            direction="column"
            justify="center"
            alignItems="center">
            <Grid item xs={12}>
              <div className={classes.columnFlex}>
                <div className={classes.flex1} />
                <div>
                  <Typography variant="display4" align="center">
                    Bug Issue UI
                  </Typography>
                  <Typography variant="display1" align="center">
                    A first contribution finder
                  </Typography>
                </div>
                <div className={classes.flex1} />
              </div>
            </Grid>
          </Grid>
        </header>
        <main className={classes.content}>
          <div className={classes.container}>
            <TextField
              label="Search"
              id="margin-normal"
              fullWidth
              value={this.state.search}
              className={classes.textField}
              helperText="Project name, Keyword"
              onChange={this.handleTextInputChange}
            />
            <Grid container spacing={16} justify="center" alignItems="center">
              {Object.entries(selectedProjects).map(([project, info]) => (
                <Grid
                  item
                  key={project}
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.grid}>
                  <CustomizedCard
                    title={info.name}
                    description={<ReactMarkdown source={info.description} />}
                    footer={<Button color="primary">VIEW PROJECT</Button>}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Projects);
