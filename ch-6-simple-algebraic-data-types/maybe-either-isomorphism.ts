// Maybe type implementation
// adapted from https://engineering.dollarshaveclub.com/typescript-maybe-type-and-module-627506ecc5c8
// could you do something like type Maybe<T> = null | T with type guard
// isDefined(x: Maybe<T>): x is T { return x !== null } ?

import { EIDRM } from "constants";

enum MaybeType {
  Nothing = "maybe-type_nothing",
  Just = "maybe-type_just",
}

interface Nothing {
  readonly type: typeof MaybeType.Nothing;
}

interface Just<T> {
  readonly type: typeof MaybeType.Just;
  readonly value: T;
}

type Maybe<T> = Nothing | Just<T>;

const nothingFactory = (): Nothing =>
  Object.freeze({ type: MaybeType.Nothing });

const justFactory = <T>(value: T): Just<T> =>
  Object.freeze({ type: MaybeType.Just, value });

// type guards
const isNothing = <T>(x: Maybe<T>): x is Nothing =>
  x.type === MaybeType.Nothing;
const isJust = <T>(x: Maybe<T>): x is Just<T> => x.type === MaybeType.Just;

// Either type implementation
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

const maybeToEither = <A>(x: Maybe<A>): Either<A, null> => {
  if (isJust(x)) {
    return Left(x.value);
  } else {
    return Right<null>(null);
  }
};

const eitherToMaybe = <A>(x: Either<A, null>): Maybe<A> => {
  if (isLeft(x)) {
    return justFactory(x.value);
  } else {
    return nothingFactory();
  }
};
