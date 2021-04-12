import { useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../storage/store";
import { USER_LOGOUT } from "../storage/actiontype";
import logo2 from '../../logo/logo2.svg';
function CustomNavbar(props) {

    //checks whether the navbar is open or close for smaller screen(screen size < 978px)
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

    //logout the user from the system and remove from global storage using the dispatch
    function handleLogout() {
        userStore.dispatch({
            type: USER_LOGOUT
        });
        window.localStorage.removeItem("user");
    };

    return (
        <div className='nav-container' style={{display:'flex'}}>
            {/* header section of the navbar */}
            <div className="header-section" style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <header>
                <img src={logo2} width='100px' height='100px' alt='logo2'></img>
                </header>
            </div>

            <nav className="nav" style={{justifyContent:'center'}}>
                {/* collapse button to close and open navbar at small screens */}
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={"ham-menu" + (collapse ? " ham-active" : "")} viewBox="0 0 100 100" onClick={() => setCollapse(collapse ? false : true)}>
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
                    {/* logout button for the user */}
                <Link className={'nav-link'} to="/" onClick={handleLogout}>
                Log Out
                </Link>
                
                </div>
            </nav>
        </div>
    );
}

export default CustomNavbar;