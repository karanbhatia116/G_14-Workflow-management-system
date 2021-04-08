import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Chat.css';
import {Avatar,IconButton, StylesProvider} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';
import FileButton from '@material-ui/icons/AttachFile';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import io from "socket.io-client";
import socket from '../utils/socket'
import axios from "axios";
import Picker from 'emoji-picker-react';
import {userStore} from '../storage/store';
function Chat(props) {
    const userName=userStore.getState().loggedInUser.username;
    const [input,setInput] = useState('');
    const [messages,setMessages]=useState([]);
    const [pickerVisible, setPickerVisible] = useState(false);
    const s = socket;
    const url = "/discussion";
    const picker = useRef();
    const emojiButton = useRef();
    let width = window.innerWidth;
    window.onbeforeunload =()=>{
        if(s.connected){
            s.disconnect();
        } 
    }

    useEffect(async () => {
        
        axios.get(url).then((res)=>{
            setMessages([]);
            if(res.data !== "")
            {
                res.data.map((obj, i)=>{
                    setMessages(msgs=>[...msgs, obj]);
                });
            }
            
        });
        s.on("receive-chat-msg", (data)=>{
            if(data!=="")
                setMessages((msgs)=>[...msgs, data]);
        });
        s.emit("joined-chat-room", {msg:"hello this is a message"});
    },[]);
    
    useEffect(() => {
        function handler(event) {
            if(!picker.current?.contains(event.target) && !emojiButton.current?.contains(event.target)) {
               setPickerVisible(false);
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, [])

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
            username: userStore.getState().loggedInUser.username, //logged in username
            photoUri: "123",
            msg: input,
            time: new Date().toUTCString(),
            room:"general",
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
                            {userName === message.username ? (
                                <span className={'chat__name left'}></span>
                            ): <span className={'chat__name right'}><i className={'fa fa-circle other'}></i>{message.username}</span>}
                           
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
                <IconButton onClick = {emojiClickHandler} innerRef={emojiButton}>
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
            {pickerVisible && width===768?(
                    <div ref={picker}>
                    <Picker pickerStyle = {{width: '30%', position: 'absolute', bottom: '7%', left: '2rem'}} preload = {true} onEmojiClick = {onEmojiClick} innerRef={picker}></Picker>
                    </div>
            ):null}
            {pickerVisible && width>750 && width!==768?(
                    <div ref={picker}>
                    <Picker pickerStyle = {{width: '30%', position: 'absolute', bottom: '13%', left: '2rem'}} preload = {true} onEmojiClick = {onEmojiClick} innerRef={picker}></Picker>
                    </div>
            ):null}
            {pickerVisible && width<750 && width>500?(
                <div ref={picker}>
                    <Picker pickerStyle = {{width: '50%', position: 'absolute', bottom: '4%', left: '2rem'}} preload = {true} onEmojiClick = {onEmojiClick} innerRef={picker}></Picker>
                </div>
            ):null}
            {pickerVisible && width<500 && width>400?(
                <div ref={picker}>
                    <Picker pickerStyle = {{width: '63%', position: 'absolute', bottom: '7%', left: '1rem'}} preload = {true} onEmojiClick = {onEmojiClick} innerRef={picker}></Picker>
                </div>
            ):null}
            {pickerVisible && width<400?(
                <div ref={picker}>
                    <Picker pickerStyle = {{width: '64%', position: 'absolute', bottom: '3%', left: '1rem', height: '35%'}} preload = {true} onEmojiClick = {onEmojiClick} ref={picker}></Picker>
                </div>
            ):null}
        </div>
        </>
    )
}

export default Chat
