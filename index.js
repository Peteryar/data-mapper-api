const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const data = require('./data');
const error = require('./middlewares/error');

const db = config.get('db');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to ${db}`))
    .catch(err => console.log(`unable to connect to ${db}`));

const app = express();

app.use(express.json());

app.use('/dynamicdata.com/api/data', data)
app.use(error)

const port = process.env.port || 3000;

app.listen(port, () => console.log(`lisening at port ${port}...`))