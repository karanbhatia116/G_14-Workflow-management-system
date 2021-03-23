import { useState } from "react";
import { Link } from "react-router-dom";

function CustomNavbar(props) {

    //checks whether the navbar is open or close for smaller screen
    const [collapse, setCollapse] = useState(false);

    //which link is active at the moment
    const [active, setActive] = useState(0);

    //change the active link according to user click
    function activatelink(i) {
        //set the id of active link
        setActive(i);
        //for small screen the navbar collapse is handled here
        if (window.innerWidth < 992) {
            setCollapse(collapse ? false : true);
        }
    };

    //logout the user from the system
    function handleLogout() {
        props.handlelogin(false);
        window.localStorage.removeItem("user");
    };

    return (
        <>
            {/* header section of the navbar */}
            <div className="header-section">
                <header>
                    WorkFlow
                </header>

                {/* logout button for the user */}
                <svg xmlns="http://www.w3.org/2000/svg" title="logout" width="1.7em" fill="currentColor" viewBox="0 0 16 16" onClick={handleLogout}>
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
            </div>

            <nav className="nav">
                {/* collapse button to close and open navbar at small screens */}
                <div>
                    <svg className={"ham-menu" + (collapse ? " ham-active" : "")} viewBox="0 0 100 100" onClick={() => setCollapse(collapse ? false : true)}>
                        <path className="line top" d="m 30 30 h 40 c 0 0 15 10 0 20 h -20 v -20" />
                        <path className="line mid" d="m 30 50 h 40" />
                        <path className="line bottom" d="m 70 70 h -40 c 0 0 -15 -10 0 -20 h 20 v 20" />
                    </svg>
                </div>

                {/* actual navbar */}
                <div className={"navbar-" + (collapse ? "open" : "close")}>
                    {
                        props.navlinks.map((navlink) =>
                            <Link className={"nav-link" + ((navlink.id === active || navlink.path === window.location.pathname) ? " active" : "")} key={navlink.id} to={navlink.path} onClick={() => activatelink(navlink.id)}>
                                {navlink.name}
                            </Link>
                        )
                    }
                </div>
            </nav>
        </>
    );
}

export default CustomNavbar;