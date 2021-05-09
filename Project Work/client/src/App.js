import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import CustomNavbar from "./components/layouts/CustomNavbar";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "./components/utils/socket";
import { userStore } from "./components/storage/store";
import { HAS_READ, SENT_MSG } from "./components/storage/actiontype";

//This is to hide navabar on invalid paths
function ToggleNavbar(props) {
	//const notification = useSelector(state => state.newNotification.msg);

	// const customId = "custom-id-yes";
	// if (notification && window.location.pathname !== '/Discussion') {
	// 	console.log("");
	// 	toast.info(notification.sender + " sent a new message  ✉️", {
	// 		toastId: customId,
	// 		autoClose: 1200,
	// 		progress: undefined,
	// 		position: 'bottom-right',
	// 		hideProgressBar: true,
	// 	});
	// }

	if (window.location.pathname === "/NotFound") {
		return null;
	}

	return (
		<>
			{/* Navbar for users */}
			<CustomNavbar navlinks={props.navlinks} style = {{zIndex: 10}}/>
		</>
	);
}

const HiddenElement = withRouter(ToggleNavbar);

function App() {
	//Store whether User is LoggedIn or not 
	const [status, setStatus] = useState(false);
	//Get the data regarding LoggedIn user
	const loggedInUser = useSelector(state => state.loggedInUser);
	//Get the navlinks for the according user 
	const navlinks = useSelector(state => state.navlinks);
	//Message notification
	//const notification = useSelector(state => state.newNotification.msg);

	const s = socket;

	s.on("receive-notification", async (data) => {
		await userStore.dispatch({
			type: SENT_MSG,
			payload: {
				msg: data.msg,
				sender: data.sender
			}
		});
	});
	
	s.open();


	//For every update of loggedIn user we have to update the status of user
	useEffect(() => {
		setStatus(loggedInUser.username !== null && loggedInUser.password !== null && loggedInUser.usertype !== null);
	}, [loggedInUser]);
	
	
	return (
		<BrowserRouter>
			{/* If user is not logged In navbar will hide itself */}
			{ status && <HiddenElement navlinks={navlinks} />}
			<Switch>
				{/* If user is logged in / path will redirect to first link for that particular type of user */}
				{ status && <Redirect exact from="/" to={navlinks[0].path} />}

				{
					navlinks.map((navlink) => 
						<Route exact path={navlink.path} key={navlink.id}>
							{/* If user is not logged in every path will redirect to / */}
							{!status && <Redirect to='/' />}
							{/* LogIn page */}
							{!status && <Home />}
							{/* If User is logged In, User will go to appropriate links */}
							{status && navlink.target}
						</Route>
					)
				}

				<Route>
					{/* If user is not logged in every path will redirect to / */}
					{!status && <Redirect to='/' />}
					{/* LogIn page */}
					{!status && <Home />}

					{/* If someone tries to access pages outside of the links will redirect to Not Found Page */}
					{status && <Redirect to='/NotFound' />}
					{status && <NotFound />}
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
