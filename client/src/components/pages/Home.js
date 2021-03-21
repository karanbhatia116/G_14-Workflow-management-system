import React from "react";
import "../../styles/bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { Jumbotron } from "react-bootstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = (props)=> {
        // const user = "abc";   //needs to change once authentication is done
        const customId = "custom-id-yes";
        if(props.notification && !props.read)
        toast.info(props.notification.sender+ " sent a new message  ✉️", {
            toastId: customId,
            autoClose: 1200,
            progress: undefined,
            position: 'bottom-right',
            hideProgressBar: true,
        });
        return (
            <>
            {props.notification?(
                <ToastContainer></ToastContainer>
            ):null}
            <Jumbotron>
                <h1>
                    Home-Page
                </h1>
            </Jumbotron>
            
            </>
        );
}
export default Home;