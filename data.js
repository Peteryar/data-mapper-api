const express = require('express');
const { DataProvider, validateData, Data } = require('./dataModel');
const asyncMiddleware = require('./middlewares/asyncMiddleware')

const router = express.Router()

router.post('/', asyncMiddleware(async (req, res) => {

    const { error } = validateData(req.body);
    if (error) return res.status(404).send(error[1].message);

    let dataProvider = await DataProvider.findOne({ providerId: req.body.providerId });

    if (!dataProvider) {
        dataProvider = new DataProvider({
            providerId: req.body.providerId,
            data: [new Data({ name: req.body.name, age: req.body.age })]
        })

        await dataProvider.save()
        res.send(dataProvider)
    } else {
        dataProvider.data.push({ name: req.body.name, age: req.body.age });

        await dataProvider.save()
        res.send(dataProvider)
    }
}))

router.get('/', asyncMiddleware(async (req, res) => {
    const dataProviders = await DataProvider.find()
        .select("-_id -data._id")

    res.send(dataProviders)
}))

router.get('/:providerId', asyncMiddleware(async (req, res) => {
    const dataProvider = await DataProvider.findOne({
        providerId: req.params.providerId,
    })

    if (!dataProvider) return res.status(400).send("providerId not found");

    let data = {}

    const getData = dataProvider.data.forEach(element => {
        // if (element.name === req.query.name) data.name = element.name;
        if (element.age === req.query.age) data.age = element.age;
        if (element.timestamp === req.query.timestamp) data.timestamp = element.timestamp;
    });

    console.log(data)
})
)

module.exports = router;