class Map {
  constructor ({el, api_key}) {

    if (el === undefined) {
      throw new Error('Element not defined!')
    }

    if (api_key === undefined) {
      throw new Error('Google Api key not defined!')
    }

    this._el = document.querySelector(el)
    this._api_key = api_key

    this._options = {
      zoom: 16,
      center: {
        lat: -33.91722,
        lng: 151.23064
      },
      mapTypeId: 'roadmap'
    }
  }

  /**
   * Draw google maps in the window
   * @return {void}
   */
  init () {
    this.createGoogleMaps()
          .then(() => {
            this.initGoogleMaps()
          }, () => {
            console.error("Não funfa :(");
          })
  }
  /**
   * Create a Google Maps Api source script and append it in body element
   *
   * @return {Promise}
   */
  createGoogleMaps () {
    return new Promise((resolve, reject) => {
      let gmap_src = document.createElement('script')
      gmap_src.defer = true
      gmap_src.async = true
      gmap_src.src = `https://maps.googleapis.com/maps/api/js?key=${this._api_key}`
      gmap_src.onload = resolve
      gmap_src.error = reject

      document.body.appendChild(gmap_src)
    })
  }

  /**
   * Create a new Google Maps Instance
   * @return {[type]} [description]
   */
  initGoogleMaps () {
    this.gmap = new google.maps.Map(this._el, this.options)
  }
  /**
   * Return the options of the Google Maps
   * @return {Object}
   */
  get options () {
    return {
      zoom: this._options.zoom,
      center: new google.maps.LatLng(this._options.center.lat, this._options.center.lng),
      mapTypeId: this._options.mapTypeId
    }
  }
}
