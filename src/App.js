import { Component } from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import CustomNavbar from "./components/layouts/CustomNavbar";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Authentication from "./components/pages/Authentication";

class App extends Component{
	render() {
		return (
			<div>
				<Authentication></Authentication>
				<BrowserRouter>
					<CustomNavbar path={window.location.pathname}></CustomNavbar>
					<Switch>
						<Route path="/Home">
							<Home></Home>
						</Route>
						<Route path="/Projects">
							<Projects></Projects>
						</Route>
						<Route path="/">
							<Home></Home>
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
