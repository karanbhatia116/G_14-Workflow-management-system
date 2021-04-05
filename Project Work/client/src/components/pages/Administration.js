import { Container } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "../layouts/AddUser";
import SearchBar from "../layouts/SearchBar";

function Administration() {

    return (
        <Container style={{ padding: "1em" }}>
            <Container >
                <h4>
                    Adminstration Board:
                </h4>
            </Container>
            <SearchBar />
            <Container>
                <h6>User Portal:</h6>
                <AddUser />
            </Container>
        </Container>
    );
}
export default Administration;