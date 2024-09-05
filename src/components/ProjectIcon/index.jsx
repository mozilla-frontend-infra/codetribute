import React, { Component } from 'react';
import { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WebIcon from 'mdi-react/WebIcon';

// import all of the icons explicitly; this helps webpack to know exactly
// which icons we will use, and not try to bundle all of mdi-react into
// the app.
import LanguageJavascriptIcon from 'mdi-react/LanguageJavascriptIcon';
import HumanIcon from 'mdi-react/HumanIcon';
import PuzzleIcon from 'mdi-react/PuzzleIcon';
import BugIcon from 'mdi-react/BugIcon';
import RobotIcon from 'mdi-react/RobotIcon';
import CloudSyncIcon from 'mdi-react/CloudSyncIcon';
import CalendarIcon from 'mdi-react/CalendarIcon';
import LeadPencilIcon from 'mdi-react/LeadPencilIcon';
import TargetIcon from 'mdi-react/TargetIcon';
import ViewDashboardVariantIcon from 'mdi-react/ViewDashboardVariantIcon';
import ShipIcon from 'mdi-react/ShipIcon';
import ClippyIcon from 'mdi-react/ClippyIcon';
import WrenchIcon from 'mdi-react/WrenchIcon';
import PackageVariantIcon from 'mdi-react/PackageVariantIcon';
import SyncIcon from 'mdi-react/SyncIcon';
import CellphoneIcon from 'mdi-react/CellphoneIcon';
import LayersIcon from 'mdi-react/LayersIcon';
import DesktopMacIcon from 'mdi-react/DesktopMacIcon';
import SitemapIcon from 'mdi-react/SitemapIcon';
import ImageSearchIcon from 'mdi-react/ImageSearchIcon';
import FileDocumentBoxMultipleIcon from 'mdi-react/FileDocumentBoxMultipleIcon';
import ServerIcon from 'mdi-react/ServerIcon';
import VectorCombineIcon from 'mdi-react/VectorCombineIcon';
import FormatIndentIncreaseIcon from 'mdi-react/FormatIndentIncreaseIcon';
import RadioTowerIcon from 'mdi-react/RadioTowerIcon';
import TestTubeIcon from 'mdi-react/TestTubeIcon';
import BookOpenPageVariantIcon from 'mdi-react/BookOpenPageVariantIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import PineTreeIcon from 'mdi-react/PineTreeIcon';

// custom icons defined as SVG files
import WebextensionsIcon from '../../images/projectIcons/webextensions.svg';
import PontoonIcon from '../../images/projectIcons/pontoon.svg';
import RustIcon from '../../images/projectIcons/rust.svg';
import SeamonkeyIcon from '../../images/projectIcons/seamonkey.svg';
import ServoIcon from '../../images/projectIcons/servo.svg';
import TaskclusterIcon from '../../images/projectIcons/taskcluster.svg';
import MultiAccountContainersIcon from '../../images/projectIcons/multi-account-containers.png';

export default
@withStyles((theme) => ({
  projectIcon: {
    color: theme.palette.secondary.dark,
  },
}))
class ProjectIcon extends Component {
  render() {
    const { icon, classes } = this.props;

    switch (icon ) {
    case 'language-javascript': return <LanguageJavascriptIcon size={50} className={classes.projectIcon} />;
    case 'human': return  <HumanIcon size={50} className={classes.projectIcon} />;
    case 'puzzle': return  <PuzzleIcon size={50} className={classes.projectIcon} />;
    case 'bug': return  <BugIcon size={50} className={classes.projectIcon} />;
    case 'robot': return  <RobotIcon size={50} className={classes.projectIcon} />;
    case 'cloud-sync': return <CloudSyncIcon size={50} className={classes.projectIcon} />;
    case 'calendar': return  <CalendarIcon size={50} className={classes.projectIcon} />;
    case 'lead-pencil': return <LeadPencilIcon size={50} className={classes.projectIcon} />;
    case 'target': return  <TargetIcon size={50} className={classes.projectIcon} />;
    case 'view-dashboard-variant': return <ViewDashboardVariantIcon size={50} className={classes.projectIcon} />;
    case 'ship': return  <ShipIcon size={50} className={classes.projectIcon} />;
    case 'clippy': return  <ClippyIcon size={50} className={classes.projectIcon} />;
    case 'wrench': return  <WrenchIcon size={50} className={classes.projectIcon} />;
    case 'package-variant': return <PackageVariantIcon size={50} className={classes.projectIcon} />;
    case 'sync': return  <SyncIcon size={50} className={classes.projectIcon} />;
    case 'cellphone': return  <CellphoneIcon size={50} className={classes.projectIcon} />;
    case 'layers': return  <LayersIcon size={50} className={classes.projectIcon} />;
    case 'desktop-mac': return <DesktopMacIcon size={50} className={classes.projectIcon} />;
    case 'sitemap': return  <SitemapIcon size={50} className={classes.projectIcon} />;
    case 'image-search': return <ImageSearchIcon size={50} className={classes.projectIcon} />;
    case 'file-document-box-multiple': return <FileDocumentBoxMultipleIcon size={50} className={classes.projectIcon} />;
    case 'server': return  <ServerIcon size={50} className={classes.projectIcon} />;
    case 'vector-combine': return <VectorCombineIcon size={50} className={classes.projectIcon} />;
    case 'format-indent-increase': return <FormatIndentIncreaseIcon size={50} className={classes.projectIcon} />;
    case 'radio-tower': return <RadioTowerIcon size={50} className={classes.projectIcon} />;
    case 'test-tube': return <TestTubeIcon size={50} className={classes.projectIcon} />;
    case 'book-open-page-variant': return <BookOpenPageVariantIcon size={50} className={classes.projectIcon} />;
    case 'email': return  <EmailIcon size={50} className={classes.projectIcon} />;
    case 'pine-tree': return <PineTreeIcon size={50} className={classes.projectIcon} />;

    case 'webextensions': return <img height="45" src={WebextensionsIcon} alt="Webextensions Icon" />;
    case 'pontoon': return <img height="45" src={PontoonIcon} alt="Pontoon Icon" />;
    case 'rust': return <img height="45" src={RustIcon} alt="Rust Icon" />;
    case 'seamonkey': return <img height="45" src={SeamonkeyIcon} alt="Seamonkey Icon" />;
    case 'servo': return <img height="45" src={ServoIcon} alt="Servo Icon" />;
    case 'taskcluster': return <img height="45" src={TaskclusterIcon} alt="Taskcluster Icon" />;
    case 'multi-account-containers': return <img height="45" src={MultiAccountContainersIcon} alt="Multi-Account Containers Icon" />;

    default: return <WebIcon size={50} className={classes.projectIcon} />;
    }
  }
}
ProjectIcon.propTypes = {
  // The name of the icon to display, from the case statement above.
  icon: string,
};
