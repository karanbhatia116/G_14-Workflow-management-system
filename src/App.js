import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import CustomNavbar from "./components/layouts/CustomNavbar";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Authentication from "./components/pages/Authentication";
import NotFound from "./components/pages/NotFound";
import { useState } from "react";

function ToggleNavbar(props) {
	if (window.location.pathname === "/NotFound") {
		return null;
	}
	return (
		<>
			<CustomNavbar handlelogin={props.handlelogin} navlinks={props.navlinks} />
		</>
	);
}

const HiddenElement = withRouter(ToggleNavbar);

function App() {
	const [status, setStatus] = useState(false);

	const navlinks = [
		{ id: 1, path: "/Home", name: "Home", target: < Home handlelogin={setStatus} /> },
		{ id: 2, path: "/Projects", name: "Projects", target: <Projects /> }
	];

	// const project_manager = [
	// 	{ id: 1, path: "/Home", name: "Home", target: < Home handlelogin={setStatus} /> },
	// 	{ id: 2, path: "/Discussion", name: "Discussion", target: <Projects />  }
	// ];

	// const engineer = [
	// 	{ id: 1, path: "/Home", name: "Home", target: < Home handlelogin={setStatus} /> },
	// 	{ id: 2, path: "/Discussion", name: "Discussion", target: <Projects /> }
	// ];

	return (
		<BrowserRouter>
			{ status && <HiddenElement handlelogin={setStatus} navlinks={navlinks} />}
			<Switch>
				<Redirect exact from="/" to={navlinks[0].path} />

				{
					navlinks.map((navlink) => 
						<Route exact path={navlink.path} key={navlink.id}>
							{!status && <Authentication handlelogin={setStatus} />}
							{status && navlink.target}
						</Route>
					)
				}

				<Route>
					<Redirect to='/NotFound' />
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
