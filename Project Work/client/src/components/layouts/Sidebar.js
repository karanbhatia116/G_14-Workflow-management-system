function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }) {

    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

    return (
        <div className="app-sidebar">

            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote}>Add</button>
            </div>

            <div className="app-sidebar-notes">
                {notes.map((note) => (
                    <div
                        className={`app-sidebar-note ${(note.noteid === activeNote) && "active"}`}
                        onClick={() => setActiveNote(note.noteid)}
                        key={note.noteid}
                    >

                        <div className="sidebar-note-title">
                            <strong>{note.notetitle}</strong>
                            <button onClick={() => onDeleteNote(note.noteid)}>
                                Delete
                            </button>
                        </div>

                        <p>{note.notetext && note.notetext.substr(0, 100) + "..."}</p>

                        <small className="note-meta">
                            Last Modified{" " + note.lastmodified}
                        </small>

                    </div>

                ))}

            </div>
        </div>
    )
}

export default Sidebar