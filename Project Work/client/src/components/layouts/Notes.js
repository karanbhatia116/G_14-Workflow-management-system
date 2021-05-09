import { useEffect, useState } from "react";
import './../../styles/Notes.css';
import Sidebar from '../layouts/Sidebar';
import Main from '../layouts/Mainbar';
import { userStore } from "../storage/store";

function Notes() {

    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);

    const onAddNote = () => {
        const d = new Date();
        const newNote = {
            title: "Untitled Note",
            text: "",
            lastModified: `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)}-${d.getUTCDate()}`,
            username: userStore.getState().loggedInUser.username
        };
        fetch(
            'http://localhost:4000/addnote', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNote)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data !== undefined) {
                    setNotes([data[0], ...notes]);
                }
            });
    };

    const onDeleteNote = (idToDelete) => {
        fetch(
            'http://localhost:4000/deletenote', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToDelete })
        })
            .then(response => {
                return (response.status === 200);
            })
            .then(data => {
                if (data) {
                    setNotes(notes.filter((note) => note.noteid !== idToDelete));
                }
            });
    };

    const onUpdateNote = async (updatedNote) => {
        const d = await new Date();
        updatedNote = {
            ...updatedNote,
            lastmodified: `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)}-${d.getUTCDate()}`
        }
        fetch(
            'http://localhost:4000/updatenote', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedNote)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {                
                const updatedNotesArray = notes.map((note) => { 
                    if (note.noteid === activeNote) {
                        return data;
                    }
                    return note;
                });
                setNotes(updatedNotesArray);
            });
    };

    useEffect(() => {
        fetch(
            'http://localhost:4000/getnote', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data !== undefined) {
                    setNotes(data);
                }
            });
        
        return (() => { return true; });
    },[]);
    

    return (
        <div className="App">
            <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onUpdateNote={onUpdateNote}
            />
            <Main
                notes={notes}
                activeNote={activeNote}
                onUpdateNote={onUpdateNote}
            />
        </div>
    );
}

export default Notes;
