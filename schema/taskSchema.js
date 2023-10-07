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
    },
    pictureName: {
        type: String,
        default: 'picture 1'
    }
}, { timestamps: true });

const taskCollection = mongoose.model('tasks', taskSchema);

module.exports = {
    taskCollection
};
