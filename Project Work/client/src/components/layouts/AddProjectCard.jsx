import {makeStyles} from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {v4 as uuid} from 'uuid';
const useStyles = makeStyles({
    project__add__card:{
        height: 438,
        width: 280,
        border: '1px dashed gray',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        "&:hover":{
            cursor:'pointer'
        }
    },
    project__add__title:{
        display:'flex',
        flex:1,
        marginBottom: 50,
        marginLeft: 10
    }
});
function AddProjectCard({projects,setProjects}) {

    const handleAddProject = async (e)=>{
        setProjects([
            ...projects,
            {
                id: uuid(),
                img: "https://via.placeholder.com/300x60?text=Add+Image",
                project_title: 'Project Title',
                team_assigned: null,
                project_manager: '',
                project_description: 'Enter description...',
                projectDeadline: new Date()
            }
        ]);
    }
    const classes = useStyles();
    return (
        <div className = {classes.project__add__card} onClick={handleAddProject}>
        <h3>Add New Project</h3> 
        <AddBoxIcon className = "plus__icon" style = {{height: 50, width: 50}}></AddBoxIcon>
        </div>
    )
}

export default AddProjectCard
