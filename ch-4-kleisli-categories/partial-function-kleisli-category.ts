const tolerance = 0.000000000001;

// Non-class factory-style implementation
// Note that an advantage of this implementation over the class implementation
// is that _value and _isValid are automatically private and thus immutable by using a closure.
// See the example at the end of the class implementation for an example of _isValid
// returning true for an invalid value.

interface Optional<A> {
  readonly isValid: boolean;
  readonly value: A;
}

function createOptional<A>(value?: A): Optional<A> {
  const _isValid = value !== undefined;
  const _value = value;

  return Object.freeze({
    get isValid() {
      return _isValid;
    },

    get value() {
      if (_isValid) {
        return _value;
      } else {
        throw new Error(`Invalid Optional value`);
      }
    },
  });
}

function composeOptional<A, B, C>(
  f: (a: A) => Optional<B>,
  g: (b: B) => Optional<C>
) {
  return (a: A) => {
    const resultA = f(a);

    if (resultA.isValid) {
      return g(resultA.value);
    } else {
      return createOptional<C>();
    }
  };
}

function identityOptional<A>(a: A): Optional<A> {
  return createOptional<A>(a);
}

function safeSqrt(x: number): Optional<number> {
  return Math.abs(x) >= 0
    ? createOptional(Math.sqrt(x))
    : createOptional<number>();
}

function safeReciprocal(x: number): Optional<number> {
  return Math.abs(x) > tolerance
    ? createOptional(1 / x)
    : createOptional<number>();
}

const safeRootReciprocal = composeOptional(safeSqrt, safeReciprocal);

console.log(safeRootReciprocal(2).value);
console.log(safeRootReciprocal(0).isValid);
console.log(safeRootReciprocal(-2).isValid);

// "class" implementation

class OptionalClass<A> {
  _isValid: boolean;
  _value: A;
  constructor(value?: A) {
    this._isValid = value !== null && value !== undefined;
    this._value = value;
  }

  get isValid() {
    return this._isValid;
  }

  get value() {
    if (this.isValid) {
      return this._value;
    } else {
      throw new Error(`Invalid Optional value`);
    }
  }
}

function optionalIdentity<A>(x: A) {
  return new OptionalClass(x);
}

function composeOptionalClass<A, B, C>(
  f: (a: A) => OptionalClass<B>,
  g: (b: B) => OptionalClass<C>
): (a: A) => OptionalClass<C> {
  return (a: A) => {
    const firstResult = f(a);
    return firstResult.isValid ? g(firstResult.value) : new OptionalClass<C>();
  };
}

function safeSqrtClass(x: number) {
  return x >= 0
    ? new OptionalClass<number>(Math.sqrt(x))
    : new OptionalClass<number>();
}

function safeReciprocalClass(x: number) {
  return Math.abs(x) > tolerance
    ? new OptionalClass(1 / x)
    : new OptionalClass<number>();
}

const safeRootReciprocalClass = composeOptionalClass(
  safeSqrtClass,
  safeReciprocalClass
);

console.log(safeRootReciprocalClass(2));
console.log(safeRootReciprocalClass(0));
console.log(safeRootReciprocalClass(-2));

// uh-oh
let x = safeRootReciprocalClass(2);
x._value = -2;
// _value is now -2, which was not a possible value for the reciprocal square root,
// but _isValid is true
console.log(x);
