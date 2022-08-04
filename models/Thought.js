const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema (
    {
       thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: (momentVal) => moment(momentVal).format('MMM DD, YYYY [at] hh:mm a')
       },
       username: {
        type: String,
        required: true
       },
       reactions: [reactionSchema],
     
    },
    {
    toJSON: {
        getters: true,
      },
      id: false,
    }
);
thoughtSchema.virtual('reactCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;


