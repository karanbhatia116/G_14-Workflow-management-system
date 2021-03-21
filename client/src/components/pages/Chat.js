import React, { useState ,useEffect,useRef} from 'react'
import '../../styles/Chat.css'
import {Avatar,IconButton, StylesProvider} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';
import FileButton from '@material-ui/icons/AttachFile';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import io from "socket.io-client";
import socket from '../utils/socket'
import axios from "axios";
import Picker from 'emoji-picker-react';

function Chat(props) {
    // const cookies = new Cookies();
    // const userCookie=cookies.get('userCookie');
    const userName="abc";
    // const socketRef = useRef();
    const [input,setInput] = useState('');
    const [messages,setMessages]=useState([]);
    const [pickerVisible, setPickerVisible] = useState(false);
    const s = socket;
    // const url = (process.env.NODE_ENV==="production" ? "https://thawing-dawn-49846.herokuapp.com/" : "http://localhost:3000/");
    // console.log(process.env.NODE_ENV,url);
    const url = "http://localhost:4000/discussion";
    const userDetail={
        username:"abc",
        photoUri: "123",
        msg:"new message",
        time: new Date().toLocaleTimeString(),
        room:"7071374013",
    }

    window.onbeforeunload =()=>{
        if(s.connected){
            s.disconnect();
        } 
    }

    useEffect(() => {
        axios.get(url).then((res)=>{
            setMessages([]);
            if(res.data !== "")
            {
                res.data.map((obj, i)=>{
                    console.log(obj);
                    setMessages(msgs=>[...msgs, obj]);
                });
            }
            
        })
        s.on("new-connection", ()=>{
            console.log("New connection");
        });
        s.on("receive-chat-msg", (data)=>{
            if(data!=="")
                setMessages((msgs)=>[...msgs, data]);
        });
        s.emit("joined-chat-room", {msg:"hello this is a message"});
    },[]);

    
    const emojiClickHandler = (e)=>{
        setPickerVisible(!pickerVisible);
    }

    const onEmojiClick = (event, emojiObject) => {
        event.preventDefault();
        setPickerVisible(false);
        setInput(`${input}${emojiObject.emoji}`);
      };

    const sendMessage = (e)=>{
        e.preventDefault();
        if (input === "")
        return;
        const obj = {
            username: "abc", //logged in username
            photoUri: "123",
            msg: input,
            time: new Date().toUTCString(),
            room:"8171094ojapsf",
        }
        s.emit('send-chat',obj);
        s.emit("send-notification", {msg: input, sender: userName});
        axios({
            method: 'POST', 
            url: url,
            data:obj,
            headers: {
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            console.log(res.data);
        });

       setInput("");
    }
    return (
        <>
        <div className = 'chat'>
            <div className="chat__header">
            <Avatar  src = ""/>
            <p>Team Discussion</p>
            </div>

            <div className="chat__body">
                {messages.map((message,i)=>{
                    return(
                        <p key={i} className={`chat__message ${userName === message.username && 'chat__receiver'} 
                        ${userName === message.username && 'bubble__bottom__right'}
                        ${userName!== message.username && 'bubble__top__left'}`
                        }>
                            <span className='chat__name'>{message.username}</span>
                            {message.msg}
                            <span className='chat__timestamp'>{new Date(message.time).toLocaleString('en-US', 
                            {
                            timeZone: 'Asia/Kolkata',
                            hour:'2-digit', 
                            minute:'2-digit', 
                            day:'numeric', 
                            month:'short'}
                            )}</span>
                        </p>
                    )
                })}
                
            </div>
            <div className='chat__footer'>
                <IconButton onClick = {emojiClickHandler}>
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
        {pickerVisible?(
             <Picker pickerStyle = {{width: '30%', position: 'absolute', bottom: '6em', left: '2rem'}} preload = {true} onEmojiClick = {onEmojiClick}></Picker>
        ): null}
        </>
    )
}

export default Chat
