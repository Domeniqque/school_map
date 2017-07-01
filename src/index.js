import { Map } from './Map'
import { schools } from './../mock'

let map = new Map({
  el: '#map',
  api_key: 'AIzaSyDsxBNJeFRZiQl7yb3uANsS9R--Gu4nEew',
  options: {
    center: {
      lat: -8.75956270,
      lng: -63.90944930
    }
  }
})

map.then((self) => {

  const features =  [{
    position: new google.maps.LatLng(-8.75956270, -63.90944930),
    type: 'school'
  }]

  self.createMarkers(features)
})
