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
    let result = await DataProvider.find().select("-_id -data._id -__v")

    res.send(result)
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

    const data = {}
    let counter = 0;
    

    const getData = dataProvider.data.forEach(element => {
        if (element.name.toLowerCase() === req.query.name.toLowerCase())
            data.name = element.name;
        if (String(element.age) === req.query.age)
            data.age = element.age;
        if (String(element.timestamp) === req.query.timestamp)
            data.timestamp = element.timestamp;
    });

    function analyseData() {
        if (data.name) counter += 1;
        if (data.age) counter += 1;
        if (data.timestamp) counter += 1

        if (counter === 3) {
            return data
        } else {
            return 'query parameters dont match any document, please check and try again!!'
        }

    }

    
    

    const result = analyseData()

    res.send(result)
})

)

module.exports = router;