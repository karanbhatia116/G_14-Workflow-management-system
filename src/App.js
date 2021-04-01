import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import CustomNavbar from "./components/layouts/CustomNavbar";
import Authentication from "./components/pages/Authentication";
import NotFound from "./components/pages/NotFound";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//This is to hide navabar on invalid paths
function ToggleNavbar(props) {
	if (window.location.pathname === "/NotFound") {
		return null;
	}
	return (
		<>
			{/* Navbar for users */}
			<CustomNavbar navlinks={props.navlinks} />
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
							{!status && <Authentication />}
							{/* If User is logged In, User will go to appropriate links */}
							{status && navlink.target}
						</Route>
					)
				}

				<Route>
					{/* If user is not logged in every path will redirect to / */}
					{!status && <Redirect to='/' />}
					{/* LogIn page */}
					{!status && <Authentication />}

					{/* If someone tries to access pages outside of the links will redirect to Not Found Page */}
					{status && <Redirect to='/NotFound' />}
					{status && <NotFound />}
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
