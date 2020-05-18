const mongoose = require('mongoose');
var moment = require('moment');
const Schema = mongoose.Schema;

//var now = moment();
const solicitudSchema = new Schema({
    document: String,
    name: String,
    phone: String,
    email: {type: String},
    year: String,
    status: String,
    date: {
        type: String, 
        default: () => moment().format("DD-MM-YYYY")
    }
})

const Solicitud = mongoose.model('Solicitud', solicitudSchema);
module.exports = Solicitud;