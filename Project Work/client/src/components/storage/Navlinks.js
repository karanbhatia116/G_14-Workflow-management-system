import Administration from '../pages/Administration';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Discussion from "../pages/Discussion";
import Lists from "../pages/Lists";
import Notes from "../layouts/Notes"

export const admin = [
    { id: 1, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 2, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 3, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 4, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 5, path: "/Admin", name: "Admin", target: <Administration /> }
];

export const manager = [
    { id: 1, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 2, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 3, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 4, path: "/Discussion", name: "Discussion", target: < Discussion /> }
];

export const engineer = [
    { id: 1, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 2, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 3, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 4, path: "/Discussion", name: "Discussion", target: < Discussion /> }
];