// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import ListGroup from 'react-bootstrap/ListGroup';

// export var DashTasks = () => {
//     return (
//         <Container>
//             <Row style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: '2rem',
//                 fontWeight: 'bolder',
//             }}
//             >TO-DO
//             </Row>

//             <hr />
//             <Row md={{ span: 10, offset: 0 }}>
//                 <Col>
//                     <ListGroup>
//                         <ListGroup.Item>Hello</ListGroup.Item>
//                         <ListGroup.Item>Hello</ListGroup.Item>
//                         <ListGroup.Item>Hello</ListGroup.Item>
//                     </ListGroup>
//                 </Col>
//                 <Col>
//                     <ListGroup>
//                         <ListGroup.Item>Hello</ListGroup.Item>
//                         <ListGroup.Item>Hello</ListGroup.Item>
//                         <ListGroup.Item>Hello</ListGroup.Item>
//                     </ListGroup>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default DashTasks;

import React, { useState, useEffect } from 'react'
import '../../styles/List.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import List from './List';
// import AddNewList from './AddNewList';

// these will be fetched from the backend 
var arr = [
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
    [uuid()]: {
        name: 'Todo',
        items: arr
    },
    [uuid()]: {
        name: 'Done',
        items: []
    },
}

export var DashTasks = () => {
    const [lists, setLists] = useState(listsFromBackend);
    const [render, setRender] = useState(false);

    // const getListIndex = () => {
    //     for (var prop in lists) {
    //         if (lists.hasOwnProperty(prop)) {
    //             if (lists[prop] === list)
    //                 return prop;
    //         }
    //     }
    // }
    // var listIndex = getListIndex();

    // export const LineItem = item => <li key={uuid()}>{item}</li>

    // export const List = () => array.map(item => <LineItem item={item} />

    return (
        console.log(lists.items),
        <div >
            {/* <DragDropContext onDragEnd={handleOnDragEnd}> */}
            {/* {Object.entries(lists).map(([id, list]) =>
                <List id={id} key={id} list={list} lists={lists} setLists={setLists} render={render} setRender={setRender}></List>
            )} */}
            {/* </DragDropContext> */}
            {arr[0].cardContent}
        </div>
    )
}

export default DashTasks;
