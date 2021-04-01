import { useState } from "react";
import { Grid, Button, FormControl, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton, Card } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { userStore } from "../storage/store";
import { USER_LOGGEDIN } from "../storage/actiontype";

function LogIn() {
    //user value from the form
    const [user, setUsername] = useState("");
    //warning when the user tries to input worng user patterns
    const [userWarning, setUserWarning] = useState("");

    //pwd value from the form
    const [pwd, setPwd] = useState("");
    //warning when the user tries to input wrong password patterns
    const [pwdWarning, setPwdWarning] = useState("");

    //checks the user input on every change in form fields
    function handleChange(e) {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");

        //get the value attribute of the target that created event e
        const value = e.target.value;
        const pattern = /^[0-9a-zA-Z]*$/;

        //check for the username
        if (e.target.name === "username") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setUsername("");
                setUserWarning("Username is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }
            //set the username
            setUsername(e.target.value);
        }
        if (e.target.name === "password") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setPwd("");
                setPwdWarning("Password is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            //set the password
            setPwd(e.target.value);
        }
        return true;
    }

    function loginuser() {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");

        //check if the user and pwd is empty or not
        if (user === "" || pwd === "") {
            if (user === "") {
                setUserWarning("username is required.");
            }
            if (pwd === "") {
                setPwdWarning("password is required.");
            }
            return;
        }

        //size constraint for the user and pwd
        if ((user.length < 8 || user.length > 30) && (pwd.length < 10 || pwd.length > 30)) {
            setUserWarning("Username must be 8 to 30 letters long.");
            setPwdWarning("Password must be 10 to 30 letters long.");
            return false;
        }

        if (user.length < 8 || user.length > 30) {
            setUserWarning("Username must be 8 to 30 letters long.");
            return false;
        }

        if (pwd.length < 10 || pwd.length > 30) {
            setPwdWarning("Password must be least 10 to 30 letters long.");
            return false;
        }

        const pattern = /^[0-9a-zA-Z]*$/;

        //check whether values matches the pattern or not
        if (!pattern.test(user) || !pattern.test(pwd)) {
            if (!pattern.test(user) && !pattern.test(pwd)) {
                setUserWarning("Username must be alphanumerical.");
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            if (!pattern.test(user)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }

            if (!pattern.test(pwd)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
        }

        //fetch data from the users database using fetch API
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, pwd })
        })
            .then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(data => {
                //on successful response update the Global Storage using dispatch
                if (data === undefined) {
                    //if the the credentials are wrong then clear the fields and throw warning
                    setPwd("");
                    setUsername("");
                    setUserWarning("Username is Invalid.");
                    setPwdWarning("Password is Invalid.");
                } else {
                    //dispatch the action to logIn user to global state of the app
                    userStore.dispatch({
                        type: USER_LOGGEDIN,
                        payload: {
                            usertype: data.usertype,
                            username: data.username,
                            password: data.password
                        }
                    });
                    //set the cookie or set the local storage to keep user loggedIn during refresh
                    window.localStorage.setItem("user", JSON.stringify(userStore.getState().loggedInUser));
                }
            });
    }

    const [showPassword, setshowPassword] = useState(false);

    return (
        <Card color="primary" variant="outlined">
            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="username" variant="outlined" error={userWarning !== ""}>Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        type="text"
                        name="username"
                        label="Username"
                        error={userWarning !== ""}
                        aria-describedby="my-helper-text-user"
                        value={user}
                        onChange={handleChange}
                    />
                    <FormHelperText id="my-helper-text-user" error={userWarning !== ""}>{userWarning}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="password" variant="outlined" error={pwdWarning !== ""}>Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        error={pwdWarning !== ""}
                        aria-describedby="my-helper-text-pwd"
                        value={pwd}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setshowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="my-helper-text-pwd" error={pwdWarning !== ""}>{pwdWarning}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <Button variant="contained" style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }} onClick={loginuser}>
                    Log-In
                    </Button>
            </Grid>
        </Card>
    );
}

export default LogIn;