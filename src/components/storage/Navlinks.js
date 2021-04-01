import Administration from '../pages/Administration';
import Home from '../pages/Home';
import Projects from '../pages/Projects';

export const admin = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Admin", name: "Admin", target: <Administration /> },
    { id: 3, path: "/Projects", name: "Projects", target: <Projects /> }
];

export const manager = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Discussion2", name: "Discussion2", target: <Projects /> }
];

export const engineer = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Discussion1", name: "Discussion1", target: <Projects /> }
];