
module.exports = (client, model) => {

    model.testConnection = () => new Promise(resolve => {
        resolve({ result: true, message: "Hubspot No Test" })
    })

}
