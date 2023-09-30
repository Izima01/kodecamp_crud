const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskBody: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, { timestamps: true });

const taskCollection = mongoose.model('tasks', taskSchema);

module.exports = {
    taskCollection
};
