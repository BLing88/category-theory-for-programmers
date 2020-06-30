/**
 *
 * @param x
 * returns x
 */
function identity<T>(x: T): T {
  return x;
}

let output = identity("hi");
console.log(output);
