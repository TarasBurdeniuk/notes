const { MongoClient } = require('mongodb');
class Database {
  constructor(url, name) {
    this._client = new MongoClient(url, { useNewUrlParser: true });
    this._db = null;
  }

  async connect(name) {

  }
}