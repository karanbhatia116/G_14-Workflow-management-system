import { Button } from "@material-ui/core";
import { useState } from "react";
import { Jumbotron, Modal } from "react-bootstrap";
import Authentication from "./Authentication";
const Home = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Jumbotron>
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" animation={false} centered>
                    <Authentication />
                </Modal>
                <h1>
                    Home-Page
                </h1>
                <Button onClick={() => setShow(true)}>
                    Log-In
                </Button>
            </Jumbotron>

        </>
    );
}
export default Home;