const {Router } = require("express");
const route = Router();
const { taskCollection } = require('../schema/taskSchema');
const jwt = require("jsonwebtoken");
const { isUserLoggedIn, adminOnly } = require('./middlewares')

route.use(isUserLoggedIn);

route.get('/', async (req, res) => {
    const tasks = await taskCollection.find({ user: req.decoded.userId });
    res.json(tasks);
});

route.post('/', async (req, res) => {
    const { taskTitle, taskBody, isCompleted } = req.body;
    const exist = await taskCollection.findOne({ taskTitle: taskTitle });
    if (!exist) {
        const newTask = await taskCollection.create({
            taskTitle, taskBody, isCompleted, user: req.decoded.userId
        });
        return res.json({
            isRequestSuccessful: true, newTask
        });
    }
    if (exist) return res.json({
        isRequesSuccessful: false, message: "Task already exists"
    });
});

route.get('/find_by_id/:id', async (req, res) => {
    const task = await taskCollection.findById(req.params.id);
    res.json(task);
});

route.get('/find_by_title/:title', async (req, res) => {
    const task = await taskCollection.findOne({ taskTitle: req.params.title });
    if (!task) res.status(404).send("Task not found");
    res.send(task);
});

route.patch('/edit_task/:id', async (req, res) => {
    const { taskBody, taskTitle, isCompleted } = req.body;
    const updatedTask = await taskCollection.findByIdAndUpdate(req.params.id, {
        taskTitle, taskBody, isCompleted
    }, { new: true });

    if (!updatedTask) res.status(404).send("Task not found");
    res.json({
        message: "Task edited successfully", updatedTask
    });
});

route.delete('/delete_task/:id', async (req, res) => {
    const task = await taskCollection.findById(req.params.id);
    console.log(req.decoded.userId, task.user);
    if (req.decoded.userId != task.user) return res.status(401).send("Not your task.");

    await taskCollection.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfuly");
});

// Admin routes


route.get('/admin/all-tasks', adminOnly, async (req, res) => {
    const task = await taskCollection.find();
    res.json(task);
})

module.exports = route;