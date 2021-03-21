import React from "react";
import "../../styles/bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
class CustomNavbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            links: [
                { path: "/Home", name: "Home", isActive: false },
                { path: "/Projects", name: "Projects", isActive: false },
                { path: "/Discussion", name: "Team Discussion", isActive: false }
            ]
        }
    }
    
    componentDidMount() {
        let newlinks = this.state.links.slice();
        if (this.props.path === "/") {
            for (let j in newlinks) {
                newlinks[j].isActive = false;
            }
            newlinks[0].isActive = true;
        } else {
            for (let j in newlinks) {
                newlinks[j].isActive = (newlinks[j].path === this.props.path);
            }
        }
    
        this.setState({ links: newlinks });
    }

    activatelink(i) {
        let newlinks = this.state.links.slice();
        for (let j in newlinks) {
            newlinks[j].isActive = (Number(i) === Number(j));
        }
        this.setState({ links: newlinks });
    }

    render() {
        return (
            < Navbar className = "navbar-dark bg-primary sticky-top" expand = "lg" >	
				<Navbar.Brand href="/Home">
                    WorkFlow
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end">
                        {this.state.links.map((link, i) =>
                            <Link className={"nav-link" + (link.isActive ? " active" : "")} key={i} to={link.path} onClick={() => this.activatelink(i)}>
                                {link.name}
						    </Link>
                        )}
					</Nav>
				</Navbar.Collapse>
			</Navbar >
        );
    }
}

export default CustomNavbar;