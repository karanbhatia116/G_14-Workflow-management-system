import Administration from '../pages/Administration';
import Projects from '../pages/Projects';
import Discussion from "../pages/Discussion";
import Lists from "../pages/Lists";
import Notes from "../layouts/Notes"
import Calender from '../layouts/Calender';
import ResourceList from "../pages/resourceList";
import Settings from '../layouts/Settings';

export const admin = [
    { id: 1, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 2, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 3, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 4, path: "/Calender", name: "Calender", target: < Calender /> },
    { id: 5, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 6, path: "/Admin", name: "Admin", target: <Administration /> },
    { id: 7, path: "/Resource", name: "Resources", target: <ResourceList/> },
    { id: 8, path: "/Settings", name: "Settings", target: <Settings />}
    
];

export const manager = [
    { id: 1, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 2, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 3, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 4, path: "/Calender", name: "Calender", target: < Calender /> },
    { id: 5, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 6, path: "/Resource", name: "Resource", target: <ResourceList/> },
    { id: 7, path: "/Settings", name: "Settings", target: <Settings />}
];

export const engineer = [
    { id: 1, path: "/Projects", name: "Projects", target: <Projects /> },
    { id: 2, path: "/TaskList", name: "TaskList", target: <Lists /> },
    { id: 3, path: "/Notes", name: "Notes", target: <Notes /> },
    { id: 4, path: "/Calender", name: "Calender", target: < Calender /> },
    { id: 5, path: "/Discussion", name: "Discussion", target: < Discussion /> },
    { id: 6, path: "/Resource", name: "Resource", target: <ResourceList/> },
    { id: 7, path: "/Settings", name: "Settings", target: <Settings />}
];