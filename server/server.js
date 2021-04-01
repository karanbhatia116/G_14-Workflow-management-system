const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const user_modal = require('./userModal');
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

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});