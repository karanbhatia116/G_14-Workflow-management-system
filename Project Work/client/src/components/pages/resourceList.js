import React, { useState, useEffect, useRef} from 'react';
import TodoForm from './resourceForm';
import Todo from './resource';
import '../../styles/resource.css';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
function ResourceList() {
  const [todos, setTodos] = useState([]);
  const [placehold, setPlacehold] = useState(false);
  useEffect(()=>{
    axios.get('/resources').then(res=>{
      if(res.data)
      {
        let objArr = res.data;
        for(var key in objArr){
        delete Object.assign(objArr[key], {['id']: objArr[key]['resource_id'] })['resource_id'];
        delete Object.assign(objArr[key], {['topic']: objArr[key]['resource_name'] })['resource_name'];
        delete Object.assign(objArr[key], {['text']: objArr[key]['resource_url'] })['resource_url'];
        }
        setTodos(objArr);
      }
    });
  }, []);

  const addTodo = todo => {
    if(todo.text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)===null)
    {
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
      
    }
    else if (!todo.topic || /^\s*$/.test(todo.topic)) {
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
    }
    else if(todos.find( ({ text}) => text === todo.text)!==undefined)
    {
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
    }
    else
    {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    axios.post('/resources', {
      resource_id: todo.id,
      resource_name: todo.topic,
      resource_link: todo.text
    });
    }
  };

  const updateTodo = async (todoId, newValue) => {
    let found=todos.find( ({ text }) => text === newValue.text );
    if (!newValue.text || /^\s*$/.test(newValue.text)) 
    {
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
    }
    else if(newValue.text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)===null)
    {
      //alert("Enter Valid URL");
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
    //  return ;
    }
    else if (!newValue.topic || /^\s*$/.test(newValue.topic)) 
    {
      //newValue.topic=found.topic;
      //alert("Empty Topic Name Not Allowed");
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
      //return;
    }
    // todos
    
    else if(found!==undefined && found.id!==todoId)
    {
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);     
     // return ;
    }
    else
    {
      axios.post('/updateresource', {
        resource_id: todoId,
        resource_name: newValue.topic,
        resource_url: newValue.text
        });
      setTodos(prev => prev.map((item)=>item.id === todoId ? Object.assign({}, item, {text: newValue.text, topic: newValue.topic}): item));
    }
  };
  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    axios.post('/deleteresource', {
      resource_id: id
    });
    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
    <div>
     {placehold?<div><Alert severity="error">Please Enter Valid Details. Some fields might be empty or URL is already present or URL is invalid. </Alert>
     
      <TodoForm onSubmit={addTodo} />      
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      </div>:
     <div>
      <TodoForm onSubmit={addTodo} />      
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      </div>
      }
      </div>
     
      
    </>
  );
}

export default ResourceList;