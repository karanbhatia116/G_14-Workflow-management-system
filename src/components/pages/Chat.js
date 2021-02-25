import React, { useState ,useEffect,useRef} from 'react'
import '../../styles/Chat.css'
import {Avatar,IconButton} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';
import FileButton from '@material-ui/icons/AttachFile';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import io from "socket.io-client";
import axios from "axios";

 
function Chat(props) {
    // const cookies = new Cookies();
    // const userCookie=cookies.get('userCookie');
    const userName="abc";
    // const socketRef = useRef();
    const [input,setInput] = useState('');
    const [messages,setMessages]=useState([
        {userName:"abc", photoUri:"123", msg:"This is a message", time:"12:00 PM", room:"709713094jh"},
        {userName:"xyz", photoUri:"123", msg:"Hello", time:"12:02 PM", room:"709713094jh"}
    ]);
    // console.log("Test");

    // const url = (process.env.NODE_ENV==="production" ? "https://thawing-dawn-49846.herokuapp.com/" : "http://localhost:3000/");
    // console.log(process.env.NODE_ENV,url);

    const userDetail={
        room:"1234",
        name:"abc",
        GID:"707108740",
        imgURI:"123"
    }

    // window.onbeforeunload =()=>{
    //     if(socketRef.current){
    //         socketRef.current.close();
    //     } 
    // }

    // useEffect(() => {
       
    //     axios.get('#').then((res)=>{
    //         console.log(res.data);
    //         setMessages([]);
    //     })


    //     socketRef.current=io.connect(url);
    //     socketRef.current.emit("join chat room",userDetail);

    //     console.log("Inside UseEffect : ",messages);

    //     socketRef.current.on('recevied msg',(data)=>{
    //         console.log("yes received..");
    //         setMessages((msgs)=>[...msgs,data]);
    //         console.log(messages);
    //     });

    // },[]);

    

    const sendMessage = (e)=>{
        e.preventDefault();
    }
    //     const obj={
    //         userName,
    //         photoUri:"123",
    //         msg:input,
    //         time:new Date,
    //         room:props.roomID
    //     }
    //     socketRef.current.emit('send msg',obj);
    // //     axios.post(`${url}chat`,obj,{headers: {
    // //     'Content-Type': 'application/json'
    // //   }}).then((res)=>{
    // //         console.log(res);
    // //     })
    //     setInput('');
    // }


    return (
        <div className = 'chat'>
            <div className="chat__header">
            <Avatar  src = ""/>
            <p>Team Discussion</p>
            </div>

            <div className="chat__body">
                {messages.map((message,i)=>{
                    return(
                        <p key={i} className={`chat__message ${userName === message.userName && 'chat__receiver'} 
                        ${userName === message.userName && 'bubble__bottom__right'}
                        ${userName!== message.userName && 'bubble__top__left'}`
                        }>
                            <span className='chat__name'>{message.userName}</span>
                            {message.msg}
                            <span className='chat__timestamp'>{message.time}</span>
                        </p>
                    )
                })}
                
            </div>
            <div className='chat__footer'>
                <IconButton>
                    <EmojiEmotionsOutlinedIcon></EmojiEmotionsOutlinedIcon>
                </IconButton>
                <form>
                    <input value = {input} onChange = { (e)=> setInput(e.target.value)} placeholder='Type a message' type='text'> 
                    </input>
                    <button type = 'submit' onClick = {sendMessage}>Send message</button>
                </form>
                <IconButton>
                 <FileButton></FileButton>
                </IconButton>
            </div>
            
        </div>
    )
}

export default Chat
