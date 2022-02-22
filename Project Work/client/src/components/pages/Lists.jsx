import React, {useState, useEffect} from 'react'
import '../../styles/List.css';
import {DragDropContext} from 'react-beautiful-dnd';
import List from './List';
import AddNewList from './AddNewList';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {NotificationManager, NotificationContainer} from  'react-notifications';
import 'react-notifications/lib/notifications.css';
function Lists() {

    const [lists, setLists] = useState({});
    const [render, setRender] = useState(false);

    useEffect(()=>{
        axios.get('/lists').then(res=> {
            setLists(res.data.data);
        });
        return (() => { return true; });
    }, []);

    const handleBoardSave = ()=>{
        axios.post('/updatelists', lists);
        NotificationManager.success("Board state saved successfully!", "Notification");
    }
    const handleOnDragEnd = async (result)=>{
        if(!result.destination) return;
        const {source, destination} = result;
        if(source.droppableId !== destination.droppableId)
        {
            const sourceList = lists[source.droppableId];
            const destList = lists[destination.droppableId];
            const sourceItems = [...sourceList.items];
            const destItems = [...destList.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setLists({
                ...lists, 
                [source.droppableId]:{
                    ...sourceList, 
                    items: sourceItems
                },
                [destination.droppableId]:{
                    ...destList, 
                    items: destItems
                }
            });
            
            
        }
        else{
            const list = lists[source.droppableId];
            const copiedItems = [...list.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setLists({
                ...lists, 
                [source.droppableId]:{
                    ...list, 
                    items: copiedItems
                }
            });
        }
        
    }

    return (
        <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <Button style={{marginTop: '1rem'}} variant='outline-primary' onClick={handleBoardSave}>Save Board</Button>
        </div>
        <div className = 'lists'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.entries(lists).map(([id, list])=>
            <List id = {id} key = {id} list = {list} lists = {lists} setLists = {setLists} render = {render} setRender = {setRender}></List>
        )}
        <AddNewList lists = {lists} setLists = {setLists}></AddNewList>
        </DragDropContext>
        </div>
        <NotificationContainer/>
        </>
    )
}

export default Lists
