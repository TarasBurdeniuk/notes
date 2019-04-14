const express = require('express');
const bodyParser = require('body-parser');
// База данных в другом месте
const db = require('../config/db/db');

const app = express();
app.locals.basedir = __dirname;
console.log(app.locals.basedir);

db.checkConnection();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', __dirname);
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/assets'));

setInterval(function () {
    app.get('https://bandanotes.herokuapp.com/')
}, 300000);

app.get('/notes', async (req, res) => {
    res.render('notes/views/create', {title: 'Add notes'})
});

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const notesList = await db.getOneNote(id);

    res.render(`notes/views/update`, {title: 'Note', notesList});
});

app.post('/notes', async function (req, res) {
    await db.addNote(req.body);
    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('views/index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.put('/notes/:id', async (req, res) => {
    await db.updateNote(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('views/index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.delete('/notes/:id', async (req, res) => {
    await db.deleteNote(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('views/index', {
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

    res.render('views/index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});
//
app.get('/lists', async (req, res) => {
    res.render('list/views/create', {title: 'Lists'})
});

app.post('/lists', async (req, res) => {
    await db.addLists(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('views/index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.get('/lists/:id', async (req, res) => {
    const id = req.params.id;
    const listItem = await db.getOneList(id);

    res.render(`list/views/update`, {title: 'Edit list', listItem});
});

app.put('/lists/:id', async (req, res) => {

    await db.updateList(req.body);
    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('views/index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

app.put('/', async (req) => {
    await db.updateCheckList(req.body);
});

app.delete('/lists/:id', async (req, res) => {
    await db.deleteList(req.body);

    const [list, note] = [
        await db.getList(),
        await db.getNote()
    ];

    res.render('views/index', {
        title: 'ToDo',
        notesList: note,
        listItem: list
    });
});

module.exports = app;