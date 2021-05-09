const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const pool = require('./db');
const mongoDBURI = process.env.MONGODB_URL;
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 
mongoose.connect(mongoDBURI, {useNewUrlParser: true, useUnifiedTopology: true});
const mongodb = mongoose.connection;
mongodb.on('connected', ()=>console.log('MongoDB connected!'));
const Schema = mongoose.Schema;
var taskListSchema = new Schema({
name: String, 
items: Array
});
var List = mongoose.model('Lists', taskListSchema);

var msgs = [];
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'karanbhatia116',
    api_key: '663114895376731',
    api_secret: 'xpeCQc_eaelszxm6AlYZml0aPeI'
})
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
const user_modal = require('./userModal');
const upload = multer({dest: 'uploads/'});

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

app.get('/discussion', async (req, res) => {

    const newMessage = await pool.query("SELECT * from chat");
    msgs = newMessage.rows;
    if (msgs.length === 0)
        res.status(200);
    else
        res.status(200).send(msgs);
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

app.post('/finduser', (req, res) => {
    user_modal.findUser(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get('/getmanager', (req, res) => {
    user_modal.getManager()
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

app.post('/findproject', (req, res) => {
    user_modal.findProject(req.body)
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

app.put('/updateproject', (req, res) => {
    user_modal.updateProject(req.body)
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

app.post('/changeusersettings', (req,res)=>{
    try{
        pool.query(`UPDATE users 
        SET full_name = '${req.body.full_name}', 
        email = '${req.body.email}', 
        title = '${req.body.title}',
        bio = '${req.body.bio}'
        where username = '${req.body.username}'
        `).then(()=>{
            res.send({
                success: true,
            });
        });
    }
    catch(err){
        console.log(err);
        res.send({
            success:false
        }).sendStatus(500);
    }
});
app.post('/addtask', async (req, res)=>{
    console.log(req.body);
    await List.findById(req.body.column_id, (err, docs)=>{
        console.log(docs);
        if(err) 
        {
            console.log(err);
            res.send({
                success:false
            });
        }
        else
        {
            List.findOneAndUpdate({_id: req.body.column_id}, {items: [...docs.items, req.body.new_data]}, (err, doc)=>{
                if(err)
                {
                    console.log(err);
                    res.send({
                        success:false
                    });
                }
                else
                {
                    console.log(doc.items);
                    res.send({
                        success: true,
                        message: 'Task added successfully'
                    });
                }
            });
        }
    })
});
app.post('/deletetask', (req,res)=>{
    List.findById(column_id, (err, doc)=>{
        if (err) throw err;
        else
        {
            List.findByIdAndUpdate(req.body.column_id, {items: doc.items.filter(item => item.id !==req.body.card_id)}, (err, result)=>{
                if(err) res.send(400);
                else
                {
                    res.sendStatus(200);
                }
            });
           
        }

       
    })
    
});
app.post('/addlist', async (req,res)=>{
    var column =  new List({
        name: '',
        items: []
    });
    column.save().then(()=>{
        res.send({
        success: true,
        message: 'List added successfully',
        column_id: column._id})
    }).catch(err => console.log(err));
    // List.insertMany({name: '', items: []}).then(()=>{
    //     res.send({
    //         success: true,
    //         message: 'List added successfully',
    //         column_id: 
    //     });
    // }).catch(err => console.log(err));

    
});
app.post('/deletelist', async (req, res)=>{
    List.findByIdAndDelete(req.body.column_id, (err)=>{
        if(err)
        res.sendStatus(500);
        else
        res.sendStatus(200);
    });
});
app.post('/updatelists', async (req, res)=>{
    const lists = req.body;
    console.log(lists);
    // let dbLists;
    // await List.find({}, (err, docs)=>{
    //     dbLists = docs;
    // });
    // for(var key in dbLists){
    //    if(!(dbLists[key]._id in lists)){
    //     await List.findByIdAndRemove(dbLists[key]._id);
    //    }
    // }
    for(var key in lists){
        if(lists.hasOwnProperty(key)){
            await List.findByIdAndUpdate(lists[key]._id, lists[key]);
        }
    }
});
app.get('/lists', async (req, res)=>{
    List.find({}, (err, docs)=>{
        if(err) res.send({success: false, err: "Internal Server error"});
        else
        {
            res.send({success: true, data: docs});
        }
    });
});
app.get('/projects', async (req, res)=>{
    const projects = await pool.query("SELECT * from projects");
    if (projects.rows.length === 0)
        res.status(200);
    else
        res.status(200).send(projects.rows);
});
app.post('/uploadImg', upload.single('img'), (req,res)=>{
    if(!req.file)
    res.send({uploadStatus: 'failed'});
    else
    {
        let file = req.file;
        console.log(req.file);
        cloudinary.uploader.upload(file.path, (err, result)=>{
            res.send({uploadStatus: 'successful', result});
        });
    }
});
app.post('/resources', async(req, res)=>{
    const obj = req.body;
    try{
        pool.query(`INSERT INTO resources(resource_id, resource_name, resource_url) VALUES('${obj.resource_id}', '${obj.resource_name}', '${obj.resource_link}')`);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
    }
});
app.get('/resources', async (req, res)=>{
    try{
        const resources = await pool.query('SELECT * from resources');
        res.send(resources.rows);
    }
    catch(err){
        res.sendStatus(500);
        console.log(err);
    } 
});
app.post('/deleteresource', async(req, res)=>{
    try{
        console.log(req.body);
        await pool.query(`DELETE from resources where resource_id = '${req.body.resource_id}'`).then(res.send({
            success:true,
            message: 'Resource deleted successfully'
        }));
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
app.post('/updateresource', async(req,res)=>{
    try {
        console.log(req.body);
        await pool.query(`UPDATE resources 
        SET resource_name = '${req.body.resource_name}', resource_url = '${req.body.resource_url}' 
        where resource_id = '${req.body.resource_id}'`);
        res.send({
            success: true,
            message: "Data updated successfully!"
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
