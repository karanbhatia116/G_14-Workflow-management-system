import React from "react";
import "../../styles/bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import '../../styles/Projects.css';
import Lists from './Lists';

const Projects = ()=>{
    
    //renders all the Lists (todo)
    return (
            <div className = 'projects'>
            <Lists></Lists>
            </div>
    );
}
export default Projects;