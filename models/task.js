const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'most provide name'],
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    compeleted: {
        type: Boolean,
        default: false,
    },
    dueDate:{
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        }
}, { 
    timestamps : true  // adds createdAt and updatedAt fields to the schema automatically when a document is created. 
})

const Task = mongoose.model('Task', taskSchema)

module.exports= Task