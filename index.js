const express = require('express');
const port = process.env.port || 4000;
require('dotenv').config();
const { connect } = require('mongoose');
const app = express();
const taskRoute = require('./routes/tasks');
const authRoute = require('./routes/auth');

connect(process.env.mongodbURL).then(() => {
    console.log("Connected successfully");
}).catch(err => {
    console.log('Not connecting because:', err)
});

app.use(express.json());

app.use('/v1/tasks', taskRoute);
app.use('/v1/auth', authRoute);

app.listen(port, () => {
    console.log("Listening on port", port);
});