import { Container } from "@material-ui/core";
import { Grid, FormControl, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton } from "@material-ui/core";
import { useState, useRef, useEffect} from "react";

function SearchBar() {
    //Store the value of the search bar
    const [search, setSearch] = useState("");
    //Store the search results of the query
    const [searchList, setSearchList] = useState([]);

    //Shows the error
    const [searchWarning, setsearchWarning] = useState("");

    useEffect(() => {
        handleChange();
    }, [search]);
    function handleChange() {
        //fetch data from the users database using fetch API
        fetch('http://localhost:4000/finduser', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search })
        })
            .then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(data => {
                if (data === undefined) {
                    //if the the search is wrong then throw warning
                    setsearchWarning("Username is not available.");
                    setSearchList([]);
                } else {
                    setSearchList(data);
                }
            });
    }

    return (
        <Container style={{ padding: "1em" }}>
            {/* Search which query the users table */}
            <Container>
                <Grid container item direction="column" justify="center" alignItems="center" xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="searchbar" variant="outlined" error={searchWarning !== ""}>Searchbar</InputLabel>
                        <OutlinedInput
                            id="searchbar"
                            type="text"
                            name="searchbar"
                            label="searchbar"
                            error={searchWarning !== ""}
                            aria-describedby="my-helper-text-searchbar"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            autoComplete="off"
                            endAdornment={
                                <InputAdornment>
                                    <IconButton
                                        aria-label="searchbar"
                                        edge="end"
                                        onClick={() => document.getElementById("searchbar").focus()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="my-helper-text-searchbar" error={searchWarning !== ""}>{searchWarning}</FormHelperText>
                    </FormControl>
                </Grid>
            </Container>
            <Container>
                {/* Result are Shown Here */}
                <h6>List:</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">UserType</th>
                            <th scope="col">UserName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchList.map((user, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{user.usertype}</td>
                                    <td>{user.username}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Container>
        </Container>
    );

}

export default SearchBar;