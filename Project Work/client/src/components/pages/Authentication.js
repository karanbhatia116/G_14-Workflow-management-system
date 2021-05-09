import { useState } from "react";
import { Modal, NavLink } from "react-bootstrap";
import LogIn from "../layouts/LogIn";
import ForgotPassword from "../layouts/ForgotPassword";
import logo from '../../logo/logo.svg';
function Authentication() {

    //modal page state is declared which renders the appropriate page for user. 

    // SignalForgotPassword function renders the ForgotPassword Page.
    const SignalForgotPassword = () => setModalPage(
        <>
            <Modal.Header style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="logo" width="100px" height="100px" />
                <Modal.Title className='forgot__text'>
                    Forgot Password
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="authentication-body">
                <ForgotPassword />
            </Modal.Body>

            <Modal.Footer>
                { /* To go to the LogIn Page */}
                <NavLink onClick={SignalLogIn}>
                    Go back to Log-In page
                </NavLink>
            </Modal.Footer>
        </>
    );

    // SignalLogIn function renders the LogIn Page.
    const SignalLogIn = () => setModalPage(
        <>
            <Modal.Header style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="logo" width="100px" height="100px" />
                <Modal.Title className={'login__text'}>
                    Log-In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="authentication-body">
                <LogIn />
            </Modal.Body>

            <Modal.Footer>
                { /* To go to the ForgotPassword Page */}
                <NavLink onClick={SignalForgotPassword}>
                    Forgot Password ?
                </NavLink>
            </Modal.Footer>
        </>
    );

    // By defalut it renders the LogIn Page.
    const [modalPage, setModalPage] = useState(
        <>
            <Modal.Header style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="logo" width="100px" height="100px" />
                <Modal.Title className={'login__text'}>
                    Log-In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="authentication-body">
                <LogIn />
            </Modal.Body>

            <Modal.Footer>
                { /* To go to the ForgotPassword Page */}
                <NavLink onClick={SignalForgotPassword}>
                    Forgot Password ?
                </NavLink>
            </Modal.Footer>
        </>
    );

    return (
        <div className="authentication" >
            {/* modalPage state for the redner. */}
            {modalPage}
        </div>
    );
}
export default Authentication;