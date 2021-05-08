import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

export var DashTasks = () => {
    return (
        <Container>
            <Row style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: '2rem',
                fontWeight: 'bolder',
            }}
            >TO-DO
            </Row>

            <hr />
            <Row md={{ span: 10, offset: 0 }}>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>Hello</ListGroup.Item>
                        <ListGroup.Item>Hello</ListGroup.Item>
                        <ListGroup.Item>Hello</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>Hello</ListGroup.Item>
                        <ListGroup.Item>Hello</ListGroup.Item>
                        <ListGroup.Item>Hello</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default DashTasks;