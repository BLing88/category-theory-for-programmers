function memoize<X, Y>(f: (x: X) => Y): (x: X) => Y {
  const hashTable = new Map<X, Y>();
  return (x: X) => {
    if (hashTable.has(x)) {
      return hashTable.get(x);
    } else {
      const result = f(x);
      hashTable.set(x, result);
      return result;
    }
  };
}

const naiveFibonacci = (n: number): number => {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return naiveFibonacci(n - 1) + naiveFibonacci(n - 2);
  }
};

const start = process.hrtime.bigint();
console.log(naiveFibonacci(20));
console.log("non-memoized:", process.hrtime.bigint() - start);

const memoizedFib = memoize(naiveFibonacci);
const start2 = process.hrtime.bigint();
console.log(memoizedFib(20));
console.log("memoized:", process.hrtime.bigint() - start2);
