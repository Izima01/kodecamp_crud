const express = require('express');
const port = process.env.port || 4000;
require('dotenv').config();
const { connect } = require('mongoose');
const app = express();
const taskRoute = require('./routes/tasks');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const path = require('path');

connect(process.env.mongodbURL).then(() => {
    console.log("Connected successfully");
}).catch(err => {
    console.log('Not connecting because:', err)
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/tasks', taskRoute);
app.use('/v1/auth', authRoute);
app.use('/v1/upload', uploadRoute);

app.listen(port, () => {
    console.log("Listening on port", port);
});