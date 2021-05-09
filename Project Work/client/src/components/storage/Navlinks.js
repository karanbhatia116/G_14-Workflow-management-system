import Home from '../pages/Home';
import Administration from '../pages/Administration';
import Projects from '../pages/Projects';
import Discussion from "../pages/Discussion";
import Lists from "../pages/Lists";
import Notes from "../layouts/Notes"
import Calender from '../layouts/Calender';
import ResourceList from "../pages/resourceList";
import Settings from '../layouts/Settings';

export const admin = [
    { id: 1, path: "/Home", name: "Home", target: <Home /> },
    { id: 2, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 3, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 4, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 5, path: "/Calendar", name: "Calendar", target: < Calender /> },
    { id: 6, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 7, path: "/Admin", name: "Admin", target: <Administration /> },
    { id: 8, path: "/Resource", name: "Resources", target: <ResourceList/> },
    { id: 9, path: "/Settings", name: "Settings", target: <Settings />}
    
];

export const manager = [
    { id: 1, path: "/Home", name: "Home", target: <Home /> },
    { id: 2, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 3, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 4, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 5, path: "/Calendar", name: "Calendar", target: < Calender /> },
    { id: 6, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 7, path: "/Resource", name: "Resource", target: <ResourceList/> },
    { id: 8, path: "/Settings", name: "Settings", target: <Settings />}
];

export const engineer = [
    { id: 1, path: "/Home", name: "Home", target: <Home /> },
    { id: 2, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 3, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 4, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 5, path: "/Calendar", name: "Calendar", target: < Calender /> },
    { id: 6, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 7, path: "/Resource", name: "Resource", target: <ResourceList/> },
    { id: 8, path: "/Settings", name: "Settings", target: <Settings />}
];