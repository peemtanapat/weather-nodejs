const request = require('request')

const generateGeocode = (address, callback) => {
    const url = getURLGeocode(address)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            return callback('Unable to connect to location services.')
        } else if (body && !body.features.length) {
            return callback('Unable to find location. Try again.')
        }

        const features = body.features
        const { place_name, center } = features[0]
        const latitude = center[1]
        const longtitude = center[0]

        const data = {
            latitude: latitude,
            longtitude: longtitude,
            location: place_name
        }
        return callback(null, data)
    })
}

function getURLGeocode(address) {
    const addressEncoded = encodeURIComponent(address)
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressEncoded}.json`
    const access_token = `access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    return `${endpoint}?${access_token}`
}
//  e.g. "https://api.mapbox.com/geocoding/v5/mapbox.places/bangkok.json?access_token=abc"

module.exports = { generateGeocode, getURLGeocode }
