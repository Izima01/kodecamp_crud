const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    // console.log(req);
    res.send({response: 'Hello'});
});

app.get('/Ping', (req, res) => {
    res.send('Pong!!')
});

app.post('/movies', (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => {
    console.log('Listening on port 5000');
});