// prototype-class-based approach
interface Shape {
  area: number;
  circ: number;
}

class Circle implements Shape {
  r: number;
  constructor(r: number) {
    if (r >= 0) {
      this.r = r;
      Object.freeze(this);
    } else {
      throw new Error("Circle r cannot be negative.");
    }
  }

  get area() {
    return Math.PI * this.r * this.r;
  }

  get circ() {
    return 2 * Math.PI * this.r;
  }
}
Object.freeze(Circle.prototype);

class Rect implements Shape {
  d: number;
  h: number;
  constructor(d: number, h: number) {
    if (d >= 0 && h >= 0) {
      this.d = d;
      this.h = h;
      Object.freeze(this);
    } else {
      throw new Error("Rect d or h cannot be negative");
    }
  }
  get area() {
    return this.d * this.h;
  }

  get circ() {
    return 2 * (this.d + this.h);
  }
}
Object.freeze(Rect.prototype);

class Square implements Shape {
  s: number;
  constructor(s: number) {
    if (s >= 0) {
      this.s = s;
      Object.freeze(this);
    } else {
      throw new Error("Square s cannot be negative.");
    }
  }

  get area() {
    return this.s * this.s;
  }

  get circ() {
    return 4 * this.s;
  }
}
Object.freeze(Square.prototype);

type Shapes = Circle | Rect | Square;

let x = new Circle(3);
console.log(x);
