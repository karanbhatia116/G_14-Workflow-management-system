import React from 'react';
import '../../styles/AddNewList.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from  'axios';
function AddNewList({lists, setLists}) {

    function ObjectLength( object ) {
        var length = 0;
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
    };    
    const handleAddNewList = async ()=>{

        const response = await axios.post('/addlist', {
            name: '',
            items: []
        });
        setLists({
                ...lists,
                [ObjectLength(lists)]:{
                    "name": '',
                    "items": [],
                    "_id": response.data.column_id
                }
            });
        
    }
    return (
        <div className = "lists__add__newlist" onClick = {handleAddNewList}>
           <h3 className = 'lists__add__text'>Add New Column</h3> 
           <AddBoxIcon className = "plus__icon" style = {{height: 50, width: 50}}></AddBoxIcon>
        </div>
    )
}

export default AddNewList
