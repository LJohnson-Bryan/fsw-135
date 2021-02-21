const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
            type: Date,
            default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema);
