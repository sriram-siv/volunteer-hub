import axios from 'axios'

const mapBoxGeoBase = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

export const reverseGeoCode = location => {
  return axios.get(`${mapBoxGeoBase}/${location.longitude},${location.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
}