import Administration from '../pages/Administration';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Discussion from "../pages/Discussion";
import Lists from "../pages/Lists";
import Notes from "../layouts/Notes"

export const admin = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 3, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 4, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 5, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 6, path: "/Admin", name: "Admin", target: <Administration /> }
];

export const manager = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 2, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 3, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 4, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 5, path: "/Discussion", name: "Discussion", target: < Discussion /> }
];

export const engineer = [
    { id: 1, path: "/Home", name: "Home", target: < Home /> },
    { id: 3, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 4, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 5, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 2, path: "/Discussion", name: "Discussion", target: < Discussion /> }
];