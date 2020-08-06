type Writer<A> = [A, string];

function composeWriter<A, B, C>(
  f: (a: A) => Writer<B>,
  g: (b: B) => Writer<C>
): (a: A) => Writer<C> {
  return (x: A) => {
    const [y, s1] = f(x);
    const [z, s2] = g(y);

    return [z, s1 + s2];
  };
}

function identityWriter<A>(a: A): Writer<A> {
  return [a, ""];
}

// Example:

function upCase(s: string): Writer<string> {
  return [s.toLocaleUpperCase(), "upCase "];
}

function toWords(s: string): Writer<string[]> {
  return [s.split(" "), "toWords "];
}

const processString: (s: string) => Writer<string[]> = composeWriter(
  upCase,
  toWords
);

console.log(processString("hello world!")); // [ [ 'HELLO', 'WORLD!' ], 'upCase toWords ' ]
