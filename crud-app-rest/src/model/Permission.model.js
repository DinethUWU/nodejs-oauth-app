const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{type:String},
    description:{type:String},
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Permission',schema);