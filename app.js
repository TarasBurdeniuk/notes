const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');


const assert = require('assert');


const app = express();

db.checkConnection();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views', './views');
app.use(express.static('assets'));
app.set('view engine', 'pug');

app.get('/notes', async (req, res) => {
    res.render('notes', {title: 'Add notes'})
});

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const notesList = await db.getOneNote(id);

    res.render(`edit-note`, {title: 'Note', notesList});
});

app.post('/api/notes', async function (req, res) {
    await db.addNote(req.body);
    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.put('/api/notes/:id', async (req, res) => {
    await db.updateNote(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.delete('/api/notes/:id', async (req, res) => {
    await db.deleteNote(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.get('/', async function (req, res) {
    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.get('/lists', async (req, res) => {
    res.render('list', {title: 'Lists'})
});

app.post('/api/lists', async (req, res) => {
    await db.addLists(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.get('/lists/:id', async (req, res) => {
    const id = req.params.id;
    const listItem = await db.getOneList(id);

    res.render(`edit-list`, {title: 'Edit list', listItem});
});

app.put('/api/lists/:id', async (req, res) => {
    await db.updateList(req.body);
    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.delete('/api/lists/:id', async (req, res) => {
    await db.deleteList(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.listen(5000);

module.exports = app;