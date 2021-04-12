import { Container } from "@material-ui/core";
import { Grid, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function SearchBar() {
    //Store the value of the search bar
    const [search, setSearch] = useState("");
    //Store the search results of the query
    const [searchList, setSearchList] = useState([]);
    //current loggedInUser
    const loggedInUser = useSelector(state => state.loggedInUser);
    useEffect(() => {
        handleChange();
        return () => {
            return true;
        }
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
                    setSearchList([]);
                } else {
                    setSearchList(data);
                }
            });
    }

    const upgradeUser = (user, e) => {
        e.preventDefault();
        if (user.username !== loggedInUser.username) {
            fetch('http://localhost:4000/upgradeuser', {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    //check the response
                    if (response.status === 500) {
                        return undefined;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data !== undefined) {
                        //if the the search is right then update list
                        handleChange();
                    }
                });
        }
    }

    const downgradeUser = (user, e) => {
        e.preventDefault();
        if (user.username !== loggedInUser.username) {
            fetch('http://localhost:4000/downgradeuser', {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    //check the response
                    if (response.status === 500) {
                        return undefined;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data !== undefined) {
                        //if the the search is right then update list
                        handleChange();
                    }
                });
        }
    }

    return (
        <Container style={{ padding: "1em" }}>
            {/* Search which query the users table */}
            <Container>
                <Grid container item direction="column" justify="center" alignItems="center" xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="searchbar" variant="outlined" error={false}>Searchbar</InputLabel>
                        <OutlinedInput
                            id="searchbar"
                            type="text"
                            name="searchbar"
                            label="searchbar"
                            error={false}
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
                    </FormControl>
                </Grid>
            </Container>
            <Container>
                {/* Result are Shown Here */}
                {
                    searchList.length !== 0 &&
                    <>
                        <h6>List:</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Name</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchList.map((user, i) =>
                                        <tr key={i}>
                                            <td>{user.usertype}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                {
                                                    user.usertype !== 0 &&
                                                    <Button style={{ backgroundColor: "lightgreen", color: "white"}} onClick={(e) => upgradeUser(user, e)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                                        </svg>
                                                    </Button>
                                                }
                                                {
                                                    user.usertype !== 2 &&
                                                    <Button style={{ backgroundColor: "orange", color: "white" }} onClick={(e) => downgradeUser(user, e)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                                        </svg>
                                                    </Button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </>
                }
            </Container>
        </Container>
    );

}

export default SearchBar;