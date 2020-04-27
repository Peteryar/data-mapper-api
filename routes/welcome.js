const express = require('express');
const asyncMiddleware = require('../middlewares/asyncMiddleware')

const router = express.Router();

const readme = `
<div>
    <h5>Welcome to data mapper api by Agent Peter</h5>
    # data-mapper-api

<h4> hosted endpoint </h4>
<p>https://peter-data-mapper.herokuapp.com/api</p>
<p>you can create data with a post request to https://peter-data-mapper.herokuapp.com/api/data
Also get request to get all data</p>
<p>
you can create data with a post request to https://peter-data-mapper.herokuapp.com/api/data
Also get request to get all data
</p>
<p>
You can get specific data with provider id or addition querry parameters by sending 
a get request to https://peter-data-mapper.herokuapp.com/api/search?providerId?queryString

</p>

<h4>
# Getting started in local machine
</h4>

<p>
install dependencies by running npm install or
 yarn add depending on which you have in your machine or prefer.
</p>

<p>
Use postman and visit http://localhost/5000/api/com/data and make a post request by adding the following 
required fields in the body of your post request
<p>

<p>
# example of body of post request
endPoint http://localhost/5000/api/data
{
  providerId:number,
  name:"string",
  age:number,
  timeStamp : number
}</p>

<h4>
# Get all data
send a get request to http://localhost/5000/api/data</h4>

<p>
Get Provider data by sending a request to http://localhost/500/api/search/providerId
</p>

<p>
Get a specific data in a provider with the following query method 
http://localhost/500/api/search/ProviderId?name=value&age=value&timestamp=value
</p>



</div>
`

router.get('/api', asyncMiddleware(async (req, res) => {
    res.send(readme)
}))

module.exports = router
