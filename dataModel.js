const mongoose = require('mongoose');
const Joi = require('joi');

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    age: Number,
    timestamp: { type: Date, default: Date.now }
})

const Data = mongoose.model('Data', dataSchema)

const dataProviderSchema = new mongoose.Schema({
    providerId: {
        type: String,
        minLength: 5,
        maxLength: 5,
        required: true,
    },
    data: [dataSchema]
})

const DataProvider = mongoose.model('DataProvider', dataProviderSchema)

function validateData(data) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        age: Joi.number().required(),
        providerId: Joi.string().min(5).max(5).required()
    }
    return Joi.validate(data, schema);
}

module.exports = { DataProvider, validateData, Data }