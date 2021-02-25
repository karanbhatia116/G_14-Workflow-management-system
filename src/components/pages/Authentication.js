import React, { useState } from "react";
import "../../styles/bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import NavLink from "react-bootstrap/NavLink";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

function Authentication() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const [signUp, setSignUp] = useState(<LogIn></LogIn>);

    const [ModalTitle, setModalTitle] = useState("Log-In");

    const SignalSignUp = () => {
        setSignUp(<SignUp></SignUp>);
        setModalTitle("SignUp");
    }

    const SignalForgotPassword = () => {
        setSignUp(<ForgotPassword></ForgotPassword>);
        setModalTitle("Forgot Password");
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {ModalTitle}
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                {signUp}
            </Modal.Body>

            <Modal.Footer>
                <NavLink onClick={SignalForgotPassword}>
                    Forgot Password?
                </NavLink>
                <NavLink onClick={SignalSignUp}>
                    Don't have account?
                </NavLink>
            </Modal.Footer>
        </Modal>
    );
}
export default Authentication;