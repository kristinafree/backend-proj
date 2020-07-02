const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User'},
        bodyPart: Number,
        theme: String,
        price: Number,
        date: String,
        time: String,
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;