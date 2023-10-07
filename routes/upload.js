const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/" });
const { taskCollection } = require('../schema/taskSchema');
const { isUserLoggedIn } = require('./middlewares');

route.use(isUserLoggedIn);

route.post('/pic', upload.single('file'), async (req, res) => {
    const { taskTitle, taskBody } = req.body;

    console.log(req.file);
    console.log(req.files[0]);

    const newTask = await taskCollection.create({
        taskTitle, taskBody, pictureName: req.files[0].filename
    });

    res.send({
        isSuucessful: true, newTask
    });
});

module.exports = route;