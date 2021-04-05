import Administration from '../pages/Administration';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Discussion from "../pages/Discussion";

export const admin = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Admin", name: "Admin", target: <Administration /> },
    { id: 3, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 4, path: "/Discussion", name: "Discussion", target: < Discussion /> }
];

export const manager = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 3, path: "/Projects", name: "Projects", target: <Projects /> }
];

export const engineer = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 3, path: "/Projects", name: "Projects", target: <Projects /> }
];