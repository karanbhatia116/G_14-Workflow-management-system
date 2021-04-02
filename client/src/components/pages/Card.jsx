import React from 'react'
import { IconButton, Paper, Typography } from '@material-ui/core'
import '../../styles/Card.css';
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded';
import Trash from '@material-ui/icons/Delete';
function Card({cardContent, lists, setLists, list, render, setRender}) {
    const getListIndex = ()=>{
        for(var prop in lists){
            if(lists.hasOwnProperty(prop))
            {
                if(lists[prop] === list)
                return prop;
            }
        }
    }
    var listIndex = getListIndex();
    const handleDeleteCard = ()=> {
        var l = lists;
        var arr = l[listIndex].items.filter(item => item.cardContent !== cardContent);
        l[listIndex].items = arr; 
        setLists(l);
        setRender(!render);
    }
    return (
        <div className = "card__container">
            <Paper className = 'card' style={{borderRadius:"0px", backgroundColor:'#fafafa'}}>
                <Typography className = 'card__content'>
                <DragHandleRoundedIcon></DragHandleRoundedIcon>
                 <span className = 'card__content__text'>{cardContent}</span>
                <IconButton style = {{marginLeft: 10, padding: 0}} onClick = {handleDeleteCard}>
                    <Trash></Trash>
                </IconButton>
                </Typography>
            </Paper>
        </div>
    )
}

export default Card
