import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploadModal from './ImageUploadModal';
import {userStore} from '../storage/store.js';

const useStyles = makeStyles((theme) => ({
    project__title: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        minWidth: '90%',
        fontSize: '24px',
        "&.Mui-focused": {
            backgroundColor: '#f7f7f7',
        }
    },
    project__image: {
        maxHeight: '20%',
        maxWidth: '100%',
    },
    team__assigned: {
        margin: 20,
        fontWeight: '400'
    },
    project__manager: {
        margin: 20,
        fontWeight: '400',
    },
    project__description: {
        margin: 20,
        fontWeight: '400'
    },
    description: {
        paddingTop: 20,
        borderRadius: 10,
        marginTop: 5,
        "&.Mui-focused": {
            backgroundColor: '#f7f7f7',
            height: 'fit-content',
            padding: 30
        }
    },
    project__deadline: {
        margin: 20,
        fontWeight: '400'
    },
    save__button: {
        margin: 20
    },
    delete__button: {
        margin: 20
    },
    label: {
        fontWeight: '500'
    },
    calendar__container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    calendar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    }
}));

const ProjectModal = ({ id, isOpen, setOpen, title, setTitle, description, setDescription, image, setImage, team, setTeam, deadline, setDeadline, manager, setManager, projects, setProjects }) => {
    const classes = useStyles();
    const [tempId, setTempId] = useState(id);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempDescription, setTempDescription] = useState(description);
    const [tempManager, setTempManager] = useState(manager);
    const [managerInput, setManagerInput] = useState([]);
    const [selectedDate, setSelectedDate] = useState(deadline.slice(0, 10));
    const [errorTeam, setErrorTeam] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const userType = userStore.getState().loggedInUser.usertype;

    useEffect(() => {
        fetch(
            '/getmanager',
            {
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
                        setManagerInput([]);
                    } else {
                        setManagerInput(data.map(d => { return d.username }));
                    }
                });
        return () => { return true; };
    }, []);

    const handleOnChange = (e) => {
        setTempTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setTempDescription(e.target.value);
    }
    const handleDateChange = (e) => {
        console.log(e.target.value);
        setSelectedDate(e.target.value);
    };
    const handleTeamChange = (e) => {
        setTeam(e.target.value);
        if (e.target.value <= 0 || !e.target.value) {
            setErrorTeam(true);
        }
        else
            setErrorTeam(false);
    }
    const handleSave = (e) => {
        setTitle(tempTitle);
        setDescription(tempDescription);
        if (errorTeam || !team) {
            setErrorTeam(true);
        }
        else {
            setOpen(false);
        }
        fetch('/findproject', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tempId })
        })
            .then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(output => {

                let data = {
                    id: tempId,
                    projectname: tempTitle,
                    deadline: selectedDate,
                    manager: tempManager,
                    team: parseInt(team, 10),
                    description: tempDescription,
                    image: image
                };

                if (output !== undefined) {
                    fetch('/updateproject', {   
                        method: 'PUT',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            //check the response
                            if (response.status === 500) {
                                return undefined;
                            }
                            return response.json();
                        })
                        .then(out => {
                            if (out !== undefined) {
                                setProjects(
                                    projects.map((project) => {
                                        if (project.id === out.id) {
                                            return out;
                                        } else {
                                            return project;
                                        }
                                    })
                                );
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                } else {
                    fetch('/addproject', {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            //check the response
                            if (response.status === 500) {
                                return undefined;
                            }
                            return response.json();
                        })
                        .then(out => {
                            if (out !== undefined) {
                                setTempId(out.id);
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                }
            }).catch(error => {
                console.log(error);
            });
    }

    const handleDelete = (e) => {
        const body = { id };
        fetch(
            '/deleteproject', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
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
                    setProjects(projects.filter(project => project.id !== data.id));
                    setOpen(false);
                }
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
        {userType !== 2?
        <ImageUploadModal openUpload={openUpload} setOpenUpload={setOpenUpload} setImage={setImage}></ImageUploadModal>
        : null
        }
           <Dialog open={isOpen} className={classes.dialog__container} onClose={()=>setOpen(false)}>
                <DialogTitle id='simple-dialog-title'>
                    <div className={classes.project__title}>
                        <Typography variant={'h5'} component={'h2'} style={{ flex: 1, alignItems: 'center' }}>
                            <InputBase value={tempTitle} onChange={handleOnChange} className={classes.title}></InputBase>
                        </Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <div>
                        <img src={image}
                            alt="project-image"
                            className={classes.project__image} onClick={() => setOpenUpload(true)} />
                    </div>
                    <div className={classes.team__assigned}>
                        <TextField
                            id="standard-number"
                            label="Team Assigned"
                            type="number"
                            value={team}
                            onChange={handleTeamChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={errorTeam}
                        />
                    </div>
                    <div className={classes.project__manager}>
                        <Autocomplete
                            onChange={(e, newValue) => {
                                if(newValue)
                                setTempManager(newValue);
                                else
                                setTempManager('');
                            }}
                            inputValue={tempManager}
                            value={tempManager}
                            onInputChange={(e, newInputValue) => {
                                if(newInputValue)
                                setTempManager(newInputValue);
                                else
                                setTempManager('');
                            }}
                            options={managerInput}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Manager"
                                    variant="outlined"
                                    style={{ maxWidth: '70%' }}
                                />}
                        />
                    </div>
                    <div className={classes.project__description}>
                        <span className={classes.label}>Project Description</span>:
                    <InputBase value={tempDescription}
                            type='textarea' placeholder='Enter Description...'
                            fullWidth multiline
                            onChange={handleDescriptionChange}
                            className={classes.description}
                        />
                    </div>
                    <div className={classes.project__deadline}>
                        <form className={classes.calendar__container} noValidate={true}>
                            <TextField
                                label="Project Deadline"
                                type="date"
                                value={selectedDate}
                                defaultValue={selectedDate}
                                className={classes.calendar}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={handleDateChange}
                            ></TextField>
                        </form>
                    </div>
                    {userType !==2?
                    <Button size="small" color="primary" variant="outlined" className={classes.save__button} onClick={handleSave}>
                        Save
                    </Button>: null}
                    
                    {userType ===0?
                    <Button size="small" color="secondary" variant="outlined" className={classes.delete__button} onClick={handleDelete}>
                        Delete
                    </Button> : null}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ProjectModal;