
module.exports = (client, model) => {

    let message = "Cache not started"
    let err = undefined

    function setError(_message, _err) {
        message = _message
        err = _err
    }

    client.on("ready", function () {
        try {
            client.set('test', 'test', 'EX', '1');
            client.get('test', function(err, value) {
                if (err)
                    return setError("Redis Error Occured", err)
                if (value === 'test')
                    setError("Redis Connection Success")
            })
        } catch (err) {
            return setError("Redis Error Occured", err2)
        }
    });
    
    client.on("error", function (err) {
        if (err.code === "ECONNREFUSED") {
            setError("Redis Connection Fail", err)
        } else if (err.code === "NOAUTH") {
            setError("Redis Authentification Fail", err)
        } else {
            setError("Redis Error Occured", err)
        }
    });
    
    client.on("reconnecting", function (options) {
        if (options.error) {
            setError("Redis Reconnection...", {
                code: options.error.code
            })    
        }
    });

    model.testConnection = (callback) => {
        callback(client.ready, message, err)
    }
}

