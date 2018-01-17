'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const storedItems = require('./api/depot');

const app = express();

const upload = multer({ storage: multer.diskStorage({
        destination: 'public/images/',
        limits: {fileSize: 10000000, files: 1},
        filename: (req, file, cb) => {
            cb(null, file.originalname.split('/').pop().trim());
        },
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error('Only Images are allowed !'), false);
            }

            callback(null, true);
        }
    })
}).single('image');

let nextId = 5;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function rewriteJSON(data) {
    fs.writeFile('./api/depot.json', JSON.stringify(data, null, 4), 'utf-8', function (err) {
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

app.post('/images/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({message: err.message});
        } else {
            let path = `./public/images/${req.file.filename}`;
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path});
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
