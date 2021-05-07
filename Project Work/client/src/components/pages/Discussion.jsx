import React from 'react';
import Chat from './Chat';
function Discussion({setRead, setNewNotification}) {
    return (
        <div>
           <Chat setRead = {setRead} setNewNotification = {setNewNotification}></Chat>
        </div>
    )
}

export default Discussion
