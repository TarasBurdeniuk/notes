const {uri, dbName} = require('./config');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

exports.checkConnection = async () => {
    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});

    connection.close();
};

exports.getOneNote = async (id) => {
    const query = {_id: new ObjectId(id)};
    let data = null;
    let client = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});

        const currentDB = client.db(dbName);
        const todoCol = currentDB.collection('notes');
        data = todoCol.findOne(query);
    } catch (e) {
        if (e) throw new Error(`${e} error in getOneNote`);
    }

    client.close();
    return data;
};

exports.getNote = async () => {
    let client = null;
    let tasks = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('notes');
        tasks = todoCol.find({}).toArray();
    } catch (e) {
        if (e) throw new Error(`${e.name} error in getNote`);
    }
    client.close();

    return tasks;
};

exports.addNote = async (notes) => {
    let client = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('notes');

        await todoCol.insertOne(notes);
    } catch (e) {
        if (e) throw new Error(`${e} error in addNote`);
    }
    client.close();
};

exports.updateNote = async (note) => {
    const query = {_id: new ObjectId(note.id)};

    let client = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('notes');

        await todoCol.updateOne(query, {$set: {title: note.title, description: note.description}});

    } catch (e) {
        if (e) throw new Error(`${e} error in updateNote`);
    }
    client.close();
};

exports.deleteNote = async (note) => {
    const query = {_id: new ObjectId(note.id)};
    let client = null;

    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('notes');
        await todoCol.deleteOne(query);
    } catch (e) {
        if (e) throw new Error(`${e.name} error in deleteNote`);
    }
    client.close();
};

exports.addLists = async list => {
    let client = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('lists');
        await todoCol.insertOne(list);
    } catch (e) {
        if (e) throw new Error(`${e.name} error in addLists`);
    }
    client.close();
};

exports.getList = async () => {
    let client = null;
    let tasks = null;
    try {
        client = await MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('lists');
        tasks = todoCol.find({}).toArray();
    } catch (e) {
        if (e) throw new Error(`${e.name} error in getList`);
    }

    client.close();

    return tasks;
};

exports.getOneList = async (id) => {
    const query = {_id: ObjectId(id)};
    let data = null;
    let client = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});

        const currentDB = client.db(dbName);
        const todoCol = currentDB.collection('lists');
        data = todoCol.findOne(query);
    } catch (e) {
        if (e) throw new Error(`${e} error in getOneList`);
    }

    client.close();
    return data;
};

exports.updateList = async (list) => {
    const query = {_id: new ObjectId(list.id)};

    let client = null;
    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('lists');

        await todoCol.updateOne(query, {$set: {classlist: list.classlist, title: list.title, text: list.text}});

    } catch (e) {
        if (e) throw new Error(`${e} error in updateList`);
    }
    client.close();
};

exports.updateCheckList = async list => {
    const query = {_id: new ObjectId(list.id)};
    let client = null;

    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('lists');

        await todoCol.updateOne(query, {$set: {classlist: list.classlist}});

    } catch (e) {
        if (e) throw new Error(`${e} error in updateCheckList`);
    }
    client.close();
};

exports.deleteList = async (list) => {
    const query = {_id: new ObjectId(list.id)};
    let client = null;

    try {
        client = await new MongoClient.connect(uri, {useNewUrlParser: true});
        const currentDb = client.db(dbName);
        const todoCol = currentDb.collection('lists');
        await todoCol.deleteOne(query);
    } catch (e) {
        if (e) throw new Error(`${e.name} error in deleteList`);
    }
    client.close();
};