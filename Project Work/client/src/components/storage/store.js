import { createStore } from 'redux';
import reducer from './reducer';
import * as links from "./Navlinks";

//creating the store using the given reducer function
let initialuserStore = {
    loggedInUser: {
        usertype: null,
        username: null,
        password: null,
        full_name: null,
        email: null,
        title: null,
        bio: null
    },
    navlinks : [
        ...links.engineer
    ],
    newNotification: {
        msg: "",
        sender: ""
    },
};

//retrieve the user from the local storage
const user = JSON.parse(window.localStorage.getItem("user"));

//if its available then set it
if (user) {
    initialuserStore = {
        ...initialuserStore,
        loggedInUser: 
        {
            ...initialuserStore.loggedInUser,
            usertype: user.usertype,
            username: user.username,
            password: user.password,
            full_name: user.full_name,
            email: user.email,
            title: user.title,
            bio: user.bio
        }
    };
    //Assign the links based on the type of user
    if (initialuserStore.loggedInUser.usertype === 0) {
        initialuserStore = {
            ...initialuserStore,
            navlinks : [
                ...links.admin
            ]
        }
    } else if (initialuserStore.loggedInUser.usertype === 1) {
        initialuserStore = {
            ...initialuserStore,
            navlinks : [
                ...links.manager
            ]
        }
    } else {
        initialuserStore = {
            ...initialuserStore,
            navlinks : [
                ...links.engineer
            ]
        }
    }
}

//create the global storage
export const userStore = createStore(
    reducer,
    initialuserStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);