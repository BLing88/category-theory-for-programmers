We have our candidate coproduct of `number` (since `int` isn’t a type in Typescript, so we'll think of `number` as `int`) and `boolean` with the injections `i: number -> number` and `j: boolean -> number` defined by 

```ts
function i(n: number): number {
    return n;
}
```

```ts
function j(b: boolean): number {
    return b ? 0 : 1;
}
```

We can factorize `i` and `j` by defining `m: Either<number, boolean> -> number` by

```ts
function m(x: Either<number, boolean>): number {
    if (isLeft<number>(x)) {
        return i(x);
    } else if (isRight<boolean>(x)) {
        return j(x);
    }
}
```

## Why is `number` not better than `Either<number, boolean>` as coproduct?

`number` with the injections `i` and `j` cannot be better than `Either<number, boolean>` because there is no unique morphism from `number` to `Either<number, boolean>` that factorizes `Either`'s injections `a: number -> Either<number, boolean>` and `b: boolean -> Either<number, boolean>`, where (in pseudocode) 
`a(n) = Left<number>(n)` and `b(t) = Right<boolean>(t)`.

There would need to exist a unique `m': number -> Either<number, boolean>` such that `a = m'`&compfn;`i` and `b = m'`&compfn;`j`. 

Intuitively, `number` doesn’t have information about `boolean`. The image of the injection `j`, namely {0, 1}, overlaps with `number`, so that when trying to factorize `a` and `b`, a factorizing `m'` cannot tell whether 0 (or 1) came from `number` or `boolean`.

In particular, `a(0)` needs to return `Left<number>(0)`, which would require `a(0) = m'(i(0)) = m'(0) = Left<number>(0)`.

On the other hand, `j(true) = 0`, which implies `b(true) = m'(j(true)) = m'(0)`. But `b(true)` equals `Right<boolean>(true)`, which implies `m'(0) = Right<boolean>(true)`. Thus there can’t exist such an `m'`.

## A different injection?

Suppose we chose a different injection `i: number -> number` where
```ts
function i(n: number): number {
    return n < 0 ? n : n + 2;
}
```
and keep `j` as above. 

Note we can factorize `i` and `j` using the same `m` as before, just replacing the function `i` refers to.

Does there exist a morphism `m': number -> Either<number, boolean>` that factors `a` and `b` in terms of the `j` and the new `i`?

The new `i` seems to avoid the problem the old `i` faced, in that `m'` could not tell where 0 or 1 came from.  

Let’s try defining
```ts
function mPrime(n: number): Either<number, boolean> {
    if (n === 0) {
        return Right<boolean>(true);
    } if (n === 1) {
        return Right<boolean>(false);
    } else {
        return Left<number>(n < 0 ? n : n - 2);
    }
}
```

Do the equations `a = m'`&compfn;`i` and `b = m'`&compfn;`j` hold?

For all numbers `n` we require `a(n) = Left<number>(n)`, and we also require `b(true) = Right<boolean>(true)` and `b(false) .= Right<boolean>(false)`.

Note that if `n < 0`, then `m'(i(n)) = m'(n) = Left<number>(n)`. If `n ≥ 0`, then `m'(i(n)) = m'(n + 2) = Left<number>((n + 2) - 2) = Left<number>(n)`.

Thus `a = m'`&compfn;`i`. 

Now let’s consider `m'`&compfn;`j`. We have `m'(j(true)) = m'(0) = Right<boolean>(true)` and `m'(j(false)) = m'(1) = Right<boolean>(false)`. Note that `i(n)` never equals 0 or 1.

Thus `b = m'`&compfn;`j`, and `m'` factors `a` and `b`. Note that this is the only possible `m'` that factorizes `a` and `b`, and that `m'` and `m` form an isomorphism as you can check. 

So `number` along with these two injections `i` and `j` form an equivalent coproduct of `number` and `boolean`.

However, from a practical point-of-view `Either<number, boolean>` is better, since `number` takes on a finite set of values, so `n + 2` could overflow. `Either` is also semantically clearer.

## Too many morphisms to `Either`
Let’s consider `number` again with `j`, but now let’s define 
```ts
function i(n: number): number {
    return n < 0 ? n : n + 3;
}
```
If we try to come up with a morphism `m': number -> Either<number, boolean>` we end up with more than one possible `m'`. Consider the same `m'` as above, but now we need to define `m'(2)`, and there is no unique way to do. 