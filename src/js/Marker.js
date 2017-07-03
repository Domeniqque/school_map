
export class Marker {
  constructor({map, icons}) {
    this.setMap(map)
    this.setIcons(icons)
  }

  /**
   * Set the Google Map opject of markers
   * @param {object} map Google Map object
   */
  setMap (map) {
    if (map === undefined || typeof map != 'object') {
      throw new Error('Map object not defined')
    }

    this._map = map
  }

  /**
   * Configure the type icons of the markers
   * @param {object} icons [description]
   */
  setIcons (icons = {}) {
    const DEFAULT = {
      default: {
        icon: undefined
      }
    }

    this._icons = Object.assign({}, DEFAULT, icons)
  }

  create (feature) {
    let icon = feature.type != undefined
        ? this._icons[feature.type].icon
        : undefined;

    new google.maps.Marker({
      position: feature.position,
      icon: icon,
      map: this._map,
      animation: google.maps.Animation.DROP,
      title: feature.title
    });
  }
}
