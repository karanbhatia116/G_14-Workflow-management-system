import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProjectModal from '../layouts/ProjectModal';

const useStyles = makeStyles({
    root: {
        marginTop: 26,
        minWidth: 280,
        minHeight: 438,
        maxHeight: 438,
        marginBottom: 30,
        overflowY: 'auto',
    },
    media: {
        height: 140,
    },
    button: {
        position: 'relative',

    }
});

const ProjectCard = (props) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const [title, setTitle] = useState(props.project.projectname);
    const [description, setDescription] = useState(props.project.description);
    const [image, setImage] = useState(props.project.image);
    const [team, setTeam] = useState(props.project.team);
    return (
        <>
        <ProjectModal isOpen = {isOpen} 
        setOpen={setOpen} 
        title={title} 
        setTitle={setTitle} 
        description={description} 
        setDescription={setDescription}
        image = {image}
        setImage={setImage}
        team={team}
        setTeam={setTeam}
        ></ProjectModal>
        <Card className={classes.root} onClick={()=>setOpen(true)}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" className = {classes.button}>
              Details
            </Button>
                </CardActions>
            </Card>

        </>
    );
};

export default ProjectCard;