/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock__ = __webpack_require__(3);



const map = new __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* Map */]({
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
  let features = __WEBPACK_IMPORTED_MODULE_1__mock__["a" /* schools */].map((school) => {
    return {
      position: new google.maps.LatLng(school.latitude, school.longitude),
      type: 'school',
      title: school.descricao
    }
  })

  self.createMarkers(features)
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Marker__ = __webpack_require__(2);


class Map {
  constructor ({el, api_key, options}) {
    if (el === undefined) throw new Error('Element not defined!')

    if (api_key === undefined) throw new Error('Google Api key not defined!')

    this._el = document.querySelector(el)
    this._api_key = api_key
    this.setOptions(options)

    return this.init()
  }

  /**
   * Set the options of Google Maps
   * @param {Object} options
   */
  setOptions (options) {
    const DEFAULT = {
      zoom: 16,
      center: {
        lat: -33.91722,
        lng: 151.23064
      },
      mapTypeId: 'roadmap'
    }

    this._options = Object.assign({}, DEFAULT, options)
  }

  /**
   * Draw google maps in the window
   *
   * @return {Promise}
   */
  init () {
    return this.createGoogleMaps()
                  .then(() => this.initGoogleMaps())
                  .catch((err) => {
                    console.error(`Opa. Algo deu errado! ${err}`);
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
   *
   * @return {[type]} [description]
   */
  initGoogleMaps () {
    this.gmap = new google.maps.Map(this._el, this.options)

    return this
  }

  /**
   * Return the options of the Google Maps
   *
   * @return {Object}
   */
  get options () {
    return {
      zoom: this._options.zoom,
      center: new google.maps.LatLng(this._options.center.lat, this._options.center.lng),
      mapTypeId: this._options.mapTypeId
    }
  }
  /**
   * Create markers in map
   * @param  {array} features Array of markers
   * @return {void}
   */
  createMarkers (features) {
    const marker = new __WEBPACK_IMPORTED_MODULE_0__Marker__["a" /* Marker */]({
      map: this.gmap,
      icons: {
        school: {
          icon: 'build/img/school.png'
        }
      }
    })

    features.forEach((feature) => {
      marker.create(feature)
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Marker {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Marker;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const schools = [
  {
    'inep': '11043946',
    'descricao': 'AMA - ASSOC PAIS AMIGOS AUTISTA',
    'fone': '(69) 3213-2299',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11006722',
    'descricao': 'APAE  DE ARIQUEMES',
    'fone': '(69) 3535-3713',
    'latitude': '-9.90865480',
    'longitude': '-63.03174100'
  },
  {
    'inep': '11041307',
    'descricao': 'APAE DE ESPIGAO DO OESTE',
    'fone': '(69) 3481-3689',
    'latitude': '-11.52703700',
    'longitude': '-61.02014820'
  },
  {
    'inep': '11007966',
    'descricao': "APAE DE MACHADINHO D'OESTE",
    'fone': '(69) 3581-2220',
    'latitude': '-9.43242810',
    'longitude': '-62.00646810'
  },
  {
    'inep': '11046929',
    'descricao': 'APAE EDUCADORA DE PORTO VELHO',
    'fone': '(69) 3229-0415',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11048239',
    'descricao': 'APAE NOVA MAMORE',
    'fone': '(69) 3544-3262',
    'latitude': '-10.41066780',
    'longitude': '-65.33056180'
  },
  {
    'inep': '11033150',
    'descricao': 'APAE VILHENA',
    'fone': '(69) 3321-3034',
    'latitude': '-12.74093690',
    'longitude': '-60.11281130'
  },
  {
    'inep': '11006717',
    'descricao': 'ASS PESTALOZZI',
    'fone': '(69) 3541-4366',
    'latitude': '-10.79986680',
    'longitude': '-65.33610430'
  },
  {
    'inep': '11003294',
    'descricao': 'ASSOCIACAO PESTALOZZI',
    'fone': '(69) 3216-5983',
    'latitude': '-8.73840760',
    'longitude': '-63.89261050'
  },
  {
    'inep': '11025697',
    'descricao': 'CEEJA AIDA FIBIGER DE OLIVEIRA',
    'fone': '(69) 3441-0906',
    'latitude': '-11.43540280',
    'longitude': '-61.44936070'
  },
  {
    'inep': '11006757',
    'descricao': 'CEEJA ARIQUEMES',
    'fone': '(69) 3535-2627',
    'latitude': '-9.90839410',
    'longitude': '-63.03316900'
  },
  {
    'inep': '11034467',
    'descricao': 'CEEJA CARLOS DRUMOND DE ANDRADE',
    'fone': '(69) 3342-2245',
    'latitude': '-13.19958620',
    'longitude': '-60.81702090'
  },
  {
    'inep': '11021420',
    'descricao': 'CEEJA CECILIA MEIRELES',
    'fone': '(69) 3418-2456',
    'latitude': '-11.73127420',
    'longitude': '-62.32078040'
  },
  {
    'inep': '11028483',
    'descricao': 'CEEJA CEL JORGE TEIXEIRA DE OLIVEIRA',
    'fone': '(69) 3442-6168',
    'latitude': '-11.72388230',
    'longitude': '-61.78168620'
  },
  {
    'inep': '11011165',
    'descricao': 'CEEJA DE JARU',
    'fone': '(69) 3521-5576',
    'latitude': '-10.45243550',
    'longitude': '-62.47962870'
  },
  {
    'inep': '11029510',
    'descricao': 'CEEJA DOMINGOS VONA',
    'fone': '(69) 3434-2800',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11037237',
    'descricao': 'CEEJA DONIZETE ROMUALDO DA SILVA',
    'fone': '(69) 8500-2848',
    'latitude': '-11.51930070',
    'longitude': '-61.00871180'
  },
  {
    'inep': '11006013',
    'descricao': 'CEEJA DR CLAUDIO FIALHO',
    'fone': '(69) 3541-7136',
    'latitude': '-10.79277520',
    'longitude': '-65.34397300'
  },
  {
    'inep': '11040319',
    'descricao': 'CEEJA ENALDO LUCAS DE OLIVEIRA',
    'fone': '(69) 3413-2286',
    'latitude': '-11.12528488',
    'longitude': '-62.36994784'
  },
  {
    'inep': '11023023',
    'descricao': 'CEEJA EUCLIDES DA CUNHA',
    'fone': '(69) 3412-2223',
    'latitude': '-11.35438460',
    'longitude': '-62.28599530'
  },
  {
    'inep': '11022256',
    'descricao': 'CEEJA GETULIO VARGAS',
    'fone': '(69) 3642-1624',
    'latitude': '-11.69854420',
    'longitude': '-62.71840080'
  },
  {
    'inep': '11031441',
    'descricao': 'CEEJA GLICERIA MARIA OLIVEIRA CRIVELLI',
    'fone': '(69) 3451-2572',
    'latitude': '-11.67440200',
    'longitude': '-61.18651510'
  },
  {
    'inep': '11049413',
    'descricao': 'CEEJA IZILDINHA MARIN DA SILVA DOS SANTOS',
    'fone': '(69) 3252-2251',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11005386',
    'descricao': 'CEEJA JOSE ALVES DE ALMEIDA',
    'fone': '(69) 8432-5379',
    'latitude': '-12.43951730',
    'longitude': '-64.24028430'
  },
  {
    'inep': '11024275',
    'descricao': 'CEEJA LUIZ VAZ DE CAMOES',
    'fone': '(69) 3641-2656',
    'latitude': '-11.93083770',
    'longitude': '-61.99076470'
  },
  {
    'inep': '11017856',
    'descricao': 'CEEJA MARECHAL RONDON',
    'fone': '(69) 3471-1671',
    'latitude': '-11.16248340',
    'longitude': '-61.90504700'
  },
  {
    'inep': '11041749',
    'descricao': 'CEEJA PAULO FREIRE',
    'fone': '(69) 3343-2202',
    'latitude': '-12.99751170',
    'longitude': '-60.94518210'
  },
  {
    'inep': '11037601',
    'descricao': 'CEEJA PE MORETTI',
    'fone': '(69) 3216-5906',
    'latitude': '-8.75473040',
    'longitude': '-63.89910950'
  },
  {
    'inep': '11016230',
    'descricao': 'CEEJA PROF ANTONIO DE ALMEIDA',
    'fone': '(69) 3461-2847',
    'latitude': '-10.71741460',
    'longitude': '-62.24891540'
  },
  {
    'inep': '11003839',
    'descricao': 'CEEJA PROF DORALICE SALES CAVALCANTE',
    'fone': '(69) 3544-3063',
    'latitude': '-10.41232660',
    'longitude': '-65.33252120'
  },
  {
    'inep': '11046902',
    'descricao': 'CEEJA PROFESSOR EDSON DUARTE LOPES',
    'fone': '(69) 3463-2283',
    'latitude': '-11.03226130',
    'longitude': '-62.67243860'
  },
  {
    'inep': '11046856',
    'descricao': 'CEEJA PROFESSORA BARBARA CONCEICAO DOS REIS',
    'fone': '(69) 3435-2270',
    'latitude': '-11.69654840',
    'longitude': '-61.99565970'
  },
  {
    'inep': '11033924',
    'descricao': 'CEEJA SEIS DE JULHO',
    'fone': '(69) 3345-2466',
    'latitude': '-13.49427820',
    'longitude': '-60.54391350'
  },
  {
    'inep': '11047577',
    'descricao': 'CEEJA SILVIO VIANA LOURO',
    'fone': '(69) 3621-2027',
    'latitude': '-12.06196475',
    'longitude': '-63.56939167'
  },
  {
    'inep': '11035099',
    'descricao': 'CEEJA TANCREDO DE ALMEIDA NEVES',
    'fone': '(69) 3341-2355',
    'latitude': '-13.11982108',
    'longitude': '-60.54698340'
  },
  {
    'inep': '11015446',
    'descricao': 'CEEJA TERESA MITSUKO TUSTUMI',
    'fone': '(69) 3423-4156',
    'latitude': '-10.87857500',
    'longitude': '-61.92782230'
  },
  {
    'inep': '11033193',
    'descricao': 'CEEJA VILHENA',
    'fone': '(69) 3321-2708',
    'latitude': '-12.73267560',
    'longitude': '-60.12794130'
  },
  {
    'inep': '11083808',
    'descricao': 'CENTRO DE EDUCACAO TECNICO PROFISSIONAL NA AREA DE SAUDE DE RONDONIA',
    'fone': '(69) 3216-7307',
    'latitude': '-8.74794720',
    'longitude': '-63.89182600'
  },
  {
    'inep': '11037903',
    'descricao': 'CENTRO EDUCACIONAL MARIA DE NAZARE',
    'fone': '(69) 3227-8288',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11007982',
    'descricao': 'CENTRO ESTADUAL DE EDUCAÇÃO DE JOVENS E ADULTOS PAULO FREIRE',
    'fone': '(69) 3581-2020',
    'latitude': '-9.42540458',
    'longitude': '-61.99846062'
  },
  {
    'inep': '11058803',
    'descricao': 'CENTRO ESTADUAL DE EJA VALE DO GUAPORE',
    'fone': '(69) 3623-2519',
    'latitude': '-10.87676880',
    'longitude': '-61.95212160'
  },
  {
    'inep': '11028440',
    'descricao': 'CER- CENTRO EDUCACIONAL DE ROLIM DE MOUR',
    'fone': '(69) 3442-1473',
    'latitude': '-11.72885810',
    'longitude': '-61.78374330'
  },
  {
    'inep': '11049430',
    'descricao': 'COL TIRADENTES PM JACI PARANA',
    'fone': '(69) 99900-2579',
    'latitude': '-8.78544290',
    'longitude': '-63.86316730'
  },
  {
    'inep': '11000970',
    'descricao': 'DUQUE DE CAXIAS',
    'fone': '(69) 3216-5915',
    'latitude': '-8.75909580',
    'longitude': '-63.90964790'
  },
  {
    'inep': '11005475',
    'descricao': 'E E E F M CAMPOS SALES',
    'fone': '(69) 3621-2196',
    'latitude': '-12.06568470',
    'longitude': '-63.56684750'
  },
  {
    'inep': '11005041',
    'descricao': 'E E E F M CARLOS DRUMMOND DE ANDRADE',
    'fone': '(69) 99216-5665',
    'latitude': '-8.79529130',
    'longitude': '-63.70957860'
  },
  {
    'inep': '11033649',
    'descricao': 'E E E F M MARIA ARLETE TOLEDO',
    'fone': '(69) 3322-1155',
    'latitude': '-12.73233352',
    'longitude': '-60.11289418'
  },
  {
    'inep': '11045914',
    'descricao': 'E E E F M MARIA DE ABREU BIANCO',
    'fone': '(69) 3238-2567',
    'latitude': '-10.20679460',
    'longitude': '-63.83718500'
  },
  {
    'inep': '11000910',
    'descricao': 'E E E F SANTA MARCELINA MARCELLO CANDIA',
    'fone': '(69) 4101-4011',
    'latitude': '-8.79334675',
    'longitude': '-63.73691112'
  },
  {
    'inep': '11036486',
    'descricao': 'E E E M DR OSWALDO PIANA',
    'fone': '(69) 8436-9901',
    'latitude': '-12.99651450',
    'longitude': '-60.95025770'
  },
  {
    'inep': '11047208',
    'descricao': 'E E E M JOVEM GONCALVES VILELA',
    'fone': '(69) 3423-1970',
    'latitude': '-10.86814940',
    'longitude': '-61.96870460'
  },
  {
    'inep': '11034459',
    'descricao': 'E.E ESPERIAL MAJOR OSWALDO',
    'fone': '(69) 3342-2773',
    'latitude': '-13.18463100',
    'longitude': '-60.82253680'
  },
  {
    'inep': '11042028',
    'descricao': 'E.E.E.F.M. PROFESSORA ELVANDAS MARIA DE SIQUEIRA',
    'fone': '(69) 3238-2590',
    'latitude': '-10.20327170',
    'longitude': '-63.82773690'
  },
  {
    'inep': '11000023',
    'descricao': 'EEEE ABNAEL MACHADO DE LIMA - CENE',
    'fone': '(69) 3226-4680',
    'latitude': '-8.75825890',
    'longitude': '-63.85425070'
  },
  {
    'inep': '11013311',
    'descricao': 'EEEF 13 DE MAIO',
    'fone': '(69) 3416-4862',
    'latitude': '-10.86191280',
    'longitude': '-61.97875380'
  },
  {
    'inep': '11000376',
    'descricao': 'EEEF 21 DE ABRIL',
    'fone': '(69) 3229-2243',
    'latitude': '-8.74987450',
    'longitude': '-63.89137250'
  },
  {
    'inep': '11022060',
    'descricao': 'EEEF ABILIO NETTO BORGES',
    'fone': '(69) 3418-3167',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11005890',
    'descricao': 'EEEF ABRAAO KOOP',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11008008',
    'descricao': 'EEEF ALBERTO NEPOMUCENO',
    'fone': '(69) 3581-2478',
    'latitude': '-9.42732100',
    'longitude': '-62.00571620'
  },
  {
    'inep': '11006846',
    'descricao': 'EEEF ALBINA MARCIÓ SORDI',
    'fone': '(69) 3535-2645',
    'latitude': '-9.90284140',
    'longitude': '-63.04383510'
  },
  {
    'inep': '11022230',
    'descricao': 'EEEF ALEXANDRE DE GUSMAO',
    'fone': '(69) 98445-5543',
    'latitude': '-11.72850870',
    'longitude': '-62.33087980'
  },
  {
    'inep': '11005912',
    'descricao': 'EEEF ALEXANDRINA DO NASCIMENTO GOMES',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11005947',
    'descricao': 'EEEF ALMIRANTE TAMANDARE',
    'fone': '(69) 3541-7060',
    'latitude': '-10.76473090',
    'longitude': '-65.32270520'
  },
  {
    'inep': '11040769',
    'descricao': 'EEEF AMONDAWA',
    'fone': '(69) 99997-5103',
    'latitude': '-11.02891230',
    'longitude': '-62.67147750'
  },
  {
    'inep': '11031549',
    'descricao': 'EEEF ANISIO SERRAO DE CARVALHO',
    'fone': '(69) 3451-4406',
    'latitude': '-11.67410860',
    'longitude': '-61.18426010'
  },
  {
    'inep': '11017988',
    'descricao': 'EEEF APOLONIA ROSSI JAVARINI',
    'fone': '',
    'latitude': '-11.16937550',
    'longitude': '-61.89913820'
  },
  {
    'inep': '11037393',
    'descricao': 'EEEF AYRTON SENNA ',
    'fone': '(69) 3581-2013',
    'latitude': '-9.41594720',
    'longitude': '-62.00064850'
  },
  {
    'inep': '11000597',
    'descricao': 'EEEF BELA VISTA',
    'fone': '(69) 99204-9047',
    'latitude': '-8.79860120',
    'longitude': '-63.89202030'
  },
  {
    'inep': '11000651',
    'descricao': 'EEEF BOM JESUS',
    'fone': '(69) 3225-1512',
    'latitude': '-8.76550380',
    'longitude': '-63.87528770'
  },
  {
    'inep': '11031700',
    'descricao': 'EEEF BOM SUCESSO',
    'fone': '(69) 3451-6285',
    'latitude': '-11.65312410',
    'longitude': '-61.18392860'
  },
  {
    'inep': '11003154',
    'descricao': 'EEEF BRANCA DE NEVE',
    'fone': '(69) 3223-1754',
    'latitude': '-8.76144100',
    'longitude': '-63.91136260'
  },
  {
    'inep': '11005980',
    'descricao': 'EEEF CAP GODOY',
    'fone': '(69) 3541-7121',
    'latitude': '-10.78973790',
    'longitude': '-65.33161330'
  },
  {
    'inep': '11003162',
    'descricao': 'EEEF CASA DE DAVI',
    'fone': '(69) 3225-8261',
    'latitude': '-8.74411330',
    'longitude': '-63.88098000'
  },
  {
    'inep': '11035056',
    'descricao': 'EEEF CASTRO ALVES',
    'fone': '(69) 3342-2179',
    'latitude': '-13.18902360',
    'longitude': '-60.82158950'
  },
  {
    'inep': '11035250',
    'descricao': 'EEEF CECILIA MEIRELES',
    'fone': '(69) 3322-1562',
    'latitude': '-13.10810400',
    'longitude': '-60.55776180'
  },
  {
    'inep': '11034610',
    'descricao': 'EEEF CEL JORGE TEIXEIRA DE OLIVEIRA',
    'fone': '(69) 3342-3060',
    'latitude': '-13.19285690',
    'longitude': '-60.81479490'
  },
  {
    'inep': '11034050',
    'descricao': 'EEEF CHICO MENDES',
    'fone': '(69) 3345-2539',
    'latitude': '-13.49466290',
    'longitude': '-60.54252930'
  },
  {
    'inep': '11013818',
    'descricao': 'EEEF CORA CORALINA',
    'fone': '(69) 3424-1679',
    'latitude': '-10.88414400',
    'longitude': '-61.91200290'
  },
  {
    'inep': '11002441',
    'descricao': 'EEEF CORONEL CARLOS ALOYSIO WEBER',
    'fone': '(69) 3216-5019',
    'latitude': '-8.78006900',
    'longitude': '-63.91074760'
  },
  {
    'inep': '11048140',
    'descricao': 'EEEF CUSTODIO GABRIEL FILHO',
    'fone': '(69) 3534-3254',
    'latitude': '-9.71777400',
    'longitude': '-63.31636070'
  },
  {
    'inep': '11022450',
    'descricao': 'EEEF DEONILDO CARAGNATTO',
    'fone': '(69) 3642-1121',
    'latitude': '-11.68412360',
    'longitude': '-62.71322740'
  },
  {
    'inep': '11033428',
    'descricao': 'EEEF DEPUTADO GENIVAL NUNES DA COSTA',
    'fone': '(69) ',
    'latitude': '-12.74140310',
    'longitude': '-60.13045660'
  },
  {
    'inep': '11042842',
    'descricao': 'EEEF DIDIMO GRACILIANO DE OLIVEIRA',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11036192',
    'descricao': 'EEEF DISNEYLANDIA',
    'fone': '(69) 8463-5673',
    'latitude': '-12.99861140',
    'longitude': '-60.94602910'
  },
  {
    'inep': '11042710',
    'descricao': 'EEEF DJAI URU EU WAU WAU',
    'fone': '(69) 3521-2486',
    'latitude': '-10.52720660',
    'longitude': '-62.64607620'
  },
  {
    'inep': '11013907',
    'descricao': 'EEEF DR LOURENCO PEREIRA LIMA',
    'fone': '(69) 3424-9433',
    'latitude': '-10.90203670',
    'longitude': '-61.89851950'
  },
  {
    'inep': '11006048',
    'descricao': 'EEEF DURVALINA ESTILBEM DE OLIVEIRA',
    'fone': '(69) 3541-2051',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11024682',
    'descricao': 'EEEF EURIDICE LOPES PEDROSO',
    'fone': '(69) 3641-2015',
    'latitude': '-11.92796430',
    'longitude': '-62.01297910'
  },
  {
    'inep': '11027690',
    'descricao': 'EEEF FERNANDA SOUZA DE PAULA',
    'fone': '(69) 3481-2249',
    'latitude': '-11.52824914',
    'longitude': '-61.01143599'
  },
  {
    'inep': '11041773',
    'descricao': 'EEEF FLORESTA MAIA',
    'fone': '(69) 3252-1495',
    'latitude': '-9.77109520',
    'longitude': '-66.35604510'
  },
  {
    'inep': '11034696',
    'descricao': 'EEEF FLORIANO PEIXOTO',
    'fone': '(69) 3342-2008',
    'latitude': '-13.19334200',
    'longitude': '-60.81849760'
  },
  {
    'inep': '11019743',
    'descricao': 'EEEF FLORIZEL LAMEGO FERRARI',
    'fone': '',
    'latitude': '-11.03138150',
    'longitude': '-62.66508070'
  },
  {
    'inep': '11045906',
    'descricao': 'EEEF FRANCISCO JOSE CHIQUILITO ERSE',
    'fone': '(69) 3238-2453',
    'latitude': '-10.19466630',
    'longitude': '-63.83296810'
  },
  {
    'inep': '11001097',
    'descricao': 'EEEF FRANKLIN ROOSEVELT',
    'fone': '(69) 3221-5498',
    'latitude': '-8.77525200',
    'longitude': '-63.90914990'
  },
  {
    'inep': '11026464',
    'descricao': 'EEEF FREI CANECA',
    'fone': '(69) 3441-2195',
    'latitude': '-11.43467430',
    'longitude': '-61.45668610'
  },
  {
    'inep': '11032030',
    'descricao': 'EEEF FREI SILVESTRE BIZZOTTO',
    'fone': '(69) 3451-8781',
    'latitude': '-11.67895550',
    'longitude': '-61.16525830'
  },
  {
    'inep': '11005858',
    'descricao': 'EEEF GENERAL SAMPAIO',
    'fone': '(69) 3651-2272',
    'latitude': '-12.43802740',
    'longitude': '-64.22668620'
  },
  {
    'inep': '11005610',
    'descricao': 'EEEF GOMES CARNEIRO',
    'fone': '(69) 3651-2258',
    'latitude': '-12.44097860',
    'longitude': '-64.22847620'
  },
  {
    'inep': '11034777',
    'descricao': 'EEEF GOV JERONIMO GARCIA SANTANA',
    'fone': '(69) 3342-2941',
    'latitude': '-13.18739870',
    'longitude': '-60.81735490'
  },
  {
    'inep': '11001810',
    'descricao': 'EEEF GOV PAULO NUNES LEAL',
    'fone': '',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11035420',
    'descricao': 'EEEF GOVERNADOR ANGELO ANGELIN',
    'fone': '(69) 3341-4678',
    'latitude': '-13.12785450',
    'longitude': '-60.54897830'
  },
  {
    'inep': '11001160',
    'descricao': 'EEEF HEITOR VILLA LOBOS',
    'fone': '(69) 3228-2560',
    'latitude': '-8.79590210',
    'longitude': '-63.86599290'
  },
  {
    'inep': '11001178',
    'descricao': 'EEEF HELIO NEVES BOTELHO',
    'fone': '(69) 3228-5913',
    'latitude': '-8.79738700',
    'longitude': '-63.88513620'
  },
  {
    'inep': '11014075',
    'descricao': 'EEEF INACIO DE LOYOLA',
    'fone': '(69) 3428-2087',
    'latitude': '-11.06904048',
    'longitude': '-62.00963234'
  },
  {
    'inep': '11052201',
    'descricao': 'EEEF INDIGENA ABYA',
    'fone': '(69) ',
    'latitude': '-9.90632735',
    'longitude': '-63.02552038'
  },
  {
    'inep': '11044934',
    'descricao': 'EEEF INDIGENA JUPAU',
    'fone': '(69) 3521-2558',
    'latitude': '-10.43222350',
    'longitude': '-62.47929210'
  },
  {
    'inep': '11047259',
    'descricao': 'EEEF INDIGENA JUPAU 621',
    'fone': '(69) 3521-2645',
    'latitude': '-10.52720660',
    'longitude': '-62.64607620'
  },
  {
    'inep': '11045140',
    'descricao': 'EEEF INDIGENA JUPAU 623',
    'fone': '(69) 3521-2558',
    'latitude': '-10.52720660',
    'longitude': '-62.64607620'
  },
  {
    'inep': '11045132',
    'descricao': 'EEEF INDIGENA JUPAU ALTO JAMARI',
    'fone': '(69) 3521-2558',
    'latitude': '-10.43222350',
    'longitude': '-62.47929210'
  },
  {
    'inep': '11048441',
    'descricao': 'EEEF IRMA DOROTHY MAE STANG',
    'fone': '(69) 9957-3504',
    'latitude': '-11.27230906',
    'longitude': '-62.13085927'
  },
  {
    'inep': '11034750',
    'descricao': 'EEEF IRMA DULCE',
    'fone': '(69) 3342-3275',
    'latitude': '-13.19104880',
    'longitude': '-60.80655620'
  },
  {
    'inep': '11038055',
    'descricao': 'EEEF ITARAP YAMORATXI',
    'fone': '(69) 3423-5317',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11004894',
    'descricao': 'EEEF JAIME BARCESSAT',
    'fone': '(69) 99202-2527',
    'latitude': '-8.79790990',
    'longitude': '-63.70882130'
  },
  {
    'inep': '11001240',
    'descricao': 'EEEF JANIO DA SILVA QUADROS',
    'fone': '(69) 3214-5588',
    'latitude': '-8.77158890',
    'longitude': '-63.82128430'
  },
  {
    'inep': '11014172',
    'descricao': 'EEEF JARDIM DOS MIGRANTES',
    'fone': '(69) 3422-3270',
    'latitude': '-10.87811900',
    'longitude': '-61.96724490'
  },
  {
    'inep': '11027762',
    'descricao': 'EEEF JERRIS ADRIANI TURATTI',
    'fone': '(69) 3481-3366',
    'latitude': '-11.53071390',
    'longitude': '-61.00978480'
  },
  {
    'inep': '11040882',
    'descricao': 'EEEF JOAO FRANCISCO CORREIA',
    'fone': '(69) 3231-2429',
    'latitude': '-9.17851730',
    'longitude': '-63.18428730'
  },
  {
    'inep': '11017023',
    'descricao': 'EEEF JOAQUIM NABUCO',
    'fone': '(69) 3461-3768',
    'latitude': '-10.72726900',
    'longitude': '-62.25993710'
  },
  {
    'inep': '11046937',
    'descricao': 'EEEF JORGE VICENTE SALAZAR DOS SANTOS',
    'fone': '(69) 3227-3956',
    'latitude': '-8.79479060',
    'longitude': '-63.87491540'
  },
  {
    'inep': '11006234',
    'descricao': 'EEEF JOSIAS BATISTA DE OLIVEIRA',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11035544',
    'descricao': 'EEEF JULIETA VILELA VELOZO',
    'fone': '(69) 3341-1471',
    'latitude': '-13.11581982',
    'longitude': '-60.55434465'
  },
  {
    'inep': '11045922',
    'descricao': 'EEEF KAIBU - I',
    'fone': '(69) 3252-1495',
    'latitude': '-9.77109520',
    'longitude': '-66.35604510'
  },
  {
    'inep': '11045108',
    'descricao': 'EEEF KURANA KAXARARI',
    'fone': '(69) 3252-1495',
    'latitude': '-9.77109520',
    'longitude': '-66.35604510'
  },
  {
    'inep': '11055600',
    'descricao': 'EEEF LUIZ SOARES DE CASSIA',
    'fone': '(69) 3214-9886',
    'latitude': '-8.75352900',
    'longitude': '-63.86758100'
  },
  {
    'inep': '11014830',
    'descricao': 'EEEF M PROF EDILCE DOS SANTOS FREITAS',
    'fone': '(69) 3423-0664',
    'latitude': '-10.85708040',
    'longitude': '-61.96891310'
  },
  {
    'inep': '11037857',
    'descricao': 'EEEF MAHUGUVEHY',
    'fone': '(69) 3422-2498',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11037989',
    'descricao': 'EEEF MALOJ KAR GAVIAO',
    'fone': '(69) 3423-5317',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11041846',
    'descricao': 'EEEF MANUM ORO EO',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11006293',
    'descricao': 'EEEF MARECHAL RONDON',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11029749',
    'descricao': 'EEEF MARECHAL RONDON',
    'fone': '(69) 3434-2277',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11001526',
    'descricao': 'EEEF MARIA CARMOSINA PINHEIRO',
    'fone': '(69) 3226-2975',
    'latitude': '-8.75768160',
    'longitude': '-63.84055530'
  },
  {
    'inep': '11029099',
    'descricao': 'EEEF MARIA COMANDOLLI LIRA',
    'fone': '(69) 3442-3987',
    'latitude': '-11.70897890',
    'longitude': '-61.76284650'
  },
  {
    'inep': '11027878',
    'descricao': 'EEEF MARIA LOURENCO CASSIANO',
    'fone': '(69) 3484-1068',
    'latitude': '-11.50426216',
    'longitude': '-61.13021199'
  },
  {
    'inep': '11001550',
    'descricao': 'EEEF MARIANA',
    'fone': '',
    'latitude': '-8.77163380',
    'longitude': '-63.82421970'
  },
  {
    'inep': '11033398',
    'descricao': 'EEEF MARIZETI MENDES DE OLIVEIRA',
    'fone': '(69) 3322-3866',
    'latitude': '-12.74140310',
    'longitude': '-60.13045660'
  },
  {
    'inep': '11023430',
    'descricao': 'EEEF MONTE ALEGRE',
    'fone': '(69) 3412-2764',
    'latitude': '-11.34808810',
    'longitude': '-62.28777000'
  },
  {
    'inep': '11029161',
    'descricao': 'EEEF MONTEIRO LOBATO',
    'fone': '(69) 3442-2597',
    'latitude': '-11.71461836',
    'longitude': '-61.78529153'
  },
  {
    'inep': '11003197',
    'descricao': 'EEEF MUNDO MAGICO',
    'fone': '(69) ',
    'latitude': '-8.74487400',
    'longitude': '-63.85482640'
  },
  {
    'inep': '11001666',
    'descricao': 'EEEF NACOES UNIDAS',
    'fone': '(69) 3221-9295',
    'latitude': '-8.74433080',
    'longitude': '-63.90468500'
  },
  {
    'inep': '11012382',
    'descricao': 'EEEF NILTON OLIVEIRA DE ARAUJO',
    'fone': '(69) 99246-9552',
    'latitude': '-10.43222350',
    'longitude': '-62.47929210'
  },
  {
    'inep': '11001712',
    'descricao': 'EEEF NOSSA SENHORA DAS GRACAS',
    'fone': '(69) 3224-6857',
    'latitude': '-8.76801250',
    'longitude': '-63.89339080'
  },
  {
    'inep': '11003200',
    'descricao': 'EEEF NOSSA SENHORA DO AMPARO',
    'fone': '(69) 3225-4331',
    'latitude': '-8.76062170',
    'longitude': '-63.86484570'
  },
  {
    'inep': '11026839',
    'descricao': 'EEEF NOSSA SRA DO CARMO',
    'fone': '(69) 3441-0670',
    'latitude': '-11.43418390',
    'longitude': '-61.45894230'
  },
  {
    'inep': '11014636',
    'descricao': 'EEEF OSVALDO PIANA',
    'fone': '(69) 3424-3793',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11038020',
    'descricao': 'EEEF PAGA PENA',
    'fone': '(69) 3422-2498',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11037997',
    'descricao': 'EEEF PAJ GAP',
    'fone': '(69) 3422-2498',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11045728',
    'descricao': 'EEEF PASAV ADOH',
    'fone': '(69) 3422-2498',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11018720',
    'descricao': 'EEEF PAU BRASIL',
    'fone': '(69)',
    'latitude': '-11.16937550',
    'longitude': '-61.89913820'
  },
  {
    'inep': '11006358',
    'descricao': 'EEEF PAUL HARRIS',
    'fone': '(69) 3541-7150',
    'latitude': '-10.77745950',
    'longitude': '-65.33189180'
  },
  {
    'inep': '11033576',
    'descricao': 'EEEF PAULO FREIRE',
    'fone': '(69) 3321-3786',
    'latitude': '-12.69860590',
    'longitude': '-60.12202580'
  },
  {
    'inep': '11001844',
    'descricao': 'EEEF PE MARIO CASTAGNA',
    'fone': '(69) 3229-9225',
    'latitude': '-8.78507770',
    'longitude': '-63.89689150'
  },
  {
    'inep': '11028033',
    'descricao': 'EEEF PICHUVY CINTA LARGA',
    'fone': '(69) 3481-2781',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11042923',
    'descricao': 'EEEF PIN KARIPUNA',
    'fone': '(69) 3226-5920',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11006412',
    'descricao': 'EEEF POSCIDONIO BASTOS',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11035790',
    'descricao': 'EEEF PREFEITO MARCOS DONADON',
    'fone': '(69) 3341-3686',
    'latitude': '-13.11840960',
    'longitude': '-60.53488540'
  },
  {
    'inep': '11006420',
    'descricao': 'EEEF PRESIDENTE EURICO GASPAR DUTRA',
    'fone': '(69) 3543-1003',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11001909',
    'descricao': 'EEEF PRINCESA IZABEL',
    'fone': '(69) 3225-9341',
    'latitude': '-8.78821500',
    'longitude': '-63.90046150'
  },
  {
    'inep': '11014806',
    'descricao': 'EEEF PROF CARMEM ROCHA BORGES',
    'fone': '(69) 3421-6030',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11002000',
    'descricao': 'EEEF PROF ELOISA BENTES RAMOS',
    'fone': '(69) 3222-0762',
    'latitude': '-8.74855640',
    'longitude': '-63.86583850'
  },
  {
    'inep': '11000201',
    'descricao': 'EEEF PROF HERBERT DE ALENCAR',
    'fone': '(69) 3212-3104',
    'latitude': '-8.76457550',
    'longitude': '-63.87762850'
  },
  {
    'inep': '11017430',
    'descricao': 'EEEF PROF MARGARIDA CUSTODIO DE SOUZA',
    'fone': '(69) 3461-1029',
    'latitude': '-10.60083310',
    'longitude': '-62.30958330'
  },
  {
    'inep': '11048018',
    'descricao': 'EEEF PROF MARIA CONCEICAO DE SOUZA',
    'fone': '(69) 3581-3704',
    'latitude': '-9.43076780',
    'longitude': '-61.99430090'
  },
  {
    'inep': '11001992',
    'descricao': 'EEEF PROF ROBERTO DUARTE PIRES',
    'fone': '(69) 3222-7060',
    'latitude': '-8.74491250',
    'longitude': '-63.86278560'
  },
  {
    'inep': '11047224',
    'descricao': 'EEEF PROFESSOR LUIZ CARLOS PAULA ASSIS',
    'fone': '(69) 3322-6293',
    'latitude': '-12.73719720',
    'longitude': '-60.11085580'
  },
  {
    'inep': '11005769',
    'descricao': 'EEEF RAIMUNDO DE OLIVEIRA MESQUITA',
    'fone': '(69) 3651-2506',
    'latitude': '-12.42862770',
    'longitude': '-64.24617440'
  },
  {
    'inep': '11022205',
    'descricao': 'EEEF ROCHA POMBO',
    'fone': '(69) 3418-2417',
    'latitude': '-11.71997190',
    'longitude': '-62.31870830'
  },
  {
    'inep': '11022884',
    'descricao': 'EEEF RUI BARBOSA DE OLIVEIRA',
    'fone': '(69) 3623-2327',
    'latitude': '-11.77215750',
    'longitude': '-63.02956950'
  },
  {
    'inep': '11089806',
    'descricao': 'EEEF SALOMAO JUSTINIANO DE MELGAR',
    'fone': '(69) 3543-3041',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11002166',
    'descricao': 'EEEF SAMARITANA',
    'fone': '(69) 3301-7554',
    'latitude': '-8.75473040',
    'longitude': '-63.89910950'
  },
  {
    'inep': '11032774',
    'descricao': 'EEEF SANDOVAL MEIRA',
    'fone': '(69) 3451-2117',
    'latitude': '-11.67352630',
    'longitude': '-61.20230680'
  },
  {
    'inep': '11037598',
    'descricao': 'EEEF SANTA CLARA DE ASSIS',
    'fone': '(69) 3226-7632',
    'latitude': '-8.73572800',
    'longitude': '-63.83479980'
  },
  {
    'inep': '11000295',
    'descricao': 'EEEF SANTA MARCELINA',
    'fone': '(69) 2141-4396',
    'latitude': '-8.74543100',
    'longitude': '-63.88137190'
  },
  {
    'inep': '11040637',
    'descricao': 'EEEF SANTA MARIA PIN KAXARARI',
    'fone': '(69) 3252-1495',
    'latitude': '-9.77109520',
    'longitude': '-66.35604510'
  },
  {
    'inep': '11016019',
    'descricao': 'EEEF SAO FRANCISCO',
    'fone': '(69) 3421-4954',
    'latitude': '-10.87975224',
    'longitude': '-61.93012476'
  },
  {
    'inep': '11002158',
    'descricao': 'EEEF SAO FRANCISCO DE ASSIS',
    'fone': '(69) 9321-5843',
    'latitude': '-8.77527410',
    'longitude': '-63.80544330'
  },
  {
    'inep': '11015357',
    'descricao': 'EEEF SÃO PEDRO',
    'fone': '(69) 3422-2264',
    'latitude': '-10.86236470',
    'longitude': '-61.93618230'
  },
  {
    'inep': '11036575',
    'descricao': 'EEEF SAO ROQUE',
    'fone': '(69) 3343-2226',
    'latitude': '-12.99861140',
    'longitude': '-60.94602910'
  },
  {
    'inep': '11002301',
    'descricao': 'EEEF SAO SEBASTIAO I',
    'fone': '(69) 3221-0083',
    'latitude': '-8.73817560',
    'longitude': '-63.90813720'
  },
  {
    'inep': '11002328',
    'descricao': 'EEEF SEBASTIANA LIMA DE OLIVEIRA',
    'fone': '(69) ',
    'latitude': '-8.79702990',
    'longitude': '-63.89890500'
  },
  {
    'inep': '11037440',
    'descricao': 'EEEF SENADOR RONALDO ARAGAO',
    'fone': '(69) 3321-1253',
    'latitude': '-12.74047210',
    'longitude': '-60.16098690'
  },
  {
    'inep': '11013273',
    'descricao': 'EEEF SILVIO MICHELUZZI',
    'fone': '(69) 3424-8522',
    'latitude': '-10.88219342',
    'longitude': '-61.89740076'
  },
  {
    'inep': '11015411',
    'descricao': 'EEEF TANCREDO DE ALMEIDA NEVES',
    'fone': '(69) 3423-4006',
    'latitude': '-10.89763200',
    'longitude': '-61.91356390'
  },
  {
    'inep': '11025620',
    'descricao': 'EEEF TANCREDO DE ALMEIDA NEVES',
    'fone': '(69) 3641-2873',
    'latitude': '-11.92470740',
    'longitude': '-62.00870620'
  },
  {
    'inep': '11005050',
    'descricao': 'EEEF TEODORO DE ASSUNCAO',
    'fone': '(69) 3230-2118',
    'latitude': '-8.77900570',
    'longitude': '-63.69491880'
  },
  {
    'inep': '11012943',
    'descricao': 'EEEF TITO LOURENCO DE LIMA',
    'fone': '(69) 3521-2441',
    'latitude': '-10.43153523',
    'longitude': '-62.46163482'
  },
  {
    'inep': '11029412',
    'descricao': 'EEEF ULISSES GUIMARAES',
    'fone': '(69) 3442-4245',
    'latitude': '-11.74180000',
    'longitude': '-61.79021080'
  },
  {
    'inep': '11028394',
    'descricao': 'EEEF VINICIUS DE MORAES',
    'fone': '(69)',
    'latitude': '-11.52259340',
    'longitude': '-61.01376210'
  },
  {
    'inep': '11020962',
    'descricao': 'EEEF WALDEMAR HIGINO DE SOUZA',
    'fone': '(69) 3413-2565',
    'latitude': '-11.13487040',
    'longitude': '-62.36550340'
  },
  {
    'inep': '11037890',
    'descricao': 'EEEF XINEPUABAH GAVIAO',
    'fone': '(69) 3416-4866',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11037822',
    'descricao': 'EEEF ZAWIDIAJ XIKOPOHV',
    'fone': '(69) 3423-5317',
    'latitude': '-10.87814120',
    'longitude': '-61.93267280'
  },
  {
    'inep': '11017899',
    'descricao': 'EEEFM 15 DE NOVEMBRO',
    'fone': '(69) 3471-3045',
    'latitude': '-11.16538440',
    'longitude': '-61.90618230'
  },
  {
    'inep': '11004347',
    'descricao': 'EEEFM 15 DE OUTUBRO',
    'fone': '(69) 3239-2067',
    'latitude': '-10.56931420',
    'longitude': '-63.61859880'
  },
  {
    'inep': '11035110',
    'descricao': 'EEEFM 16 DE JUNHO',
    'fone': '(69) 3341-2715',
    'latitude': '-13.12967760',
    'longitude': '-60.52664630'
  },
  {
    'inep': '11017775',
    'descricao': 'EEEFM 28 DE NOVEMBRO',
    'fone': '(69) 3461-6168',
    'latitude': '-10.71709140',
    'longitude': '-62.26267330'
  },
  {
    'inep': '11013389',
    'descricao': 'EEEFM 31 DE MARCO',
    'fone': '(69) 3421-5481',
    'latitude': '-10.90197870',
    'longitude': '-61.91907230'
  },
  {
    'inep': '11000384',
    'descricao': 'EEEFM 4 DE JANEIRO',
    'fone': '(69) 3222-2223',
    'latitude': '-8.74158390',
    'longitude': '-63.86375840'
  },
  {
    'inep': '11046953',
    'descricao': 'EEEFM ALBINO BUTTNER',
    'fone': '(69) 3233-1306',
    'latitude': '-9.27883690',
    'longitude': '-63.46935540'
  },
  {
    'inep': '11049634',
    'descricao': 'EEEFM ALEJANDRO YAGUE MAYOR - PADRÃO MEC',
    'fone': '(69) 9383-5334',
    'latitude': '-10.89085697',
    'longitude': '-61.90181136'
  },
  {
    'inep': '11005939',
    'descricao': 'EEEFM ALKINDAR BRASIL DE AROUCA',
    'fone': '(69) 3541-2081',
    'latitude': '-10.77431840',
    'longitude': '-65.32027960'
  },
  {
    'inep': '11020504',
    'descricao': 'EEEFM ALTAMIR BILLY SOARES',
    'fone': '(69) 3413-2880',
    'latitude': '-11.12530340',
    'longitude': '-62.37082530'
  },
  {
    'inep': '11015608',
    'descricao': 'EEEFM ALUIZIO FERREIRA',
    'fone': '(69) 3421-7888',
    'latitude': '-10.88336560',
    'longitude': '-61.91469760'
  },
  {
    'inep': '11033797',
    'descricao': 'EEEFM ALVARES DE AZEVEDO',
    'fone': '(69) 3322-8865',
    'latitude': '-12.74341111',
    'longitude': '-60.13890993'
  },
  {
    'inep': '11030003',
    'descricao': 'EEEFM AMERICO BRASILIENSE DE A E MELO',
    'fone': '(69) 3412-9171',
    'latitude': '-11.74919315',
    'longitude': '-62.15858459'
  },
  {
    'inep': '11005823',
    'descricao': 'EEEFM ANGELINA DOS ANJOS',
    'fone': '(69) 3651-2662',
    'latitude': '-12.43388590',
    'longitude': '-64.23205740'
  },
  {
    'inep': '11006889',
    'descricao': 'EEEFM ANISIO TEIXEIRA',
    'fone': '(69) 3535-2317',
    'latitude': '-9.90610540',
    'longitude': '-63.03304130'
  },
  {
    'inep': '11013494',
    'descricao': 'EEEFM ANTONIO BIANCO',
    'fone': '(69) 3421-1301',
    'latitude': '-10.87598244',
    'longitude': '-61.97674155'
  },
  {
    'inep': '11009152',
    'descricao': 'EEEFM ANTONIO FRANCISCO LISBOA',
    'fone': '(69) 3582-2050',
    'latitude': '-9.36829530',
    'longitude': '-62.58388060'
  },
  {
    'inep': '11026014',
    'descricao': 'EEEFM ANTONIO GONCALVES DIAS',
    'fone': '(69) 3441-9787',
    'latitude': '-11.45245780',
    'longitude': '-61.44134360'
  },
  {
    'inep': '11024437',
    'descricao': 'EEEFM ARTUR DA COSTA E SILVA',
    'fone': '(69) 3643-1004',
    'latitude': '-12.13738990',
    'longitude': '-61.85777890'
  },
  {
    'inep': '11010665',
    'descricao': 'EEEFM AURELIO BUARQUE DE HOLANDA FERREIRA',
    'fone': '(69) 3530-2943',
    'latitude': '-10.26301972',
    'longitude': '-63.29875141'
  },
  {
    'inep': '11016507',
    'descricao': 'EEEFM AURELIO BUARQUE DE HOLANDA FERREIRA',
    'fone': '(69) 3461-5584',
    'latitude': '-10.72773306',
    'longitude': '-62.25079358'
  },
  {
    'inep': '11022221',
    'descricao': 'EEEFM AURELIO BUARQUE DE HOLANDA FERREIRA',
    'fone': '(69) 3418-2576',
    'latitude': '-11.72832800',
    'longitude': '-62.33388540'
  },
  {
    'inep': '11026073',
    'descricao': 'EEEFM AURELIO BUARQUE DE HOLANDA FERREIRA',
    'fone': '(69) 3441-2102',
    'latitude': '-11.43214290',
    'longitude': '-61.43578100'
  },
  {
    'inep': '11000554',
    'descricao': 'EEEFM BANDEIRANTES',
    'fone': '(69)3253-1133',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11002468',
    'descricao': 'EEEFM BARAO DO SOLIMOES',
    'fone': '(69) 3223-8093',
    'latitude': '-8.76160450',
    'longitude': '-63.90463760'
  },
  {
    'inep': '11008105',
    'descricao': 'EEEFM BARTOLOMEU L DE GUSMAO',
    'fone': '(69) 3525-1059',
    'latitude': '-9.85746130',
    'longitude': '-62.17573960'
  },
  {
    'inep': '11013591',
    'descricao': 'EEEFM BEATRIZ FERREIRA DA SILVA',
    'fone': '(69) 3422-1446',
    'latitude': '-10.89811410',
    'longitude': '-61.93814290'
  },
  {
    'inep': '11031689',
    'descricao': 'EEEFM BENEDITO LAURINDO GONCALVES',
    'fone': '(69) 3447-1014',
    'latitude': '-12.18086230',
    'longitude': '-61.60408900'
  },
  {
    'inep': '11027312',
    'descricao': 'EEEFM BERNARDO GUIMARAES',
    'fone': '(69) 3441-1067',
    'latitude': '-11.28077378',
    'longitude': '-61.39123544'
  },
  {
    'inep': '11000678',
    'descricao': 'EEEFM BRASILIA',
    'fone': '(69) 3222-4417',
    'latitude': '-8.74488370',
    'longitude': '-63.88068120'
  },
  {
    'inep': '11004428',
    'descricao': 'EEEFM BURITI',
    'fone': '(69) 3238-2481',
    'latitude': '-10.20577780',
    'longitude': '-63.83402200'
  },
  {
    'inep': '11029439',
    'descricao': 'EEEFM CANDIDO PORTINARI',
    'fone': '(69) 3442-7169',
    'latitude': '-11.72415610',
    'longitude': '-61.78311060'
  },
  {
    'inep': '11000708',
    'descricao': 'EEEFM CAP CLAUDIO MANOEL DA COSTA',
    'fone': '(69) 3213-2245',
    'latitude': '-8.80015430',
    'longitude': '-63.88961500'
  },
  {
    'inep': '11011491',
    'descricao': 'EEEFM CAPITAO SILVIO DE FARIAS',
    'fone': '(69) 3521-3689',
    'latitude': '-10.43350710',
    'longitude': '-62.45646420'
  },
  {
    'inep': '11026197',
    'descricao': 'EEEFM CARLOS DRUMMOND DE ANDRADE -INTEGRAL',
    'fone': '(69) 3441-6193',
    'latitude': '-11.42889140',
    'longitude': '-61.47401370'
  },
  {
    'inep': '11018089',
    'descricao': 'EEEFM CARLOS DRUMOND DE ANDRADE',
    'fone': '(69) 3471-2474',
    'latitude': '-11.17858400',
    'longitude': '-61.90849680'
  },
  {
    'inep': '11028750',
    'descricao': 'EEEFM CARLOS DRUMOND DE ANDRADE',
    'fone': '(69) 3442-2700',
    'latitude': '-11.72896260',
    'longitude': '-61.78953930'
  },
  {
    'inep': '11027320',
    'descricao': 'EEEFM CARLOS GOMES',
    'fone': '(69) 3443-3648',
    'latitude': '-11.42820640',
    'longitude': '-61.45765920'
  },
  {
    'inep': '11003979',
    'descricao': 'EEEFM CASIMIRO DE ABREU',
    'fone': '(69) ',
    'latitude': '-10.41137950',
    'longitude': '-65.33208800'
  },
  {
    'inep': '11033363',
    'descricao': 'EEEFM CECILIA MEIRELES',
    'fone': '(69) 3322-1562',
    'latitude': '-12.73271710',
    'longitude': '-60.15127301'
  },
  {
    'inep': '11029455',
    'descricao': 'EEEFM CEL ALUIZIO PINHEIRO FERREIRA',
    'fone': '(69) 3442-7167',
    'latitude': '-11.72810790',
    'longitude': '-61.77519020'
  },
  {
    'inep': '11015616',
    'descricao': 'EEEFM CEL JORGE TEIXEIRA DE OLIVEIRA',
    'fone': '(69) 3428-2075',
    'latitude': '-11.06465540',
    'longitude': '-62.01002950'
  },
  {
    'inep': '11027401',
    'descricao': 'EEEFM CELSO FERREIRA DA CUNHA',
    'fone': '(69) 3441-8146',
    'latitude': '-11.43467430',
    'longitude': '-61.45668610'
  },
  {
    'inep': '11104805',
    'descricao': 'EEEFM CESAR FREITAS CASSOL',
    'fone': '(69) 3236-8234',
    'latitude': '-9.70954440',
    'longitude': '-64.53162980'
  },
  {
    'inep': '11033371',
    'descricao': 'EEEFM CHUPINGUAIA',
    'fone': '(69) 3346-1186',
    'latitude': '-12.55582720',
    'longitude': '-60.90297490'
  },
  {
    'inep': '11019115',
    'descricao': 'EEEFM CLAUDIO MANOEL DA COSTA',
    'fone': '(69) 3527-1174',
    'latitude': '-10.54232739',
    'longitude': '-63.01886559'
  },
  {
    'inep': '11027347',
    'descricao': 'EEEFM CLODOALDO NUNES DE ALMEIDA',
    'fone': '(69) 3441-9993',
    'latitude': '-11.42487420',
    'longitude': '-61.45472300'
  },
  {
    'inep': '11036125',
    'descricao': 'EEEFM COLINA VERDE',
    'fone': '(69) 8487-8340',
    'latitude': '-13.00807020',
    'longitude': '-60.63917760'
  },
  {
    'inep': '11006773',
    'descricao': 'EEEFM CORA CORALINA',
    'fone': '(69) 3536-0174',
    'latitude': '-9.89910900',
    'longitude': '-63.03526990'
  },
  {
    'inep': '11026278',
    'descricao': 'EEEFM CORA CORALINA',
    'fone': '(69) 3441-6230',
    'latitude': '-11.43758340',
    'longitude': '-61.45120730'
  },
  {
    'inep': '11019140',
    'descricao': 'EEEFM COSTA JUNIOR',
    'fone': '(69) 3524-1001',
    'latitude': '-10.60925050',
    'longitude': '-62.73036820'
  },
  {
    'inep': '11047216',
    'descricao': 'EEEFM DARCY DA SILVEIRA',
    'fone': '(69) 3654-1142',
    'latitude': '-12.43802740',
    'longitude': '-64.22668620'
  },
  {
    'inep': '11000848',
    'descricao': 'EEEFM DOM PEDRO I',
    'fone': '(69) 3228-3848',
    'latitude': '-8.79887440',
    'longitude': '-63.86760510'
  },
  {
    'inep': '11018216',
    'descricao': 'EEEFM DONA BENTA',
    'fone': '(69) 3471-0007',
    'latitude': '-11.16937550',
    'longitude': '-61.89913820'
  },
  {
    'inep': '11016973',
    'descricao': 'EEEFM DR HORACIO CARELLI MENDES',
    'fone': '(69) 3461-5254',
    'latitude': '-10.71059700',
    'longitude': '-62.25833930'
  },
  {
    'inep': '11000937',
    'descricao': 'EEEFM DR OSVALDO PIANA',
    'fone': '(69) 3229-3721',
    'latitude': '-8.73867690',
    'longitude': '-63.86458090'
  },
  {
    'inep': '11018267',
    'descricao': 'EEEFM EMBURANA',
    'fone': '(69) 3473-1046',
    'latitude': '-11.07640290',
    'longitude': '-61.92085340'
  },
  {
    'inep': '11031913',
    'descricao': 'EEEFM ESTACIO DE SA',
    'fone': '(69) 98128-3860',
    'latitude': '-11.97479228',
    'longitude': '-61.37680292'
  },
  {
    'inep': '11001046',
    'descricao': 'EEEFM ESTUDO E TRABALHO',
    'fone': '(69) 3223-4971',
    'latitude': '-8.77330270',
    'longitude': '-63.90026580'
  },
  {
    'inep': '11031964',
    'descricao': 'EEEFM FELIPE CAMARAO',
    'fone': '(69) 98117-3124',
    'latitude': '-11.91448580',
    'longitude': '-61.51124950'
  },
  {
    'inep': '11030666',
    'descricao': 'EEEFM FRANCISCA JULIA DA SILVA',
    'fone': '(69) 3474-2125',
    'latitude': '-11.42672450',
    'longitude': '-61.94898700'
  },
  {
    'inep': '11095806',
    'descricao': 'EEEFM FRANCISCA MARTENDAL',
    'fone': '(69)-',
    'latitude': '-12.55582720',
    'longitude': '-60.90297490'
  },
  {
    'inep': '11007168',
    'descricao': 'EEEFM FRANCISCO ALVES MENDES FILHO',
    'fone': '(69) 3536-0489',
    'latitude': '-9.93408590',
    'longitude': '-63.02810570'
  },
  {
    'inep': '11009306',
    'descricao': 'EEEFM FRANCISCO MIGNONE',
    'fone': '(69) 3539-2029',
    'latitude': '-9.70249450',
    'longitude': '-62.89911530'
  },
  {
    'inep': '11010290',
    'descricao': 'EEEFM FREI HENRIQUE DE COIMBRA',
    'fone': '(69) 3532-2057',
    'latitude': '-10.34193130',
    'longitude': '-62.90003870'
  },
  {
    'inep': '11003413',
    'descricao': 'EEEFM GENERAL OSORIO',
    'fone': '(69) 3225-1038',
    'latitude': '-8.02387516',
    'longitude': '-62.87276567'
  },
  {
    'inep': '11002476',
    'descricao': 'EEEFM GETULIO VARGAS',
    'fone': '(69) 3229-2281',
    'latitude': '-8.77630410',
    'longitude': '-63.90227470'
  },
  {
    'inep': '11015624',
    'descricao': 'EEEFM GONCALVES DIAS',
    'fone': '(69) 3421-4197',
    'latitude': '-10.87433420',
    'longitude': '-61.96251450'
  },
  {
    'inep': '11001119',
    'descricao': 'EEEFM GOV ARAUJO LIMA',
    'fone': '(69) 3216-5741',
    'latitude': '-8.75911470',
    'longitude': '-63.87706150'
  },
  {
    'inep': '11001143',
    'descricao': 'EEEFM GOV JESUS BURLAMAQUI HOSANNAH',
    'fone': '(69) 3213-4027',
    'latitude': '-8.77602960',
    'longitude': '-63.88167020'
  },
  {
    'inep': '11012099',
    'descricao': 'EEEFM GOV JORGE TEIXEIRA DE OLIVEIRA',
    'fone': '(69) 3521-4882',
    'latitude': '-10.44052270',
    'longitude': '-62.47035360'
  },
  {
    'inep': '11001135',
    'descricao': 'EEEFM GOV PETRONIO BARCELOS',
    'fone': '(69) 3225-4870',
    'latitude': '-8.76822620',
    'longitude': '-63.87828860'
  },
  {
    'inep': '11026499',
    'descricao': 'EEEFM GRACILIANO RAMOS',
    'fone': '(69) 3441-3922',
    'latitude': '-11.41780070',
    'longitude': '-61.46141170'
  },
  {
    'inep': '11007885',
    'descricao': 'EEEFM HEITOR VILLA LOBOS',
    'fone': '(69) 3535-2327',
    'latitude': '-9.92056680',
    'longitude': '-63.03149250'
  },
  {
    'inep': '11026545',
    'descricao': 'EEEFM HONORINA LUCAS DE BRITO',
    'fone': '(69) 3441-6373',
    'latitude': '-11.42602150',
    'longitude': '-61.46354210'
  },
  {
    'inep': '11035080',
    'descricao': 'EEEFM INACIO CASTRO',
    'fone': '(69) 3344-1120',
    'latitude': '-13.47826860',
    'longitude': '-61.04346400'
  },
  {
    'inep': '11006617',
    'descricao': 'EEEFM IRMA MARIA CELESTE',
    'fone': '(69) 3541-7074',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11014156',
    'descricao': 'EEEFM JANETE CLAIR',
    'fone': '(69) 3424-7685',
    'latitude': '-10.86862670',
    'longitude': '-61.90788060'
  },
  {
    'inep': '11007281',
    'descricao': 'EEEFM JARDIM DAS PEDRAS',
    'fone': '(69) 3536-4848',
    'latitude': '-9.92543410',
    'longitude': '-63.04262550'
  },
  {
    'inep': '11040629',
    'descricao': 'EEEFM JAYME PEIXOTO DE ALENCAR',
    'fone': '(69) 1495',
    'latitude': '-9.77109520',
    'longitude': '-66.35604510'
  },
  {
    'inep': '11027754',
    'descricao': 'EEEFM JEAN PIAGET',
    'fone': '(69) 3481-1211',
    'latitude': '-11.53227730',
    'longitude': '-61.01700400'
  },
  {
    'inep': '11017791',
    'descricao': 'EEEFM JOAQUIM DE LIMA AVELINO',
    'fone': '(69) 3461-3483',
    'latitude': '-10.72014700',
    'longitude': '-62.25173080'
  },
  {
    'inep': '11009080',
    'descricao': 'EEEFM JOAQUIM PEREIRA DA ROCHA',
    'fone': '(69) 3581-2347',
    'latitude': '-9.42437125',
    'longitude': '-61.99532895'
  },
  {
    'inep': '11023660',
    'descricao': 'EEEFM JOAQUIM XAVIER DE OLIVEIRA',
    'fone': '(69) 3412-2716',
    'latitude': '-11.35443320',
    'longitude': '-62.29229890'
  },
  {
    'inep': '11001283',
    'descricao': 'EEEFM JOHN KENNEDY',
    'fone': '(69) 3224-3019',
    'latitude': '-8.75785160',
    'longitude': '-63.89457030'
  },
  {
    'inep': '11001305',
    'descricao': 'EEEFM JORGE TEIXEIRA DE OLIVEIRA',
    'fone': '(69) 3214-1767',
    'latitude': '-8.77532315',
    'longitude': '-63.80267143'
  },
  {
    'inep': '11034440',
    'descricao': 'EEEFM JOSE DE ANCHIETA',
    'fone': '(69) 3345-2510',
    'latitude': '-13.46237740',
    'longitude': '-60.62850910'
  },
  {
    'inep': '11000317',
    'descricao': 'EEEFM JOSE OTINO DE FREITAS',
    'fone': '(69) 3222-5808',
    'latitude': '-8.74189500',
    'longitude': '-63.87543620'
  },
  {
    'inep': '11029056',
    'descricao': 'EEEFM JOSE ROSALES DOS SANTOS',
    'fone': '(69) 3432-2224',
    'latitude': '-11.71436590',
    'longitude': '-61.55569310'
  },
  {
    'inep': '11012145',
    'descricao': 'EEEFM JOSUE MONTELLO',
    'fone': '(69) 9967-6913',
    'latitude': '-10.43222350',
    'longitude': '-62.47929210'
  },
  {
    'inep': '11015632',
    'descricao': 'EEEFM JULIO GUERRA',
    'fone': '(69) 3423-1045',
    'latitude': '-10.88809980',
    'longitude': '-61.92840300'
  },
  {
    'inep': '11029951',
    'descricao': 'EEEFM JUSCELINO KUBITSCHEK',
    'fone': '(69) 3434-2362',
    'latitude': '-11.91042860',
    'longitude': '-61.77879840'
  },
  {
    'inep': '11001364',
    'descricao': 'EEEFM JUSCELINO KUBITSCHEK DE OLIVEIRA',
    'fone': '(69) 33225-9407',
    'latitude': '-8.76302220',
    'longitude': '-63.86420050'
  },
  {
    'inep': '11014300',
    'descricao': 'EEEFM JUSCELINO KUBITSCHEK DE OLIVEIRA',
    'fone': '(69) 3421-3548',
    'latitude': '-10.88200040',
    'longitude': '-61.92251210'
  },
  {
    'inep': '11024968',
    'descricao': 'EEEFM JUSCELINO KUBITSCHEK DE OLIVEIRA',
    'fone': '(69) 3641-2127',
    'latitude': '-11.92464563',
    'longitude': '-61.98916295'
  },
  {
    'inep': '11009888',
    'descricao': 'EEEFM LAURINDO RABELO',
    'fone': '(69) 3534-2058',
    'latitude': '-9.72051340',
    'longitude': '-63.31880370'
  },
  {
    'inep': '11015667',
    'descricao': 'EEEFM LAURO BENNO PREDIGER',
    'fone': '(69) 3421-5230',
    'latitude': '-10.86408520',
    'longitude': '-61.97951910'
  },
  {
    'inep': '11033487',
    'descricao': 'EEEFM MACHADO DE ASSIS',
    'fone': '(69) 3322-9022',
    'latitude': '-12.74885180',
    'longitude': '-60.12313070'
  },
  {
    'inep': '11038012',
    'descricao': 'EEEFM MADEIRA MAMORE',
    'fone': '(69) 3216-8951',
    'latitude': '-8.76348030',
    'longitude': '-63.90310950'
  },
  {
    'inep': '11030372',
    'descricao': 'EEEFM MAL CANDIDO RONDON',
    'fone': '(69) 3435-2011',
    'latitude': '-11.69654840',
    'longitude': '-61.99565970'
  },
  {
    'inep': '11001410',
    'descricao': 'EEEFM MANAUS',
    'fone': '(69) 3221-5415',
    'latitude': '-8.77460510',
    'longitude': '-63.89092050'
  },
  {
    'inep': '11035951',
    'descricao': 'EEEFM MANUEL BANDEIRA',
    'fone': '(69) 3341-2137',
    'latitude': '-13.11170100',
    'longitude': '-60.54041240'
  },
  {
    'inep': '11048450',
    'descricao': 'EEEFM MARCELO CANDIA SUBSEDE I',
    'fone': '(69) 3214-1556',
    'latitude': '-8.78027700',
    'longitude': '-63.80531940'
  },
  {
    'inep': '11046961',
    'descricao': 'EEEFM MARCILENE CARVALHO RICARDO',
    'fone': '',
    'latitude': '-12.07381884',
    'longitude': '-63.56866814'
  },
  {
    'inep': '11014431',
    'descricao': 'EEEFM MARCOS BISPO SILVA',
    'fone': '(69) 3424-3726',
    'latitude': '-10.89779970',
    'longitude': '-61.90999850'
  },
  {
    'inep': '11001496',
    'descricao': 'EEEFM MARCOS DE BARROS FREIRE',
    'fone': '(69) 3214-1739',
    'latitude': '-8.78383740',
    'longitude': '-63.79236570'
  },
  {
    'inep': '11002506',
    'descricao': 'EEEFM MARECHAL CASTELO BRANCO',
    'fone': '(69) 3224-4328',
    'latitude': '-8.78488460',
    'longitude': '-63.91736010'
  },
  {
    'inep': '11032260',
    'descricao': 'EEEFM MARECHAL CORDEIRO DE FARIAS',
    'fone': '(69) 3451-5022',
    'latitude': '-11.68170040',
    'longitude': '-61.18069240'
  },
  {
    'inep': '11012277',
    'descricao': 'EEEFM MARECHAL COSTA E SILVA',
    'fone': '(69) 8404-9214',
    'latitude': '-10.43222350',
    'longitude': '-62.47929210'
  },
  {
    'inep': '11033819',
    'descricao': 'EEEFM MARECHAL RONDON',
    'fone': '(69) 3321-4210',
    'latitude': '-12.74213680',
    'longitude': '-60.15162740'
  },
  {
    'inep': '11036397',
    'descricao': 'EEEFM MARECHAL RONDON',
    'fone': '(69) 3347-1062',
    'latitude': '-12.99861140',
    'longitude': '-60.94602910'
  },
  {
    'inep': '11039582',
    'descricao': 'EEEFM MARECHAL RONDON',
    'fone': '(69) 3238-2311',
    'latitude': '-10.20020940',
    'longitude': '-63.83043170'
  },
  {
    'inep': '11026758',
    'descricao': 'EEEFM MARIA AURORA DO NASCIMENTO',
    'fone': '(69) 3441-3700',
    'latitude': '-11.42205160',
    'longitude': '-61.46773840'
  },
  {
    'inep': '11017422',
    'descricao': 'EEEFM MARIA DE MATOS E SILVA',
    'fone': '(69) 3467-1061',
    'latitude': '-10.60083310',
    'longitude': '-62.30958330'
  },
  {
    'inep': '11029110',
    'descricao': 'EEEFM MARIA DO CARMO OLIVEIRA RABELO',
    'fone': '(69) 3442-2842',
    'latitude': '-11.70933670',
    'longitude': '-61.76944190'
  },
  {
    'inep': '11017120',
    'descricao': 'EEEFM MARIA GORETTI',
    'fone': '(69) 3466-1098',
    'latitude': '-10.91718500',
    'longitude': '-62.55696460'
  },
  {
    'inep': '11003812',
    'descricao': 'EEEFM MARIA NAZARE SANTOS',
    'fone': '(69) 3236-6457',
    'latitude': '-9.26014910',
    'longitude': '-64.40252850'
  },
  {
    'inep': '11010940',
    'descricao': 'EEEFM MATO GROSSO',
    'fone': '(69) 3530-2153',
    'latitude': '-10.26127600',
    'longitude': '-63.29714150'
  },
  {
    'inep': '11007524',
    'descricao': 'EEEFM MIGRANTES',
    'fone': '(69) 3535-2710',
    'latitude': '-9.90610540',
    'longitude': '-63.03304130'
  },
  {
    'inep': '11019948',
    'descricao': 'EEEFM MIGRANTES',
    'fone': '(69) 3463-2224',
    'latitude': '-11.03286388',
    'longitude': '-62.66555785'
  },
  {
    'inep': '11106859',
    'descricao': 'EEEFM MOACYR CARAMELLO',
    'fone': '(69) 3346-1677',
    'latitude': '-12.55582720',
    'longitude': '-60.90297490'
  },
  {
    'inep': '11017201',
    'descricao': 'EEEFM MONTEIRO LOBATO',
    'fone': '(69) 3461-1413',
    'latitude': '-10.71458080',
    'longitude': '-62.25952480'
  },
  {
    'inep': '11032359',
    'descricao': 'EEEFM MONTEIRO LOBATO',
    'fone': '(69) 3468-1069',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11001640',
    'descricao': 'EEEFM MURILO BRAGA',
    'fone': '(69) 99256-4626',
    'latitude': '-8.76301182',
    'longitude': '-63.89637815'
  },
  {
    'inep': '11031298',
    'descricao': 'EEEFM NILO COELHO',
    'fone': '(69) 3448-2380',
    'latitude': '-11.07665790',
    'longitude': '-61.50973800'
  },
  {
    'inep': '11029170',
    'descricao': 'EEEFM NILSON SILVA',
    'fone': '(69) 3442-2643',
    'latitude': '-11.72723727',
    'longitude': '-61.76235878'
  },
  {
    'inep': '11014555',
    'descricao': 'EEEFM NOVA BRASILIA',
    'fone': '(69) 3424-5906',
    'latitude': '-10.86644620',
    'longitude': '-61.90750480'
  },
  {
    'inep': '11012447',
    'descricao': 'EEEFM OLGA DELLAIA',
    'fone': '(69) 3521-2238',
    'latitude': '-10.43981370',
    'longitude': '-62.46730970'
  },
  {
    'inep': '11032510',
    'descricao': 'EEEFM ORLANDO BUENO DA SILVA',
    'fone': '(69) 3451-8364',
    'latitude': '-11.68486090',
    'longitude': '-61.15680840'
  },
  {
    'inep': '11024097',
    'descricao': 'EEEFM OSWALDO PIANA',
    'fone': '(69) 3623-2625',
    'latitude': '-11.77046680',
    'longitude': '-63.03375590'
  },
  {
    'inep': '11035960',
    'descricao': 'EEEFM PAULO DE ASSIS RIBEIRO',
    'fone': '(69) 3341-2860',
    'latitude': '-13.11842800',
    'longitude': '-60.52945560'
  },
  {
    'inep': '11005360',
    'descricao': 'EEEFM PAULO FREIRE',
    'fone': '(69) 3221-2329',
    'latitude': '-9.18097900',
    'longitude': '-63.18169130'
  },
  {
    'inep': '11026626',
    'descricao': 'EEEFM PAULO FREIRE',
    'fone': '(69) 3443-1200',
    'latitude': '-11.42612500',
    'longitude': '-61.43332760'
  },
  {
    'inep': '11025638',
    'descricao': 'EEEFM PE EZEQUIEL RAMIN',
    'fone': '(69) 3641-3924',
    'latitude': '-11.93186630',
    'longitude': '-62.00417170'
  },
  {
    'inep': '11049855',
    'descricao': 'EEEFM PEDRO MENDES CARDOSO',
    'fone': '(69) 9217-8894',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11012579',
    'descricao': 'EEEFM PEDRO VIEIRA DE MELO',
    'fone': '(69) 3526-1069',
    'latitude': '-10.85788140',
    'longitude': '-62.80016480'
  },
  {
    'inep': '11017384',
    'descricao': 'EEEFM PIONEIRA',
    'fone': '(69) 3465-1107',
    'latitude': '-10.93367070',
    'longitude': '-62.25181880'
  },
  {
    'inep': '11012994',
    'descricao': 'EEEFM PLACIDO CASTRO',
    'fone': '(69) 3521-2342',
    'latitude': '-10.42861690',
    'longitude': '-62.47023440'
  },
  {
    'inep': '11034270',
    'descricao': 'EEEFM PLANALTO',
    'fone': '(69) 3348-1003',
    'latitude': '-13.49466290',
    'longitude': '-60.54252930'
  },
  {
    'inep': '11001887',
    'descricao': 'EEEFM PRES TANCREDO DE ALMEIDA NEVES',
    'fone': '(69) 3227-0161',
    'latitude': '-8.80492110',
    'longitude': '-63.87769770'
  },
  {
    'inep': '11018950',
    'descricao': 'EEEFM PRESIDENTE EMILIO GARRASTAZU MEDICI',
    'fone': '(69) 3471-2564',
    'latitude': '-11.17084370',
    'longitude': '-61.89775510'
  },
  {
    'inep': '11020326',
    'descricao': 'EEEFM PRIMAVERA',
    'fone': '(69) 3523-1153',
    'latitude': '-10.24632140',
    'longitude': '-62.34949860'
  },
  {
    'inep': '11022981',
    'descricao': 'EEEFM PRINCESA ISABEL',
    'fone': '(69) 3642-2343',
    'latitude': '-11.69853190',
    'longitude': '-62.71136670'
  },
  {
    'inep': '11029307',
    'descricao': 'EEEFM PRISCILA RODRIGUES CHAGAS',
    'fone': '(69) 3442-2898',
    'latitude': '-11.71759490',
    'longitude': '-61.79936720'
  },
  {
    'inep': '11011661',
    'descricao': 'EEEFM PROF DAYSE MARA DE OLIVEIRA MARTINS',
    'fone': '(69) 3521-1187',
    'latitude': '-10.42038750',
    'longitude': '-62.47636520'
  },
  {
    'inep': '11002522',
    'descricao': 'EEEFM PROF EDUARDO LIMA E SILVA',
    'fone': '(69) 3228-5825',
    'latitude': '-8.79206600',
    'longitude': '-63.89337730'
  },
  {
    'inep': '11002018',
    'descricao': 'EEEFM PROF FLORA CALHEIROS COTRIN',
    'fone': '(69) ',
    'latitude': '-8.75113270',
    'longitude': '-63.84424550'
  },
  {
    'inep': '11048670',
    'descricao': 'EEEFM PROF FRANCISCO DESMORET PASSOS',
    'fone': '(69) 98404-2993',
    'latitude': '-8.15952150',
    'longitude': '-63.32041110'
  },
  {
    'inep': '11015683',
    'descricao': 'EEEFM PROF JOSE FRANCISCO DOS SANTOS',
    'fone': '(69) 3423-7961',
    'latitude': '-10.86567530',
    'longitude': '-61.94505840'
  },
  {
    'inep': '11002514',
    'descricao': 'EEEFM PROF ORLANDO FREIRE',
    'fone': '(69) 3225-0898',
    'latitude': '-8.76869940',
    'longitude': '-63.86952850'
  },
  {
    'inep': '11018810',
    'descricao': 'EEEFM PROF PAULO FREIRE',
    'fone': '(69) 3471-2761',
    'latitude': '-11.16937550',
    'longitude': '-61.89913820'
  },
  {
    'inep': '11037334',
    'descricao': 'EEEFM PROF VALDIR MONFREDINHO',
    'fone': '(69) 3451-4564',
    'latitude': '-11.69273390',
    'longitude': '-61.17029630'
  },
  {
    'inep': '11000856',
    'descricao': 'EEEFM PROFESSOR DANIEL NERI DA SILVA',
    'fone': '(69) 3226-1607',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11004274',
    'descricao': 'EEEFM PROFESSOR SALOMAO SILVA',
    'fone': '(69) 3544-2997',
    'latitude': '-10.39459940',
    'longitude': '-65.32656060'
  },
  {
    'inep': '11000457',
    'descricao': 'EEEFM PROFESSORA ANTONIA VIEIRA FROTA',
    'fone': '(69) 3251-1436',
    'latitude': '-9.66077820',
    'longitude': '-65.73866210'
  },
  {
    'inep': '11048620',
    'descricao': 'EEEFM PROFESSORA CARMEM IONE DE ARAUJO',
    'fone': '(69) 3536-2419',
    'latitude': '-9.88997210',
    'longitude': '-63.02191550'
  },
  {
    'inep': '11049936',
    'descricao': 'EEEFM PROFESSORA LYDIA JOHNSON DE MACEDO',
    'fone': '(69) 8128-3959',
    'latitude': null,
    'longitude': null
  },
  {
    'inep': '11048247',
    'descricao': 'EEEFM PROFESSORA MARIA LAURINDA GROFF',
    'fone': '(69) 3546-6188',
    'latitude': '-10.36967615',
    'longitude': '-64.80466604'
  },
  {
    'inep': '11050233',
    'descricao': 'EEEFM PROFESSORA QUITÉRIA DE OLIVEIRA DA SILVA',
    'fone': '(69) 3535-2911',
    'latitude': '-9.80844882',
    'longitude': '-63.53376389'
  },
  {
    'inep': '11012684',
    'descricao': 'EEEFM RAIMUNDO CANTANHEDE',
    'fone': '(69) 3521-1042',
    'latitude': '-10.43376740',
    'longitude': '-62.48085580'
  },
  {
    'inep': '11033070',
    'descricao': 'EEEFM RAIMUNDO EUCLIDES BARBOSA',
    'fone': '(69) 3451-2115',
    'latitude': '-11.68100960',
    'longitude': '-61.18943250'
  },
  {
    'inep': '11113804',
    'descricao': 'EEEFM RAIMUNDO NONATO VIEIRA DA SILVA',
    'fone': '(69) 9295-6676',
    'latitude': '-8.72947270',
    'longitude': '-63.85837740'
  },
  {
    'inep': '11007893',
    'descricao': 'EEEFM RICARDO CANTANHEDE',
    'fone': '(69) 3535-2647',
    'latitude': '-9.93938250',
    'longitude': '-63.01680060'
  },
  {
    'inep': '11002549',
    'descricao': 'EEEFM RIO BRANCO',
    'fone': '(69) 3224-5936',
    'latitude': '-8.76376760',
    'longitude': '-63.88832410'
  },
  {
    'inep': '11015144',
    'descricao': 'EEEFM RIO URUPA',
    'fone': '(69) 3421-2310',
    'latitude': '-10.86375930',
    'longitude': '-61.94064700'
  },
  {
    'inep': '11002123',
    'descricao': 'EEEFM RISOLETA NEVES',
    'fone': '(69) 3214-9318',
    'latitude': '-8.75984670',
    'longitude': '-63.83769650'
  },
  {
    'inep': '11006633',
    'descricao': 'EEEFM ROCHA LEAL',
    'fone': '(69) 3541-3252',
    'latitude': '-10.78341930',
    'longitude': '-65.33199200'
  },
  {
    'inep': '11076801',
    'descricao': 'EEEFM RUTH ROCHA',
    'fone': '(69) 3262-1036',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11023678',
    'descricao': 'EEEFM SANTA ANA',
    'fone': '(69) 3412-2842',
    'latitude': '-11.34741650',
    'longitude': '-62.28536640'
  },
  {
    'inep': '11002255',
    'descricao': 'EEEFM SAO LUIZ',
    'fone': '(69) 3214-6851',
    'latitude': '-8.77266720',
    'longitude': '-63.83375040'
  },
  {
    'inep': '11028424',
    'descricao': 'EEEFM SETE DE SETEMBRO',
    'fone': '(69) 3481-2652',
    'latitude': '-11.51871900',
    'longitude': '-61.00607000'
  },
  {
    'inep': '11106867',
    'descricao': 'EEEFM SHIRLEI CERUTI',
    'fone': '(69) 3322-7614',
    'latitude': '-12.75113430',
    'longitude': '-60.14574050'
  },
  {
    'inep': '11006641',
    'descricao': 'EEEFM SIMON BOLIVAR',
    'fone': '(69) 3541-1684',
    'latitude': '-10.79275350',
    'longitude': '-65.34557330'
  },
  {
    'inep': '11029480',
    'descricao': 'EEEFM TANCREDO DE ALMEIDA NEVES',
    'fone': '(69) 3442-7026',
    'latitude': '-11.73588580',
    'longitude': '-61.77652930'
  },
  {
    'inep': '11111111',
    'descricao': 'EEEFM TESTE CTIC',
    'fone': '',
    'latitude': null,
    'longitude': null
  },
  {
    'inep': '11000260',
    'descricao': 'EEEFM TIRADENTES',
    'fone': '(69) 3225-0051',
    'latitude': '-8.73335470',
    'longitude': '-63.87862360'
  },
  {
    'inep': '11021403',
    'descricao': 'EEEFM TUBARAO',
    'fone': '(69) 3464-1446',
    'latitude': '-10.43304500',
    'longitude': '-62.13129820'
  },
  {
    'inep': '11015500',
    'descricao': 'EEEFM TUPA',
    'fone': '(69) 3427-2008',
    'latitude': '-10.79024361',
    'longitude': '-61.69316067'
  },
  {
    'inep': '11038063',
    'descricao': 'EEEFM ULISSES GUIMARAES',
    'fone': '(69) 3214-3672',
    'latitude': '-8.75324770',
    'longitude': '-63.81632280'
  },
  {
    'inep': '11033835',
    'descricao': 'EEEFM ZILDA DA FROTA UCHOA',
    'fone': '(69) 3322-8921',
    'latitude': '-12.73664880',
    'longitude': '-60.11820710'
  },
  {
    'inep': '11030658',
    'descricao': 'EEEFM. EUGENIO LAZARIN',
    'fone': '(69) 8145-1152',
    'latitude': '-11.41390540',
    'longitude': '-61.94323680'
  },
  {
    'inep': '11042559',
    'descricao': 'EEEIEF PADRE ENZO MANGANO',
    'fone': '(69) 3226-2458',
    'latitude': '-8.76006980',
    'longitude': '-63.82732620'
  },
  {
    'inep': '11046740',
    'descricao': 'EEEM JOSINO BRITO',
    'fone': '(69) 3441-0288',
    'latitude': '-11.43333790',
    'longitude': '-61.43144820'
  },
  {
    'inep': '11002484',
    'descricao': 'EEEM MAJOR GUAPINDAIA',
    'fone': '(69) 3229-8265',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11040793',
    'descricao': 'EEEM PROF JOAO BENTO DA COSTA',
    'fone': '(69) 3210-4753',
    'latitude': '-8.78413430',
    'longitude': '-63.87386390'
  },
  {
    'inep': '11034998',
    'descricao': 'EEEM TANCREDO DE ALMEIDA NEVES',
    'fone': '(69) 3342-3133',
    'latitude': '-13.19291660',
    'longitude': '-60.82994490'
  },
  {
    'inep': '11049812',
    'descricao': 'EEEM VALDOMIRO FRANCISCO DE OLIVEIRA',
    'fone': '(69) 3583-1155',
    'latitude': '-9.44402310',
    'longitude': '-61.98231980'
  },
  {
    'inep': '11032189',
    'descricao': 'EEFM JOSE SEVERINO DOS SANTOS',
    'fone': '(69) 3446-1032',
    'latitude': '-11.83018580',
    'longitude': '-61.31690600'
  },
  {
    'inep': '11004053',
    'descricao': 'EEIEF FRANCISCO MEIRELES',
    'fone': '(69) 99374-8750',
    'latitude': '-10.34833530',
    'longitude': '-65.31335440'
  },
  {
    'inep': '11044039',
    'descricao': 'EEIEF MAROXIN PIRAIN TOPI ORO EO',
    'fone': '(69) 3544-2835',
    'latitude': '-10.41066780',
    'longitude': '-65.33056180'
  },
  {
    'inep': '11067802',
    'descricao': 'EEIEF MAXUN TAPEREPE E EO WARAM',
    'fone': '(69) 3541-3834',
    'latitude': '-10.34833530',
    'longitude': '-65.31335440'
  },
  {
    'inep': '11044047',
    'descricao': 'EEIEF WAO TO AM ORO WARAN XIJIEN',
    'fone': '(69) 3544-2835',
    'latitude': '-10.41066780',
    'longitude': '-65.33056180'
  },
  {
    'inep': '11006072',
    'descricao': 'EIEEF 5 DE JULHO',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11043474',
    'descricao': 'EIEEF A AIM ORO NAO',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11049049',
    'descricao': 'EIEEF AIPERE',
    'fone': '(69) 00000-0000',
    'latitude': null,
    'longitude': null
  },
  {
    'inep': '11049030',
    'descricao': 'EIEEF AIPERE KOOP',
    'fone': '(69) 0000-000',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11046244',
    'descricao': 'EIEEF AMEN KOARE TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11046252',
    'descricao': 'EIEEF ANOMAE TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11050306',
    'descricao': 'EIEEF AWO CAMIP ORO MON',
    'fone': '(00) 0000-0',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11038373',
    'descricao': 'EIEEF BOATT GERAINNY',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11042648',
    'descricao': 'EIEEF CAPITAO CARDOSO',
    'fone': '(69) 3481-2781',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11037938',
    'descricao': 'EIEEF ERAPOARON MAKURAP',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11106840',
    'descricao': 'EIEEF FELIPE CAMARAO',
    'fone': '(69) 3322-3666',
    'latitude': '-12.74140310',
    'longitude': '-60.13045660'
  },
  {
    'inep': '11006129',
    'descricao': 'EIEEF FRANCISCO JOSE DE LACERDA',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11022558',
    'descricao': 'EIEEF HAP BITT TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11041030',
    'descricao': 'EIEEF HODINGA',
    'fone': '(69) 3441-2019',
    'latitude': '-11.09912299',
    'longitude': '-61.41898155'
  },
  {
    'inep': '11043482',
    'descricao': 'EIEEF HWEREIN CAT TOWA ORO NAO',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048093',
    'descricao': 'EIEEF IRIA DOS REIS FREITAS',
    'fone': '(69) 3621-2006',
    'latitude': '-12.06007520',
    'longitude': '-63.56918580'
  },
  {
    'inep': '11041277',
    'descricao': 'EIEEF JOAO EVANGELISTA DIAS',
    'fone': '(69) 3441-2019',
    'latitude': '-11.43467430',
    'longitude': '-61.45668610'
  },
  {
    'inep': '11006170',
    'descricao': 'EIEEF JOAO FRANCISCO ARUAK',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11068809',
    'descricao': 'EIEEF JOSE DOS SANTOS ARAUJO',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11049455',
    'descricao': 'EIEEF KABANEY',
    'fone': '(69) 3441-2422',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11038381',
    'descricao': 'EIEEF KAP SOGO TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11037962',
    'descricao': 'EIEEF KON KOATT TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11053216',
    'descricao': 'EIEEF KUBA TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11091800',
    'descricao': 'EIEEF LEONEL BUANGA CANOE',
    'fone': '(69) 3541-3559',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11047607',
    'descricao': 'EIEEF MAAMNZEEP CINTA LARGA',
    'fone': '(69) 3481-2781',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11106824',
    'descricao': 'EIEEF MATINA KONDA',
    'fone': '(69) 98155-9749',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11046236',
    'descricao': 'EIEEF MEKITON TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11042850',
    'descricao': 'EIEEF NAWACAN ORO WARAM XIJEIN',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048972',
    'descricao': "EIEEF NJY NJY' I",
    'fone': '(69) 99934-1253',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11049987',
    'descricao': 'EIEEF OYKATXER SURUI ',
    'fone': '(69) 3481-2396',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11041234',
    'descricao': 'EIEEF PAITEREY',
    'fone': '(69) 3441-2019',
    'latitude': '-11.43467430',
    'longitude': '-61.45668610'
  },
  {
    'inep': '11006390',
    'descricao': 'EIEEF PEDRO AZZI',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11043865',
    'descricao': 'EIEEF ROSANA CINTA LARGA',
    'fone': '(69) 3481-2781',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11038047',
    'descricao': 'EIEEF SAW D JO TUPARI',
    'fone': '(69) 3641-2555',
    'latitude': '-8.78035560',
    'longitude': '-63.87755710'
  },
  {
    'inep': '11028246',
    'descricao': 'EIEEF SERTANISTA BENEDITO BRIGIDO DA SILVA',
    'fone': '(69) 3481-2396',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11006579',
    'descricao': 'EIEEF TENENTE LIRA',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11039060',
    'descricao': 'EIEEF TENENTE MARQUES',
    'fone': '(69) 3481-2781',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11043890',
    'descricao': 'EIEEF TOME CINTA LARGA',
    'fone': '(69) 3481-2781',
    'latitude': '-11.50573410',
    'longitude': '-63.58061100'
  },
  {
    'inep': '11050292',
    'descricao': 'EIEEF TOP ARAM WARAM XIJEIN',
    'fone': '0000000',
    'latitude': null,
    'longitude': null
  },
  {
    'inep': '11067810',
    'descricao': 'EIEEF VALDEMAR CABIXI ',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11050284',
    'descricao': 'EIEEF WAL TRAN ORO WARAM',
    'fone': '(00) 0000-000',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11090804',
    'descricao': 'EIEEF WATACAO ORO MIXIC ORO AT',
    'fone': '(69) 3541-3559',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11043490',
    'descricao': 'EIEEF WEM CANUM ORO WARAM',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11066806',
    'descricao': 'EIEEF XIJAN ORO NAO',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11049065',
    'descricao': 'EIEEF YASYMYU TANHATA KWAZA',
    'fone': '(69) 00000-0000',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11048034',
    'descricao': 'EIEEF YWARA PURUBORA',
    'fone': '(69) 98405-6357',
    'latitude': '-11.76545620',
    'longitude': '-63.03140600'
  },
  {
    'inep': '11048921',
    'descricao': 'EIEEF. CO UM ORO WARAM',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048913',
    'descricao': 'EIEEF. DOM LUIZ GOMES DE ARRUDA',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11006161',
    'descricao': 'EIEEF. JOAO FARIAS DE BARROS',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11049642',
    'descricao': 'EIEEF. MAMXUM TAMANAIN ORO NAO',
    'fone': '(69) 3541-3834',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048891',
    'descricao': 'EIEEF. MARINA AIKOM ORO WIM',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048930',
    'descricao': 'EIEEF. MBIXIRE TAXO MACURAP',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048948',
    'descricao': 'EIEEF. PAKUIA TUPARI',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11026588',
    'descricao': 'EIEEFM IZIDORO DE SOUZA MEIRELLES',
    'fone': '(69) 3441-2019',
    'latitude': '-11.35809418',
    'longitude': '-61.37094051'
  },
  {
    'inep': '11049324',
    'descricao': 'EIEEFM MAMAINDE CABIXI',
    'fone': '(69) 3322-3666',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11041250',
    'descricao': 'EIEEFM NOA SURUI',
    'fone': '(69) 3441-2019',
    'latitude': '-11.43467430',
    'longitude': '-61.45668610'
  },
  {
    'inep': '11027134',
    'descricao': 'EIEEFM SERTANISTA FRANCISCO MEIRELES',
    'fone': '(69) 3441-2019',
    'latitude': '-11.42331730',
    'longitude': '-61.48055870'
  },
  {
    'inep': '11027142',
    'descricao': 'EIEEFM SERTANISTA JOSE DO CARMO SANTANA',
    'fone': '(69) 3441-2019',
    'latitude': '-61.00000000',
    'longitude': '-11.00000000'
  },
  {
    'inep': '11046635',
    'descricao': 'EIEEFM SOWAINTE',
    'fone': '(69) 3322-3666',
    'latitude': '-12.74140310',
    'longitude': '-60.13045660'
  },
  {
    'inep': '11027207',
    'descricao': 'EIEEFM TANCREDO NEVES',
    'fone': '(69) 3441-2019',
    'latitude': '-11.43467430',
    'longitude': '-61.45668610'
  },
  {
    'inep': '11087803',
    'descricao': 'EIEEI NAGAXIP SURUI',
    'fone': '(69) 3443-1303',
    'latitude': '-11.07665790',
    'longitude': '-61.50973800'
  },
  {
    'inep': '11006366',
    'descricao': 'EIEEIF PAULO SALDANHA SOBRINHO',
    'fone': '(69) 3541-2149',
    'latitude': '-10.78932100',
    'longitude': '-65.33010490'
  },
  {
    'inep': '11048581',
    'descricao': 'EIEEM KYOWÃ',
    'fone': '(69) 4400-7816',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11033274',
    'descricao': 'EIEMEF AIKANÃ',
    'fone': '(69) 3346-1107',
    'latitude': '-12.55582720',
    'longitude': '-60.90297490'
  },
  {
    'inep': '11003677',
    'descricao': 'EIMEF 04 DE AGOSTO',
    'fone': '69 3224 2187',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11033320',
    'descricao': 'EIMEF CAPITÃO ARITIMON',
    'fone': '(69) 3346-1107',
    'latitude': '-12.55582720',
    'longitude': '-60.90297490'
  },
  {
    'inep': '11048638',
    'descricao': 'ESCOLA ANISIO TEIXEIRA',
    'fone': '(69) 3222-7112',
    'latitude': '-8.75065330',
    'longitude': '-63.88790860'
  },
  {
    'inep': '11048956',
    'descricao': 'ESCOLA ESTADUAL DE EDUCAÇÃO BÁSICA E PROFISSIONAL ABAITARA',
    'fone': '',
    'latitude': null,
    'longitude': null
  },
  {
    'inep': '11000309',
    'descricao': 'ESCOLA ESTADUAL DE EDUCACAO INFANTIL MARISE CASTIEL',
    'fone': '(69) 3224-6835',
    'latitude': '-8.75107550',
    'longitude': '-63.91233730'
  },
  {
    'inep': '11003065',
    'descricao': 'IEE CARMELA DUTRA',
    'fone': '(69) 3216-5914',
    'latitude': '-8.75956270',
    'longitude': '-63.90944930'
  },
  {
    'inep': '11016094',
    'descricao': 'IEE MARECHAL RONDON',
    'fone': '(69) 3416-4863',
    'latitude': '-10.86069140',
    'longitude': '-61.97656900'
  },
  {
    'inep': '11006684',
    'descricao': 'IEE PAULO SALDANHA',
    'fone': '(69) 3541-7129',
    'latitude': '-10.78753950',
    'longitude': '-65.34047080'
  },
  {
    'inep': '11033827',
    'descricao': 'IEE WILSON CAMARGO',
    'fone': '(69) 3322-8866',
    'latitude': '-12.73992940',
    'longitude': '-60.14609190'
  },
  {
    'inep': '11048590',
    'descricao': 'JOJ MIT O MINIM',
    'fone': '(69) 3224-2187',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11048808',
    'descricao': 'KITY PYPYDNIPA',
    'fone': '(69) 3224-2187',
    'latitude': '-8.76116050',
    'longitude': '-63.90043030'
  },
  {
    'inep': '11106816',
    'descricao': 'MARIA DI SANCTI SANTOS',
    'fone': '(69) 3481-1746',
    'latitude': '-11.52303690',
    'longitude': '-61.01413010'
  },
  {
    'inep': '11042702',
    'descricao': 'NACEEJA MARECHAL CANDIDO RONDON',
    'fone': '(69) 3465-1112',
    'latitude': '-10.93026410',
    'longitude': '-62.26144530'
  },
  {
    'inep': '11046686',
    'descricao': "PEP'O TUPARI",
    'fone': '(69) 1111-1111',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  },
  {
    'inep': '11043385',
    'descricao': 'PROF. MARCOS ADRIANO ISSLER',
    'fone': '(69) 3466-1215',
    'latitude': '-10.91479880',
    'longitude': '-62.55513210'
  },
  {
    'inep': '11117800',
    'descricao': 'SOM DA CRAVIOLA',
    'fone': '(69) 3901-3211',
    'latitude': '-9.72051340',
    'longitude': '-63.31880370'
  },
  {
    'inep': '11111801',
    'descricao': 'WAIBERO TUPARI',
    'fone': '(69) 1111-1111',
    'latitude': '0.00000000',
    'longitude': '0.00000000'
  }
]
/* harmony export (immutable) */ __webpack_exports__["a"] = schools;



/***/ })
/******/ ]);