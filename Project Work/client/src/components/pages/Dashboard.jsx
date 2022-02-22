import React, { useEffect, useState} from 'react'
import { Container, Grid, makeStyles, Typography, Avatar } from '@material-ui/core';
import { ProgressBar } from '../layouts/ProgressBar';
import DashProject from './DashProject';
import { v4 as uuid } from 'uuid';
import PieChart from '../layouts/PieChart';
import { userStore } from '../storage/store';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        height: 700,
        maxWidth: '80%',
        marginTop: '3%',
        marginLeft: '0%'
    },
    card: {
        height: 400,
        maxWidth: 400
    },
    projects: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginLeft: 10,
        marginRight: 10,
    },
    projects_wrapper: {
        height: '32vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid lightgray',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)',
        marginLeft: '3%',
        marginBottom: '0%'
    },
    progress_bar: {
        height: '32vh',
        width: '20vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid lightgray',
        borderRadius: '10px',
        textAlign: 'center',
        ['@media(max-width: 1280px)']: {
            height: '30vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid lightgray',
            borderRadius: '10px',
        },
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
    },
    updates: {
        height: '35vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    updates_wrapper: {
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightgray',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)',
    },
    pie: {
        height: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightgray',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)'
    },
    profile_sidebar: {
        display: 'flex',
        marginTop: '3.6%',
        maxHeight: '82.5vh',
        flexDirection: 'column',
        alignItems: 'center',
        width: '32%',
        marginLeft: '2.5rem',
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid lightgray',
        borderRadius: '10px'
    },
    ["@media(max-width: 768px)"]: {
        profile_sidebar: {
            display: 'none',
        }
    },
    userName: {
        marginTop: '2rem',
        marginLeft: '1.3rem',
        fontSize: 'small',
        color: 'gray',
    },
    email: {
        marginTop: '1.6rem',
        marginLeft: '1rem',
        fontSize: 'small'
    },
    title: {
        marginTop: '1.2rem',
        marginLeft: '2.2rem',
        fontSize: 'x-large'
    },
    bio: {
        marginTop: '1.2rem',
        fontSize: 'medium',
        marginLeft: '0.6rem',
        maxWidth: '280px'
    }
});

const Dashboard = () => {
    const classes = useStyles();
    const userName = userStore.getState().loggedInUser.username;
    const userEmail = userStore.getState().loggedInUser.email;
    const userTitle = userStore.getState().loggedInUser.title;
    const userBio = userStore.getState().loggedInUser.bio;
    const [projects, setProjects] = useState([]);
    const project = {
        id: uuid(),
        img: "https://blog.hubspot.com/hubfs/image8-2.jpg",
        project_title: 'Google',
        team_assigned: 10,
        project_manager: '',
        project_description: 'This is a new description',
        projectDeadline: new Date()
    }

    useEffect(() => {
        fetch('/findprojects', {
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
                if (data !== undefined) {
                    setProjects([...data.slice(0, 3)]);
                    // projects = [...data.slice(0, 3)];
                }
            });
        return () => {
            return true;
        }
    }, [])

    return (
        <Container maxWidth='lg' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} sm={10} md={10} lg={4} >
                    <div className={classes.progress_bar}>
                        <Typography style={{ fontSize: 24 }}><b>Budget</b></Typography>
                        <ProgressBar width={200} percent={100 * 30 / 80} />
                        <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', marginTop: 20, marginLeft: 30 }}>
                            <p style={{ marginRight: 20 }}>Utilized : <span>$20,000</span>
                                <br />
                            Allotted : <span>$60,000</span></p>
                        </div>
                    </div>
                </Grid>
                <Grid item className={classes.item} xs={12} sm={10} md={10} lg={8}>
                    <div className={classes.projects_wrapper}>
                        <Typography style={{ fontSize: 24, marginBottom: 5 }}><b>Current Projects</b></Typography>
                        <div className={classes.projects}>
                            {/* Map through all project from the backend here and pass as project object*/}
                            {
                                projects.map((project, index) => {
                                    return(
                                    <Link to='/Projects' key={index}>
                                        <DashProject project={project}></DashProject>
                                    </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item className={classes.item} xs={12} sm={10} md={10} lg={6}>
                    <div className={classes.updates_wrapper}>
                        <Typography style={{ fontSize: 24 }}><b>Updates</b></Typography>
                        <div className={classes.updates}>
                            <Typography style={{ fontSize: 14, marginLeft: '1rem' }}> {'>'} New task added: Complete Projects section</Typography>
                            <Typography style={{ fontSize: 14, marginLeft: '1rem' }}> {'>'} @administration moved task #11 from Todo to Done</Typography>
                            <Typography style={{ fontSize: 14, marginLeft: '1rem' }}> {'>'} @projectmanager123 moved task #14 from Todo to Doing</Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item className={classes.item} xs={12} sm={10} md={10} lg={6}>
                    <div className={classes.pie}>
                        <PieChart values={[200, 100, 75]}></PieChart>
                    </div>
                </Grid>
            </Grid>
            {window.innerWidth > 768 ? <div className={classes.profile_sidebar}>
                <div className={classes.profile_header}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${userName}.svg`} style={{ height: '8.5rem', width: '8.5rem', marginTop: '2rem' }}></Avatar>
                    <p className={classes.userName}>@{userName}</p>
                    {userEmail !== '' ? <p className={classes.email}>{userEmail}</p> : null}
                    {userTitle !== '' ? <p className={classes.title}>{userTitle}</p> : null}
                    {userBio !== '' ? <p className={classes.bio}>{userBio}</p> : null}
                </div>
            </div>
                : null}

        </Container>
    )
}

export default Dashboard;

