import React, {useState, useEffect} from 'react'
import '../../styles/List.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import List from './List';
import AddNewList from './AddNewList';

// these will be fetched from the backend 
var arr= [
    {
        cardContent: "Make a draggable todo list",
        id: uuid().toString(),
    },
    {
        cardContent: "Walk dog",
        id: uuid().toString(),
    },


];
const listsFromBackend = {
    [uuid()]:{
        name: 'Todo',
        items: arr
    },
    [uuid()]:{
        name: 'Done',
        items: []
    },
}

function Lists() {
    const [lists, setLists] = useState(listsFromBackend);
    const [render, setRender] = useState(false);

    const handleOnDragEnd = (result)=>{
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

    //------------BUGGY---------------------//
    // const handleDeleteList = async (list)=>{
    //     var listIndex;
    //     for(var prop in lists){
    //         if(lists.hasOwnProperty(prop))
    //         {
    //                 if(lists[prop] === list)
    //                 listIndex = prop;
    //         }
    //     }
    //     var l = lists;
    //     console.log("before delete:", lists);
    //     delete l[listIndex];
    //     // setRender(!render);
    //     await setLists(()=>{
    //     return l;
    //     });
    //     await setRender((r)=>{
    //         return {r: !render};
    //     });
    //     console.log("after delete:",lists);
    // }

    return (
        <div className = 'lists'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.entries(lists).map(([id, list])=>
            <List id = {id} key = {id} list = {list} lists = {lists} setLists = {setLists} render = {render} setRender = {setRender}></List>
        )}
        <AddNewList lists = {lists} setLists = {setLists}></AddNewList>
        </DragDropContext>
        </div>
    )
}

export default Lists
