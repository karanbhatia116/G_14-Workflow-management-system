import React, {useState, useEffect, useRef} from 'react'
import {Button, IconButton, Input, Paper, Typography, Collapse} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Card from './Card';
import {v4 as uuid} from 'uuid';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
function List({id, list, lists, setLists, render, setRender}) {
    const [newTitle, setNewTitle] = useState(list.name);
    const [isOpen, setOpen] = useState(false);
    const [newInput, setNewInput] = useState('');
    const title = useRef();
    // useEffect(()=>{
    //    setNewTitle(newTitle);
    // }, []);

    const handleTitleChange = async ()=>{
        console.log(newTitle);
        await setLists({
                ...lists,
                [id]:{
                    name: newTitle,
                    items: list.items
                }
        });
    }
    const handleOnChange = (e)=>{
        setNewInput(e.target.value);
    }
    const handleOnClick = async ()=>{
        if(!isOpen)
            await setOpen(!isOpen);
        if(newInput)
        {
            await setLists({
                ...lists,
                [id]:{
                    ...list,
                    items: [...list.items, {cardContent: newInput, id: uuid().toString()}],
                }
            });
            await setNewInput('');
            await setOpen(!isOpen);
            // axios.post(`/todos`, lists);
        }
        else if(!newInput)
        {
            await setOpen(!isOpen);
        }
    }
    

    //-----BUGGY----------//
    // const handleDeleteList = async ()=>{
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
        <div className = 'list__container'>
             {console.log("Rerender from Child")}
            <Paper className = 'list__header' style = {{borderRadius:'0px', backgroundColor:"#31363d", color:"white", display: 'flex', borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}} elevation = {1}>
                <Input disableUnderline 
                ref = {title}
                value = {newTitle} 
                style={{fontSize:'28px', color:'white', width:'100%', textAlign:'center'}} 
                id = {id}
                onChange = {()=>{setNewTitle(title.current.value)}}
                >
                </Input>
                {/* <IconButton onClick = {handleDeleteList}>
                    <Delete style = {{color: 'white'}}></Delete>
                </IconButton> */}
            </Paper>
            <Droppable droppableId= {id} key = {id}>
                {(provided, snapshot)=>(
                    <div ref={provided.innerRef} {...provided.droppableProps} >
                        <Paper className = 'list' elevation={0} variant="outlined">
                        {list.items.map( ({cardContent, id}, index) => {
                            return (
                                <Draggable key = {id} draggableId = {id} index = {index}>
                                    {(provided, snapshot)=>(
                                    <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps} 
                                    className = 'dummy__container'
                                    >
                                    <Card cardContent = {cardContent} lists = {lists} setLists = {setLists} list = {list} render = {render} setRender = {setRender}/>
                                    </div>
                                    )}
                                </Draggable>
                                )
                            }
                        )}
                        {provided.placeholder}
                        </Paper>
                    </div>
                )}
            </Droppable>
            <Collapse in = {isOpen}>
                <Paper elevation={1} style={{marginBottom:"1px", borderRadius:"0px", width:"100%"}}>
                    <Input value = {newInput} 
                    placeholder = 'Enter a new card...' 
                    type='textarea' 
                    fullWidth multiline disableUnderline 
                    style={{padding:"27px"}} 
                    onChange={handleOnChange}
                    id = {id}
                    onBlur = {()=>setOpen(!isOpen)}
                    autoFocus
                    >
                    </Input>
                </Paper>
            </Collapse>
            <Paper className='list__add' style={{borderRadius:'0px', borderBottomLeftRadius:'18px', borderBottomRightRadius: '12px', border: '1px solid lightgrey'}} elevation = {1}>
                <Button className = 'list__add__button' 
                style = {{backgroundColor: 'rgba(13, 170, 30, 0.9)', color: 'white', borderRadius: '0px', borderBottomLeftRadius: '15px', outline: 'none'}}
                onClick = {handleOnClick}
                id = {id}
                >
                Add +
                </Button>
                <IconButton onClick = {()=>{
                    setOpen(false);
                    setNewInput('');
                }
                }>
                        <Close></Close>
                </IconButton>
                    
            </Paper>

        </div>
    )
}

export default List
