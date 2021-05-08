import ProjectCard from '../layouts/ProjectCard';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Container} from '@material-ui/core';
import AddProjectCard from '../layouts/AddProjectCard';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    container: {
        height: 560,
        overflow: 'auto',
        marginBottom: 100,
    }
});
// useEffect(()=>{
//     axios.get('/projects').then(res=> {
//         console.log(res.data);
//         projectList.push(res.data);
//         console.log(projectList);
//     });

// });
const Projects = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);

    function fetchProjects() {
        fetch('http://localhost:4000/findprojects', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(data => {
                if (data === undefined) {
                    //if the the search is wrong then throw warning
                    setProjects([]);
                } else {
                    setProjects(data);
                }
            });
    }
    useEffect(() => {
        fetchProjects();
        return () => {
            return true;
        }
    },[])
    return (
        <>
            <Container maxWidth='lg' >
                <h2 style={{ marginBottom: 40, marginTop: 40 }}>All projects</h2>
                <Grid container justify='center' alignItems='center' spacing={4} className={classes.container}>
                    {projects.map((project, index) =>
                        <Grid item xs={8} sm={7} md={4} lg={3} key={index}>
                            <ProjectCard
                                project={project}
                                projects={projects}
                                setProjects={setProjects}
                            ></ProjectCard>
                        </Grid>
                    )}
                    <AddProjectCard projects={projects} setProjects={setProjects}></AddProjectCard>
                </Grid>
            </Container>
        </>
    );

}
export default Projects;