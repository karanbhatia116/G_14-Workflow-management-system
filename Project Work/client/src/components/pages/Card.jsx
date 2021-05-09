import React from 'react';
import { IconButton, Paper, Typography } from '@material-ui/core';
import '../../styles/Card.css';
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded';
import Trash from '@material-ui/icons/Delete';
import { userStore } from '../storage/store';
import axios from 'axios';
function Card({ id, cardContent, lists, setLists, list, render, setRender }) {

    //id is card's own id
    const getListIndex = () => {
        for (var prop in lists) {
            if (lists.hasOwnProperty(prop)) {
                if (lists[prop] === list)
                    return prop;
            }
        }
    }
    var listIndex = getListIndex();
    const handleDeleteCard = () => {
        var l = lists;
        var arr = list.items.filter(item => item.id !== id);
        l[listIndex].items = arr;
        setLists(l);
        setRender(!render);
        // axios.post('/deletetask', {
        //     column_id: list._id,
        //     card_id: id,
        //     cardContent: cardContent,
        // });
    }
    return (
        <div className="card__container">
            <Paper className='card' style={{ borderRadius: "0px", backgroundColor: '#fafafa' }}>
                <Typography className='card__content'>
                    <DragHandleRoundedIcon></DragHandleRoundedIcon>
                    <span className='card__content__text'>{cardContent}</span>

                    {userStore.getState().loggedInUser.usertype !== 2 && <IconButton style={{ marginLeft: 10, padding: 0, height: 'fit-content' }} onClick={handleDeleteCard}>
                        <Trash></Trash>
                    </IconButton>}
                </Typography>
            </Paper>
        </div>
    )
}

export default Card
