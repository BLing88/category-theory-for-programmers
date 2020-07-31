export function compose<X, Y, Z>(f: (x: X) => Y, g: (y: Y) => Z): (x: X) => Z {
  return (x) => g(f(x));
}

// const signString = (x: number) => {
//   if (x > 0) {
//     return "positive";
//   } else if (x === 0) {
//     return "zero";
//   } else {
//     return "negative";
//   }
// };

// const sign = (y: "positive" | "zero" | "negative") => {
//   if (y === "positive") {
//     return 1;
//   } else if (y === "zero") {
//     return 0;
//   } else if (y === "negative") {
//     return -1;
//   }
// };

// console.log(compose(signString, sign)(-10));
// console.log(compose(signString, sign)(1223));
// console.log(compose(signString, sign)(0));
