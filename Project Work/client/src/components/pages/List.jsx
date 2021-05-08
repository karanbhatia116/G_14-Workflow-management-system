import React, {useState, useRef, useEffect} from 'react'
import {Button, IconButton, Input, Paper, Collapse} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Card from './Card';
import {v4 as uuid} from 'uuid';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
const List = ({id, list, lists, setLists, render, setRender})=>{
    const [newTitle, setNewTitle] = useState(list.name);
    const [isOpen, setOpen] = useState(false);
    const [newInput, setNewInput] = useState('');
    const title = useRef();
    useEffect(()=>{
        setLists({
            ...lists,
            [id]:{
                ...list,
                name: newTitle,
                items: list.items
            }
        });
        return (() => { return true; });
    }, [newTitle]);

    // const completeTitleChange = async()=>{
    //         setLists({
    //         ...lists,
    //         [id]:{
    //             ...list,
    //             name: newTitle,
    //             items: list.items
    //         }
    //     });
    // }
    const handleTitleChange = async (e)=>{
        setNewTitle(e.target.value);
    }
    const handleOnChange = (e)=>{
        setNewInput(e.target.value);
    }
    const handleOnClick = async ()=>{
        if(!isOpen)
            setOpen(!isOpen);
        if(newInput)
        {
            const new_task_id = uuid().toString();
            setLists({
                ...lists,
                [id]:{
                    ...list,
                    items: [...list.items, {cardContent: newInput, id: new_task_id}],
                }
            });
            setNewInput('');
            setOpen(!isOpen);
            console.log("list._id: ", list._id);
            // axios.post('/addtask', {
            //     column_id: list._id,
            //     column_name: newTitle,
            //     new_data: {
            //         cardContent: newInput,
            //         id: new_task_id
            //     }
            // }).then(res=> console.log(res.data));

        }
        else if(!newInput)
        {
            await setOpen(!isOpen);
        }
    }
    
    const handleDeleteList = async ()=>{
        var listIndex;
        await axios.post('/deletelist', {
            column_id:list._id,  
            column_name: newTitle
        });
        console.log("List._id of deleted list: ", list["id"]);
        for(var prop in lists){
            if(lists.hasOwnProperty(prop))
            {
                    if(lists[prop] === list)
                    listIndex = prop;
            }
        }
        var l = lists;
        delete l[listIndex];
        // setRender(!render);
        await setLists(()=>{
        return l;
        });
        await setRender((r)=>{
            return {r: !render};
        });

    }
    return (
        <div className = 'list__container'>
            <Paper className = 'list__header' style = {{borderRadius:'0px', backgroundColor:"#3D4856", color:"white", display: 'flex', borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}} elevation = {1}>
                <Input disableUnderline 
                ref = {title}
                value = {newTitle} 
                style={{fontSize:'28px', color:'white', width:'100%', textAlign:'center'}} 
                id = {id}
                onChange = {handleTitleChange}
                >
                </Input>
                <IconButton onClick = {handleDeleteList}>
                    <Delete style = {{color: 'white'}}></Delete>
                </IconButton>
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
                                    <Card id = {id} cardContent = {cardContent} lists = {lists} setLists = {setLists} list = {list} render = {render} setRender = {setRender}/>
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
            <Collapse in = {isOpen} timeout = {'auto'}>
                <Paper elevation={0} style={{marginBottom:"1px", borderRadius:"0px", width:"100%"}}>
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
                style = {{backgroundColor: 'rgb(0, 138, 94)', color: 'white', borderRadius: '0px', borderBottomLeftRadius: '15px', outline: 'none'}}
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
};

export default List
