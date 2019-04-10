const express = require('express');
const app = require('./app/index');

// const db = require('./config/db/db');
const port = process.env.PORT || 80;

app.listen(port);