import React from 'react'
import {NotificationManager} from  'react-notifications';
import 'react-notifications/lib/notifications.css';
function Notification({message}) {
    NotificationManager.success(message.msg, 'Hello');
    return (

        <h1>H1</h1>
       
    );
}

export default Notification
