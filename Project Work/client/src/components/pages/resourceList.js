import React, { useState } from 'react';
import TodoForm from './resourceForm';
import Todo from './resource';
import '../../styles/resource.css';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function ResourceList() {
  const [todos, setTodos] = useState([]);
  const [placehold, setPlacehold] = useState(false);
  const [present,setPresent]=useState(false);


  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      //alert("Empty Link Not Allowed")
      //return;
    }
    if(todo.text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)===null)
    {
     
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
      
    }
    else if (!todo.topic || /^\s*$/.test(todo.topic)) {
      //alert("Empty Topic Name Not Allowed")
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
      //return;
    }
    else if(todos.find( ({ text}) => text === todo.text)!==undefined)
    {
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
      //alert("This Link is already present");
      //return ;
    }
    else
    {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
    }
  };

  const updateTodo = (todoId, newValue) => {
    let found=todos.find( ({ text }) => text === newValue.text );
    if (!newValue.text || /^\s*$/.test(newValue.text)) 
    {
      //newValue.text=found.text;
      setPlacehold(true);
      setTimeout(function()
      {
        setPlacehold(false);
      }.bind(this),5000);
      //alert("Empty Link Not Allowed");
    //  return;
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
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

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