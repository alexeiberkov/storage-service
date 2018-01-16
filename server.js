'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const storedItems = require('./api/depot');

const app = express();

let nextId = 5;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function rewriteJSON(data) {
    fs.writeFile('./api/depot.json', JSON.stringify(data, null, 4), 'utf-8', function(err) {
        if (err) throw err;
    });
}

app.get('/api/depot', (req, res) => {
    res.send(storedItems);
});

app.post('/api/depot', (req, res) => {
    const item = {
        id: nextId++,
        title: req.body.title,
        known: false,
        location: "",
        comment: "",
        photo: ""
    };

    storedItems.push(item);

    rewriteJSON(storedItems);

    res.send(item);
});

app.put('/api/depot/:id', (req, res) => {
    const index = storedItems.findIndex(item => item.id == req.params.id);
    const item = storedItems[index];

    if (!item) return res.sendStatus(404);

    item.title = req.body.title;
    item.location = req.body.location;
    item.comment = req.body.comment;
    item.photo = req.body.photo;

    rewriteJSON(storedItems);

    res.json(item);
});

app.patch('/api/depot/:id', (req, res) => {
    const index = storedItems.findIndex(item => item.id == req.params.id);
    const item = storedItems[index];

    if (!item) return res.sendStatus(404);

    item.known = !item.known;

    rewriteJSON(storedItems);

    res.json(item);
});

app.delete('/api/depot/:id', (req, res) => {
    const index = storedItems.findIndex(item => item.id == req.params.id);
    
    if (index === -1) return res.sendStatus(404);

    storedItems.splice(index, 1);

    rewriteJSON(storedItems);

    res.sendStatus(204);
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));
