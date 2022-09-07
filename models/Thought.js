const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//not a seperate file but part of this one
const reactionsSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {toJSON: {
        getters: true
    } 
    }
);


const thoughtsSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Use a getter method to format the timestamp on query here? mongoose timestamp
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },

    reactions: [reactionsSchema]
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;