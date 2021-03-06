import { Map } from './Map'
import { schools } from './../../mock'

const map = new Map({
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
  let features = schools.map((school) => {
    return {
      position: new google.maps.LatLng(school.latitude, school.longitude),
      type: 'school',
      title: school.descricao
    }
  })

  self.createMarkers(features)
})
