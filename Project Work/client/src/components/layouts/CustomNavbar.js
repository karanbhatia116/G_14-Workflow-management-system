import { useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../storage/store";
import { USER_LOGOUT } from "../storage/actiontype";
import logo2 from '../../logo/logo2.svg';
import { Fragment } from "react";
import { SwipeableDrawer, List, ListItem, Divider } from "@material-ui/core";

function CustomNavbar(props) {

    //checks whether the navbar is open or close
    const [open, setOpen] = useState(false);

    //which link is active at the moment
    const [active, setActive] = useState(0);

    //change the active link according to user click
    function activatelink(i) {
        //set the id of active link
        setActive(i);
        //close the sidebar
        setOpen(false);
    };

    //logout the user from the system and remove from global storage using the dispatch
    function handleLogout() {
        userStore.dispatch({
            type: USER_LOGOUT
        });
        window.localStorage.removeItem("user");
    };

    return (
        <Fragment key="left">
            <nav className="navbar sticky-top navbar-dark bg-primary" style={{zIndex:100}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to={props.navlinks[0].path} onClick={() => activatelink(1)}>
                        <img src={logo2} width="auto" height="47em"/>
                    </Link>
                    <div className="d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className={"ham-menu" + (open ? " ham-active" : "")} viewBox="0 0 100 100" onClick={() => setOpen(true)}>
                            <path className="line top" d="m 30 30 h 40 c 0 0 15 10 0 20 h -20 v -20" />
                            <path className="line mid" d="m 30 50 h 40" />
                            <path className="line bottom" d="m 70 70 h -40 c 0 0 -15 -10 0 -20 h 20 v 20" />
                        </svg>
                    </div>
                </div>
            </nav>
            <SwipeableDrawer className="nav nav-pills" anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
                <List>
                    {
                        props.navlinks.map((navlink) => (
                            <ListItem className="nav-item" key={navlink.id}>
                                <Link className={"nav-link " + ((navlink.id === active || navlink.path === window.location.pathname) ? " active" : "")} to={navlink.path} onClick={() => activatelink(navlink.id)}>
                                    {navlink.name}
                                </Link>
                            </ListItem>
                        ))  
                    }
                    <Divider />
                    <ListItem className="nav-item">
                        <Link className="nav-link" to={window.location.pathname} onClick={handleLogout}>
                            Log Out
                        </Link>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </Fragment>
    );
}

export default CustomNavbar;