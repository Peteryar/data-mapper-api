module.exports = function (routerHandler) {
    return async function (res, req) {
        try {
            await routerHandler(res, req)
        } catch (error) {
            console.log(error.message, error)
        }
    }
}