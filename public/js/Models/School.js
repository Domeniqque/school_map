class School {
  constructor(data) {
    this._data = data;
    Object.freeze(this);
  }

  get inep() {
    return this.inep;
  }

  get descricao() {
    return this.descricao;
  }

  get fone() {
    return this.fone;
  }

  get latitude() {
    return this.latitude;
  }

  get longitude() {
    return this.longitude;
  }
}