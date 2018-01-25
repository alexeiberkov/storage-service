'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const storedJSONPath = './api/depot.json';
const locationsJSONPath = './api/locations.json';

const storedItems = require('./api/depot');
const locationsList = require('./api/locations');

const app = express();

const upload = multer({ storage: multer.diskStorage({
        destination: 'public/images/',
        limits: {fileSize: 10000000, files: 1},
        filename: (req, file, cb) => {
            let fileName = file.originalname.split('/').pop().trim(),
                ext = fileName.split('.').pop();

            fileName = fileName.split('.').shift();

            cb(null, fileName + Date.now() + '.' + ext);
        },
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error('Only Images are allowed !'), false);
            }

            callback(null, true);
        }
    })
}).single('image');

let nextId = storedItems.length;
let nextLocationId = locationsList.length;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function rewriteJSON(path, data) {
    fs.writeFile(path, JSON.stringify(data, null, 4), 'utf-8', function (err) {
        if (err) throw err;
    });
}

app.get('/api/depot', (req, res) => {
    res.send(storedItems);
});

app.get('/api/locations', (req, res) => {
    res.send(locationsList);
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

    rewriteJSON(storedJSONPath, storedItems);

    res.send(item);
});

app.post('/images/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({message: err.message});
        } else {
            res.status(200).json({photo: `${req.file.filename}`});
        }
    });
});

app.put('/api/depot/:id', (req, res) => {
    const index = storedItems.findIndex(item => item.id == req.params.id);
    const item = storedItems[index];

    if (!item) return res.sendStatus(404);

    item.title = req.body.title;
    item.location = req.body.location;
    item.comment = req.body.comment;
    item.photo = req.body.photo;

    rewriteJSON(storedJSONPath, storedItems);

    res.json(item);
});

app.patch('/api/depot/:id', (req, res) => {
    const index = storedItems.findIndex(item => item.id == req.params.id);
    const item = storedItems[index];

    if (!item) return res.sendStatus(404);

    item.known = !item.known;

    rewriteJSON(storedJSONPath, storedItems);

    res.json(item);
});

app.delete('/api/depot/:id', (req, res) => {
    const index = storedItems.findIndex(item => item.id == req.params.id);

    if (index === -1) return res.sendStatus(404);

    const photoName = storedItems[index].photo;

    if (!!photoName && photoName !== '') {
        const filePath = `./public/images/${photoName}`;
        fs.unlinkSync(filePath);
    }

    storedItems.splice(index, 1);

    rewriteJSON(storedJSONPath, storedItems);

    res.sendStatus(204);
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));
