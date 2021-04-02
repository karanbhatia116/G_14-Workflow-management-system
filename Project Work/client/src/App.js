import { Component, useEffect, useState} from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import CustomNavbar from "./components/layouts/CustomNavbar";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Authentication from "./components/pages/Authentication";
import Discussion from "./components/pages/Discussion";
// import io from 'socket.io-client';
import socket from "../src/components/utils/socket";
const App = () =>{
	    
		//getting the socket defined in socket.js
		const s = socket;
		const [newNotification, setNewNotification] = useState({msg: "", sender: ""});
		const [read, setRead] = useState(false);
		//runs for the first time when rendered
		useEffect(() =>{
		console.log("new notification: " + newNotification.msg);
			s.on("receive-notification", async (data)=>{
			await setNewNotification(data);
			});
			s.open();
		},[]);
		return (
			<div>
				<Authentication></Authentication>
				<BrowserRouter>
					<CustomNavbar path={window.location.pathname}></CustomNavbar>
						<Route exact path="/Home">
							<Home notification = {newNotification.msg === "" ? null: newNotification} read = {read}></Home>
						</Route>

						<Route exact path="/Projects">
							<Projects></Projects>
						</Route>
						
						<Route exact path = "/Discussion">
							<Discussion setRead = {setRead} setNewNotification = {setNewNotification}></Discussion>
						</Route>
						<Route exact path="/">
							<Home notification = {newNotification.msg}></Home>
						</Route>
				</BrowserRouter>
			</div>
		);
	}

export default App;
