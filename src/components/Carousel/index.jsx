import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { withStyles } from 'material-ui/styles';
import Slider from 'react-slick';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    margin: '10px 0',
    float: 'right',
  },
  cardContent: {
    paddingLeft: 5,
    paddingRight: 5,
    minWidth: 0, // So the Typography noWrap works
    paddingTop: theme.spacing.double,
    paddingBottom: theme.spacing.double,
    backgroundColor: theme.palette.primary.light,
    '&:last-child': {
      paddingBottom: theme.spacing.triple,
    },
  },
});

class Carousel extends Component {
  constructor(props) {
    super(props);
    const { projectSelections, projectGroups } = this.props;
    // add state of projectsInfo containing project name and description pair
    const projectsInfo = Object.entries(projectGroups).reduce(
      (prevProjectsInfo, currProjectGroup) => {
        const projects = currProjectGroup[1].reduce(
          (prevProjects, currProject) =>
            currProject.description
              ? {
                  ...prevProjects,
                  [currProject.fileName]: currProject.description,
                }
              : { ...prevProjects },
          {}
        );

        return { ...prevProjectsInfo, ...projects };
      },
      {}
    );

    this.state = {
      projectSelections,
      projectsInfo,
    };
  }

  render() {
    const { classes } = this.props;
    const { projectSelections, projectsInfo } = this.state;
    const selectedProject = Object.keys(projectSelections).filter(
      project => projectSelections[project] && projectsInfo[project]
    );
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      initialSlide: 0,
    };

    return (
      <div className={classes.content}>
        {selectedProject.length > 0 && (
          <div>
            <Slider {...settings}>
              {selectedProject.map(project => (
                <div key={project}>
                  <Card raised>
                    <div>
                      <CardContent classes={{ root: classes.cardContent }}>
                        <Typography variant="subheading" align="center">
                          <ReactMarkdown source={projectsInfo[project]} />
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Carousel);
