import React from "react";
import '../../styles/Projects.css';
import Lists from './Lists';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CssBaseline, Hidden } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import {Typography,IconButton} from '@material-ui/core'
import { Link, useRouteMatch } from "react-router-dom";
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      ['@media(max-width:600px)']:{
        display:'none',
        width:0
      },
      flexShrink: 0,
      zIndex: theme.zIndex.drawer - 1199
    },
    drawerPaper: {
      width: drawerWidth,
      ['@media(max-width:600px)']:{
        display:'none',
        width:0
      },
      zIndex: theme.zIndex.drawer - 1199,
      top: theme.spacing(8.7),
      ['@media(max-width:992px)']:{
        top: theme.spacing(15.5)
      },
      backgroundColor: '#fefeff',
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    linkName:{
        height: 50,
        padding: theme.spacing(2),
        display:'flex',
        justifyContent:'left',
        alignContent:'left',
        marginLeft: theme.spacing(5),
        marginBottom:theme.spacing(1)
    },
    drawerHeader:{
       height: theme.spacing(5),
       display: 'flex',
       alignContent: 'center',
       justifyContent: 'left',
       marginBottom: theme.spacing(10),
       marginLeft: theme.spacing(3),
       marginTop: theme.spacing(2)
    },
    linkNameContainer:{
        width: "93%",
        marginLeft: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginBottom:theme.spacing(1),
        transition: theme.transitions.create(["background-color"],{
            duration: 300,
        }),
        '&:hover':{
            backgroundColor: '#212a36',
            color: '#F1FAFF',
        }
    },
    linkNameContainerActive:{
        width: "93%",
        marginLeft: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginBottom:theme.spacing(1),
        color: '#F1FAFF',
        backgroundColor: '#212a36',
        '&:hover':{
            backgroundColor: '#212a36',
            color: '#F1FAFF',
        }
    },
    linkStyle:{
      color: '#212a36',
      '&:hover':{
        color:'#F1FAFF',
        textDecoration: 'none'
      }
    },
    linkStyleActive:{
      color: '#F1FAFF',
      '&:hover':{
        color:'#F1FAFF',
        textDecoration: 'none'
      }
    }
    
  }));
  


const Projects = (props)=>{
    let {path, url } = useRouteMatch();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const container = window !== undefined ? () => window().document.body : undefined;
    //renders all the Lists (todo)
    return (

            <div className = 'projects'>
                <div className = {classes.root}>
                <nav className={classes.drawer} aria-label="mailbox folders">

                <Hidden smUp implementation="css">
                    <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                    >
                    <div className={classes.drawerContainer}>
                    <Typography className = {classes.linkName}>Hello</Typography>
                    <Typography className = {classes.linkName}>There</Typography>
                    </div>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer container={container} 
                    variant={"permanent"} anchor={'left'}
                    open= {true}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >

                    <div className={classes.drawerContainer}>
                    <div className={classes.drawerHeader}>
                            <Typography style={{fontSize: 24}}>Projects menu</Typography>
                    </div>
                    <div className = {classes.linkNameContainer, classes.linkNameContainerActive}>
                    <Typography className = {classes.linkName}>
                      <Link to={`${url}/tasklist`} className = {classes.linkStyleActive}>Task List</Link>
                    </Typography>
                    </div>
                    <div className = {classes.linkNameContainer}>
                    <Typography className={classes.linkName} >
                    <Link to={`${url}/calendar`} className = {classes.linkStyle}>Calendar</Link>
                    </Typography>
                    </div>
                    <div className = {classes.linkNameContainer}>
                    <Typography className={classes.linkName}>
                    <Link to={`${url}/projects`} className = {classes.linkStyle}>Projects</Link>
                    </Typography>
                    </div>
                    </div>
                    </Drawer>
                </Hidden>
                </nav>
                </div>
                <Lists></Lists>
            </div>
    );
}
export default Projects;