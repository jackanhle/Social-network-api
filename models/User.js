const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
       username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true,
       },
       email: {
        type: String,
        required: true,
        unique: true,
        match: [/[\w._%+-]+@[\w.-]+\.[a-zA-z]{2,4}/, "Enter valid email",]
       },
       thoughts: [
       {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
       }
       ],
   
       friends: [
       {
        type: Schema.Types.ObjectId,
        ref: 'User'

       }
    ],
},

       {
        toJSON: {
          getters: true,
        },
        id: false,
    }
    
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;