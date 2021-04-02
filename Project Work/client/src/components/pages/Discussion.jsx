import React from 'react'
import "../../styles/bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { Jumbotron } from "react-bootstrap";
import Chat from './Chat';
function Discussion({setRead, setNewNotification}) {
    return (
        <div>
           <Chat setRead = {setRead} setNewNotification = {setNewNotification}></Chat>
        </div>
    )
}

export default Discussion
