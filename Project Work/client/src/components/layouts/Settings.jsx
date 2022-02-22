import { Avatar, InputLabel, OutlinedInput, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { userStore } from '../storage/store';
import { InputAdornment, IconButton, FormControl, FormHelperText } from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../../styles/Settings.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { USER_LOGGEDIN } from "../storage/actiontype";
import axios from 'axios';

const useStyles = makeStyles({
    input: {
        marginTop: '1.2rem',
        marginLeft: '1rem',
        marginRight: '1rem'
    }
});
const Settings = () => {
    const classes = useStyles();
    const userName = userStore.getState().loggedInUser.username;
    const userEmail = userStore.getState().loggedInUser.email;
    const userTitle = userStore.getState().loggedInUser.title;
    const userFullName = userStore.getState().loggedInUser.full_name;
    const userType = userStore.getState().loggedInUser.usertype;
    const userBio = userStore.getState().loggedInUser.bio;
    const [email, setEmail] = useState(userEmail ? userEmail : "");
    const [title, setTitle] = useState(userTitle ? userTitle : '');
    const [bio, setBio] = useState(userBio ? userBio : "");
    const [fullName, setFullName] = useState(userFullName ? userFullName : "");
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const pattern = /^[0-9a-zA-Z]*$/;

    const handleOnClick = () => {
        if (fullName === '') {
            setNameError('Full Name is required!');
            return;
        }
        if (email === '') {
            setEmailError('Email is required!');
            return;
        }
        if (!ValidateEmail(email)) {
            setEmailError('Valid Email required!');
            return;
        }
        if (password === '') {
            setPasswordError('Password is required!');
            return;
        }
        if (!ValidatePassword(password)) {
            setPasswordError('Password must be alpha numerical!');
            return;
        }
        if (password.length < 10 || password.length > 30) {
            setPasswordError('Password must be 10 to 30 characters long!');
            return;
        }

        axios.post('/changeusersettings', {
            username: userName,
            full_name: fullName,
            email: email,
            title: title,
            bio: bio,
            password: password
        }).then(res => {
            NotificationManager.success("Changes saved successfully!", "Notification");
            if (res.data.success) {
                userStore.dispatch({
                    type: USER_LOGGEDIN,
                    payload: {
                        usertype: userType,
                        username: userName,
                        email: email,
                        password: password,
                        full_name: fullName,
                        title: title,
                        bio: bio
                    }
                });
            }
        });
    }
    function ValidateEmail(mail) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(mail)) {
            return (true)
        }
        return (false)
    }
    function ValidatePassword(pwd) {
        if (pattern.test(pwd))
            return true;
        else
            return false;
    }
    const handleNameChange = (e) => {
        setFullName(e.target.value);
        if (e.target.value === '') {
            setNameError('Full Name is required!');
        }
        else
            setNameError('');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value === '')
            setEmailError('Email is required');
        else {
            const isValid = ValidateEmail(e.target.value);
            if (!isValid)
                setEmailError('Valid Email required!');
            else
                setEmailError('');
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value === '')
            setPasswordError('Password is required!');
        else {
            if (!ValidatePassword(e.target.value))
                setPasswordError('Password must be alpha numerical!');
            else if (e.target.value.length < 10 || e.target.value.length > 30)
                setPasswordError('Password must be 10 to 30 characters long!');
            else
                setPasswordError('');
        }
    }
    return (
        <>
            <NotificationContainer></NotificationContainer>
            <div className='top'>
                <h2 className='page-heading'>Settings</h2>
                <div className='save-button-wrapper'>
                    <Button name='submit' className='save-button' onClick={handleOnClick}>Save Changes</Button>
                </div>
            </div>
            <div className='container'>
                <div className='profile-sidebar'>
                    <div className='profile-header'>
                        <Avatar className='avatar' src={`https://avatars.dicebear.com/api/human/${userName}.svg`}></Avatar>
                        <p className='userName'>@{userName}</p>
                        {email !== '' ? <p className='email'>{email}</p> : null}
                        {title !== '' ? <p className='title'>{title}</p> : null}
                        {bio !== '' ? <p className='bio'>{bio}</p> : null}
                    </div>
                </div>
                <div className='profile-form'>
                    <form className='form'>
                        <FormControl fullWidth>
                            <TextField label='Full Name' type='text' value={fullName} onChange={handleNameChange} error={nameError !== ''} required placeholder='Full name' className={classes.input} variant='outlined'></TextField>
                            <FormHelperText id="my-helper-text-user" error={nameError !== ""} style={{ marginLeft: '20px' }}>{nameError}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField label='Email' type='text' placeholder='Email' required value={email} error={emailError !== ''} className={classes.input} variant='outlined' onChange={handleEmailChange}></TextField>
                            <FormHelperText id="my-helper-text-user" error={emailError !== ""} style={{ marginLeft: '20px' }}>{emailError}</FormHelperText>
                        </FormControl>
                        <TextField label='Title' type='text' placeholder='eg. Developer' value={title} onChange={e => { setTitle(e.target.value) }} className={classes.input} variant='outlined'></TextField>
                        <TextField label='Bio'
                            value={bio}
                            onChange={e => { setBio(e.target.value) }}
                            multiline
                            rows={5}
                            placeholder='eg. Working as a Frontend Developer'
                            className={classes.input}
                            variant='outlined'
                        ></TextField>
                        <FormControl fullWidth>

                            <InputLabel htmlFor="password" style={{ marginTop: 4, marginLeft: 5, position: 'relative', top: 42, left: 20 }} variant="outlined" error={passwordError !== ""}>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                className={classes.input}
                                type={showPassword ? "text" : "password"}
                                color='primary'
                                name="password"
                                label="Password"
                                error={passwordError !== ""}
                                aria-describedby="my-helper-text-pwd"
                                value={password}
                                onChange={handlePasswordChange}
                                endAdornment={
                                    <InputAdornment>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {/* <VisibilityOff></VisibilityOff> */}
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="my-helper-text-user" error={passwordError !== ""} style={{ marginLeft: '20px' }}>{passwordError}</FormHelperText>
                        </FormControl>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Settings
