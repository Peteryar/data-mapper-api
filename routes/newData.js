const express = require('express');
const { DataProvider, validateData, Data } = require('../dataModel');
const asyncMiddleware = require('../middlewares/asyncMiddleware')

const router = express.Router()

router.post('/', asyncMiddleware(async (req, res) => {

    const { error } = validateData(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let dataProvider = await DataProvider.findOne({ providerId: req.body.providerId });

    if (!dataProvider) {
        dataProvider = new DataProvider({
            providerId: req.body.providerId,
            data: [new Data({
                name: req.body.name,
                age: req.body.age,
                timestamp: req.body.timestamp
            })]
        })

        await dataProvider.save()
    } else {
        dataProvider.data.push({
            name: req.body.name,
            age: req.body.age,
            timestamp: req.body.timestamp
        });

        await dataProvider.save()
    }
    let result = await DataProvider.findOne({ providerId: req.body.providerId })
        .select("-_id -__v -data._id");

    res.send(result)
}))

router.get('/', asyncMiddleware(async (req, res) => {
    const dataProviders = await DataProvider.find()
        .select("-_id -data._id -__v")

    res.send(dataProviders)
}))

module.exports = router;