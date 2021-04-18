import ProjectCard from '../layouts/ProjectCard';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Container} from '@material-ui/core';
import AddProjectCard from '../layouts/AddProjectCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {v4 as uuid} from 'uuid';
import { useState } from 'react';
const useStyles = makeStyles({
    container:{
        height: 560,
        overflow: 'auto',
        marginBottom: 100,
    }
});
const projectList = [
    {
        id: uuid(),
        img: "https://blog.hubspot.com/hubfs/image8-2.jpg",
        project_title: 'Google',
        team_assigned: 10,
        project_manager: '',
        project_description: 'This is a new description',
        projectDeadline: new Date()
    },
    {
        id: uuid(),
        img: "http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG",
        project_title: 'Amazon',
        team_assigned: 10,
        project_manager: '',
        project_description: 'How are you all?',
        projectDeadline: new Date()
    },
    {
        id: uuid(),
        img: "https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png",
        project_title: 'Facebook',
        team_assigned: 10,
        project_manager: '',
        project_description: 'I have successfully rendered projects!!',
        projectDeadline: new Date()
    },
    {
        id: uuid(),
        img: "https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=26",
        project_title: 'Netflix',
        team_assigned: 12,
        project_manager: '',
        project_description: 'I am gonna watch new movies with Netflix. Building a new version of Netflix with my team. How cool is that. Why am I writing this gibber??',
        projectDeadline: new Date()
    },

]
const Projects = () => {
const classes = useStyles();
const theme = useTheme();
const [projects, setProjects] = useState(projectList);
return(
    <>
    <Container maxWidth='lg' >
        <h2 style={{marginBottom: 40, marginTop:40}}>All projects</h2>
        <Grid container justify='center' alignItems='center' spacing={4} className = {classes.container}>
            {projects.map((project,index)=>
                <Grid item xs = {8} sm = {7} md = {4} lg = {3} key={index}>
                <ProjectCard 
                project={project}
                ></ProjectCard>
                </Grid>
            )}
            <AddProjectCard projects = {projects} setProjects = {setProjects}></AddProjectCard>
        </Grid>
    </Container>
    </>
);
  
}
export default Projects;