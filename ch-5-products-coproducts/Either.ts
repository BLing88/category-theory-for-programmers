interface Left<A> {
  value: A;
  readonly tag: "left";
}

interface Right<B> {
  value: B;
  readonly tag: "right";
}

type Either<A, B> = Left<A> | Right<B>;

// define type guards
function isLeft<A>(val: Either<A, any>): val is Left<A> {
  return val.tag === "left";
}
function isRight<B>(val: Either<any, B>): val is Right<B> {
  return val.tag === "right";
}

// data constructors
// we can use a getter to enforce immutability of the tag
// could use closure instead
function Left<A>(val: A): Left<A> {
  return {
    value: val,
    get tag(): "left" {
      return "left";
    },
  };
}

function Right<B>(val: B): Right<B> {
  return {
    value: val,
    get tag(): "right" {
      return "right";
    },
  };
}

function factorizer<A, B, C>(
  f: (a: A) => C,
  g: (b: B) => C
): (x: Either<A, B>) => C {
  return (x: Either<A, B>) => {
    if (isLeft(x)) {
      return f(x.value);
    } else if (isRight(x)) {
      return g(x.value);
    }
  };
}

let x: Either<number, string>;
x = Left(3);
console.log(x);
console.log(x.tag);
x.value = 4;
console.log(x);
console.log(x.tag);
x = Right("hi");
console.log(x);
console.log(x.tag);
