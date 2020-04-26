const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const data = require('./routes/newData');
const error = require('./middlewares/error');
const searchData = require('./routes/searchData');

const app = express();

let db = config.get('db');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to ${db}`))
    .catch(err => console.log(`unable to connect to ${db}`, err));


require('./prod')(app)

app.use(express.json());


app.use('/api/data', data);
app.use('/api/search', searchData)
app.use(error)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`lisening at port ${port}...`))