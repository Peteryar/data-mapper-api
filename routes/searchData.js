const express = require('express');
const { DataProvider } = require('../dataModel');
const asyncMiddleware = require('../middlewares/asyncMiddleware')

const router = express.Router();

router.get('/:providerId', asyncMiddleware(async (req, res) => {
    const dataProvider = await DataProvider.findOne({
        providerId: req.params.providerId,
    })
    .select("-_id -data._id -__v")



    if (!dataProvider) return res.status(400).send("providerId not found");

    let result;
    let queryCounter = 0;

    for (x in req.query) {
        queryCounter += 1
    }
    if (queryCounter === 0)
        result = dataProvider;
    if (queryCounter > 0 && queryCounter < 3)
        result = "Please provide all search requirement for data such as name, age and timestamp accurately!!"

    if(queryCounter === 3)result = analyseQueryData(dataProvider.data, req);

    res.send(result)
})

)

function analyseQueryData(queryData, req) {
    const data = {}
    let counter = 0;

    const getData = queryData.forEach(element => {
        if (element.name.toLowerCase() === req.query.name.toLowerCase())
            data.name = element.name;
        if (String(element.age) === req.query.age)
            data.age = element.age;
        if (String(element.timestamp) === req.query.timestamp)
            data.timestamp = element.timestamp;
    });

    if (data.name) counter += 1;
    if (data.age) counter += 1;
    if (data.timestamp) counter += 1

    if (counter === 3) {
        return data
    } else {
        return 'query parameters dont match any document, please check and try again!!'
    }

}



module.exports = router;