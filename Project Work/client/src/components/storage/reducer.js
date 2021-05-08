import * as action_type from './actiontype';
import * as links from "./Navlinks";

export default function reducer(state, action) {
    switch (action.type) {
        case action_type.USER_LOGGEDIN: {
            if (state.loggedInUser.username === null) {
                //set the user data
                let newstate = {
                    ...state,
                    loggedInUser: {
                        ...state.loggedInUser,
                        usertype: action.payload.usertype,
                        username: action.payload.username,
                        password: action.payload.password,
                        full_name: action.payload.full_name,
                        title: action.payload.title,
                        email:action.payload.email,
                        bio: action.payload.bio
                    }
                };
                //Assign the links based on the type of user
                if (newstate.loggedInUser.usertype === 0) {
                    newstate = {
                        ...newstate,
                        navlinks: [
                            ...links.admin
                        ]
                    }
                } else if (newstate.loggedInUser.usertype === 1) {
                    newstate = {
                        ...newstate,
                        navlinks: [
                            ...links.manager
                        ]
                    }
                } else {
                    newstate = {
                        ...newstate,
                        navlinks: [
                            ...links.engineer
                        ]
                    }
                }
                return newstate;
            }
            return state;
        }   
        case action_type.USER_LOGOUT: {
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    usertype: null,
                    username: null,
                    password: null,
                    full_name: null,
                    title: null,
                    email: null,
                    bio: null
                }
            };
        }
        case action_type.SENT_MSG: {
            return {
                ...state,
                newNotification: {
                    ...state.newNotification,
                    msg: action.payload.msg,
                    sender: action.payload.sender
                }
            };
        }
        
        case action_type.HAS_READ: {
            return {
                ...state,
                read: action.payload.read
            }       
        }
            
        default: {
            return state;
        }
    }
}