const mongoose = require('mongoose');
const Joi = require('joi');

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    age: Number,
    timestamp: {
        type: Number,
        min: 10000000,
        max: 999999999999,
        required: true
    }
})

const Data = mongoose.model('Data', dataSchema)

const dataProviderSchema = new mongoose.Schema({
    providerId: {
        type: Number,
        min: 10000,
        max: 99999,
        required: true,
    },
    data: [dataSchema]
})

const DataProvider = mongoose.model('DataProvider', dataProviderSchema)

function validateData(data) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        age: Joi.number().required(),
        timestamp: Joi.number().required().min(10000000).max(99999999),
        providerId: Joi.number().min(10000).max(99999).required()
    }
    return Joi.validate(data, schema);
}

module.exports = { DataProvider, validateData, Data }