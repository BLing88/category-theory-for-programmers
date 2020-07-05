function memoize<X, Y>(f: (x: X) => Y): (x: X) => Y {
  const hashTable = new Map<X, Y>();
  return (x: X) => {
    if (hashTable.get(x)) {
      return hashTable.get(x);
    } else {
      const result = f(x);
      hashTable.set(x, result);
      return result;
    }
  };
}
