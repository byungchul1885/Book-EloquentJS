class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vecAdded) {
    this.x += vecAdded.x;
    this.y += vecAdded.y;
    return this;
  }

  minus(vecMinus) {
    this.x -= vecMinus.x; /* this is just git test */
    this.y -= vecMinus.y;
    return this;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
