
export class Marker {
  constructor({map, icons}) {
    this.setMap(map)
    this.setIcons(icons)
  }

  setMap (map) {
    if (map === undefined || typeof map != Object) {
      throw new Error('Map object not defined')
    }

    this._map = map
  }

  setIcons (icons) {
    const DEFAULT = {
      school: {
        icon: 'public/img/school.png'
      }
    }

    this._icons = Object.assign({}, DEFAULT, icons)
  }

  create (feature) {
    new google.maps.Marker({
      position: feature.position,
      icon: this._icons[feature.type].icon,
      map: this._map
    });
  }
}
