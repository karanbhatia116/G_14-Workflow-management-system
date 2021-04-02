import React from 'react'
import '../../styles/AddNewList.css'
import AddBoxIcon from '@material-ui/icons/AddBox';
import {v4 as uuid} from 'uuid';
function AddNewList({lists, setLists}) {
    const handleAddNewList = ()=>{
        setLists({
            ...lists,
            [uuid()]:{
                name: '',
                items: []
            }
        })
    }
    return (
        <div className = "lists__add__newlist" onClick = {handleAddNewList}>
           <h3 className = 'lists__add__text'>Add New Column</h3> 
           <AddBoxIcon className = "plus__icon" style = {{height: 50, width: 50}}></AddBoxIcon>
        </div>
    )
}

export default AddNewList
