
module.exports = (model) => {

    model.testConnection = () => new Promise(resolve => {
        resolve({ result: true, message: "Http No Test" })
    })

}
