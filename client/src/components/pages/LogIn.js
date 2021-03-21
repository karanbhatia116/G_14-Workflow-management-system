import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

class LogIn extends React.Component{
    render() {
        return (
            <Jumbotron>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="LogInEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email"></Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="LogInPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="currentpassword"></Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Button variant="primary" type="submit">
                            Log-In
                        </Button>
                    </Form.Row>
                </Form>
            </Jumbotron>
        );
    }
}

export default LogIn;