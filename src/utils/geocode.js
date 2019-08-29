const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZW50d2lzdGxlb3giLCJhIjoiY2p6dmZ0MTloMHFoczNibWxoZnp2em9tcyJ9.R5366GZx345O7O927zlzRg&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to the geolocation service!', undefined)
        } else {
            try {
                if(body.features.length === 0){
                    callback('Unable to find location. Try another search', undefined)
                }else{
                    callback(undefined, {
                        latitude: body.features[0].center[1],
                        longitude: body.features[0].center[0],
                        location: body.features[0].place_name
                    })
                }
            } catch (error) {
                callback(body.message, undefined)
            }
        }
    }) 
}

module.exports = geocode