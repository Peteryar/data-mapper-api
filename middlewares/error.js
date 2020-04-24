module.exports = function (err, req, res, next) {
    res.status(500).send('internal server erro')
    console.log(err.message, err);

    next()
}