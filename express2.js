const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');

// creating middlewares
app.use((req, res, next) => {
    console.log(req.method);
    next();
});

// a route is contains the handler for a request
app.get('/hello', (req, res) => {
    res.send('Hello there');
});

app.post('/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    fs.appendFile('userDetails.txt', `userName: ${username}\npassword: ${password}`, (err) => {
        if (err) {
            res.send('There was an error with this request');
            return;
        }
        res.send(`User logged in. Welcome ${username}`);
    });
});

app.get('/users/:userName', (req, res) => {
    // console.log(req);
    res.send(req.params);

});

app.listen(port, () => {
    console.log('Listening on port ', port);
});
