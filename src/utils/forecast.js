const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dba771b4bb67da7e66a7d7055e5d281f/'+latitude+','+longitude+'?units=si'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to the weather service!', undefined)
        }else {
            try {
                callback(undefined, 
                    body.daily.data[0].summary + 
                    ' It is currently ' + body.currently.temperature + '° degrees out.' + 
                    ' The is a ' + body.currently.precipProbability + '% chance of rain.'
                    // {
                    //     temperature: response.body.currently.temperature,
                    //     precipProbability: response.body.currently.precipProbability,
                    //     forecast: response.body.daily.data[0].summary
                    // }
                )
            } catch (error) {
                callback(body.error, undefined)
            }
        }
    })
}

module.exports = forecast