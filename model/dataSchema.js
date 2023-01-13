const mongoose = require('mongoose');
const {Schema} = mongoose;


const dataSchema = new Schema({
    item: String,
    qty: Number,
    size: {
        h: Number,
        w: Number,
        uom: String,
    },
    status: String,
})

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;