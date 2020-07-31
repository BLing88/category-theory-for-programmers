import { compose } from "./composition";
import { identity } from "./identity";

const square = (x: number) => x * x;

console.log(compose(square, identity)(3));
console.log(compose(identity, square)(3));
console.log(compose(square, identity)(-4));
console.log(compose(identity, square)(-4));
