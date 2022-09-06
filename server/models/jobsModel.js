const mongoose = require('mongoose');

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
},{ timestamps: true } )

module.exports = mongoose.model('Job', jobSchema)
