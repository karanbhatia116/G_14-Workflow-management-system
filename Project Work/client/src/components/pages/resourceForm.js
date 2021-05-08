import React, { useState, useRef } from 'react';
import {v4 as uuid} from 'uuid';
  function ResourceForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [input1, setInput1] = useState(props.edit ? props.edit.value : '');
  
    const inputRef = useRef(null);
    const inputRef1 = useRef(null);
  
    const handleChange = e => {
      setInput(e.target.value);
    };
    const handleChange1 = e => {
      setInput1(e.target.value);
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      props.onSubmit({
        id: uuid(),
        topic:input1,
        text: input
      });
      setInput('');
      setInput1('');
    };
  
    return (
      <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
          <>
          <input
              placeholder='Update a Resource/Reference Topic'
              value={input1}
              onChange={handleChange1}
              name='topic'
              className='todo-input edit 1'
              ref={inputRef1}
            />
            <input
              placeholder='Update your Resource/Reference Topic'
              value={input}
              onChange={handleChange}
              name='text'
              ref={inputRef}
              className='todo-input edit 2'
            />
            <button onClick={handleSubmit} className='todo-button edit'>
              Update
            </button>
          </>
        ) : (
          <>
            <input
              placeholder='Add a Resource/Reference Topic'
              value={input1}
              onChange={handleChange1}
              name='topic'
              className='todo-input topic'
              ref={inputRef1}
            />
            <input
              placeholder='Add a Resource/Reference Link'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input text'
              ref={inputRef}
            />
            
            <button onClick={handleSubmit} className='todo-button'>
              Add
            </button>
          </>
        )}
      </form>
    );
  }
  
  export default ResourceForm;
  
  