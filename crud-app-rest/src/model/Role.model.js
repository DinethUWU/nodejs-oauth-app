const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    _permissions: { type: [String]},
    description: { type: String},
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', schema);
