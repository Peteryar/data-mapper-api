module.exports = function (routerHandler) {
    return async function (req, res) {
        try {
            await routerHandler(req, res)
        } catch (error) {
            console.log(error.message, error)
        }
    }
}