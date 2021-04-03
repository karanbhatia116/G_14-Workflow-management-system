import { useState } from "react";
import { Grid, Button, FormControl, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton, Card } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';

function ForgotPassword() {

    const [user, setUsername] = useState("");
    const [userWarning, setUserWarning] = useState("");

    const [newpwd, setNewPwd] = useState("");
    const [newPwdWarning, setNewPwdWarning] = useState("");

    const [confirmpwd, setConfirmPwd] = useState("");
    const [confirmPwdWarning, setConfirmPwdWarning] = useState("");

    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    function handleChange(e) {
        const value = e.target.value;
        const pattern = /^[0-9a-zA-Z]*$/;
        setUserWarning("");
        setNewPwdWarning("");
        setConfirmPwdWarning("");

        if (e.target.name === "username") {
            setUserWarning("");
            if (value === "") {
                setUsername("");
                setUserWarning("username is required.");
                return false;
            }
            if (!pattern.test(value)) {
                setUserWarning("username must be alphanumerical.");
                return false;
            }
            setUsername(e.target.value);
        }

        if (e.target.name === "new-password") {
            setNewPwdWarning("");
            if (value === "") {
                setNewPwd("");
                setNewPwdWarning("new password is required.");
                return false;
            }
            if (!pattern.test(value)) {
                setNewPwdWarning("new password must be alphanumerical.");
                return false;
            }
            setNewPwd(e.target.value);
        }

        if (e.target.name === "confirm-password") {
            setConfirmPwdWarning("");
            if (value === "") {
                setConfirmPwd("");
                setConfirmPwdWarning("confirm password is required.");
                return false;
            }
            if (!pattern.test(value)) {
                setConfirmPwdWarning("confirm password must be alphanumerical.");
                return false;
            }
            setConfirmPwd(e.target.value);
        }

        return true;
    }

    function changePwd(e) {
        e.preventDefault();
        if (user === "" || newpwd === "" || confirmpwd === "") {
            if (user === "") {
                setUserWarning("username is required.");
            }
            if (newpwd === "") {
                setNewPwdWarning("new password is required.");
            }
            if (confirmpwd === "") {
                setConfirmPwdWarning("confirm password is required.");
            }
            return;
        }

        if ((user.length < 8 || user.length > 30) && (newpwd.length < 10 || newpwd.length > 30) && (confirmpwd.length < 10 || confirmpwd.length > 30)) {
            setUserWarning("Username must have at least 8 to 30 letters.");
            setNewPwdWarning("Password must have at least 10 to 30 letters.");
            setConfirmPwdWarning("Password must have at least 10 to 30 letters.");
            return false;
        }

        if (user.length < 8 || user.length > 30) {
            setUserWarning("Username must have at least 8 to 30 letters.");
            return false;
        }

        if (newpwd.length < 10 || newpwd.length > 30) {
            setNewPwdWarning("Password must have at least 10 to 30 letters.");
            return false;
        }

        if (confirmpwd.length < 10 || confirmpwd.length > 30) {
            setConfirmPwdWarning("Password must have at least 10 to 30 letters.");
            return false;
        }

        if (newpwd !== confirmpwd) {
            setNewPwd("");
            setConfirmPwd("");
            setNewPwdWarning("new and confirm password must be same.");
            setConfirmPwdWarning("new and confirm password must be same.");
            return;
        }
        //code for changing password
        fetch('http://localhost:4000/changepwd', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, newpwd })
        })
            .then(response => {
                return response.status;
            })
            .then(status => {
                if (status === 500) {
                    setNewPwd("");
                    setConfirmPwd("");
                    setUsername("");
                    setUserWarning("Username is Invalid.");
                } else if (status === 200) {
                    setUsername("");
                    setNewPwd("");
                    setConfirmPwd("");
                    console.log("Password SucessFul");
                }
            });
    }

    return (
        <form noValidate autoComplete="off" name="authentication-form">
            <Card variant="outlined">
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
                        <InputLabel htmlFor="password" variant="outlined" error={newPwdWarning !== ""}>New Password</InputLabel>
                        <OutlinedInput
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            name="new-password"
                            label="New Password"
                            error={newPwdWarning !== ""}
                            aria-describedby="my-helper-text-new-pwd"
                            value={newpwd}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setshowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="my-helper-text-pwd" error={newPwdWarning !== ""}>{newPwdWarning}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="password" variant="outlined" error={confirmPwdWarning !== ""}>Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm-password"
                            label="Confirm Password"
                            error={confirmPwdWarning !== ""}
                            aria-describedby="my-helper-text-confirm-pwd"
                            value={confirmpwd}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="my-helper-text-pwd" error={confirmPwdWarning !== ""}>{confirmPwdWarning}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                    <Button variant="contained" style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }} onClick={changePwd}>
                        Submit
                    </Button>
                </Grid>
            </Card>
        </form>
    );
}

export default ForgotPassword;