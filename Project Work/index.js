const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const pool = require('./db');
var msgs = [];
const cors = require('cors');
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
const user_modal = require('./userModal');

io.on("connection", (socket) => {
    console.log(socket.id);
    console.log('\n');
    socket.on('joined-chat-room', function (msg) {
        io.emit("new-connection", msg);
    });
    socket.on('send-chat', function (chat) {
        io.emit('receive-chat-msg', chat);
    });
    socket.on('send-notification', (msg) => {
        io.emit("receive-notification", msg);
    });
    socket.on('disconnecting', () => {
        setTimeout(() => socket.disconnect(true), 5000);
        console.log('user disconnected');
    })
});

app.post('/discussion', async (req, res) => {
    try {
        var obj = req.body;
        const newMessage = await pool.query("INSERT INTO chat(msg, userName, time, room) values($1, $2, $3, $4)", [obj.msg, obj.username, new Date().toUTCString(), obj.room]);
        msgs.push(obj);
        res.status(200).send("message received");
    } catch (error) {
        console.error(error);
    }

});

app.get('/discussion', async (req, res) => {

    const newMessage = await pool.query("SELECT * from chat");
    msgs = newMessage.rows;
    if (msgs.length === 0)
        res.status(200);
    else
        res.status(200).send(msgs);
});

app.post('/login', (req, res) => {
    user_modal.getUsers(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/changepwd', (req, res) => {
    user_modal.changepwd(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/finduser', (req, res) => {
    user_modal.findUser(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/adduser', (req, res) => {
    user_modal.addUsers(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.put('/upgradeuser', (req, res) => {
    user_modal.upgradeUser(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.put('/downgradeuser', (req, res) => {
    user_modal.downgradeUser(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get('/findprojects', (req, res) => {
    user_modal.findProjects()
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/addproject', (req, res) => {
    user_modal.addProject(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.delete('/deleteproject', (req, res) => {
    user_modal.deleteProject(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get('/getnote', (req, res) => {
    user_modal.getNote(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/addnote', (req, res) => {
    user_modal.addNote(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.delete('/deletenote', (req, res) => {
    user_modal.deleteNote(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.put('/updatenote', (req, res) => {
    user_modal.updateNote(req.body)
        .then(response => {
            if (response === undefined) {
                res.status(500).send(undefined);
            } else {
                res.status(200).send(response);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
