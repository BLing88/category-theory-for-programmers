The product of two objects `x` and `y` in a poset `P` is the greatest lower bound `w` of `x` and `y`, if one exists, with projection morphisms `f: w -> x` and `g: w -> y` corresponding to the statements `w ≤ x` and `w ≤ y`. This is also known as the _meet_ of `x` and `y`.

To see this, note that any such product must have unique morphisms to `x` and `y`. Let `w'` be a lower bound of `x` and `y`. Thus `w' ≤ x` and `w' ≤ y`, which says that there are morphisms `f': w' -> x` and `g': w' -> y`. Since `P` is a poset, there can be at most one morphism between any two objects, so `f'` and `g'` are unique. 

Since `w` is assumed to be the greatest lower bound, this implies that `w' ≤ w`, so that there is a morphism `h: w' -> w`. Moreover, `h` must be unique. 

The requirement that `h` factorizes `f` and `g` in terms of `f` and `g` corresponds to the transitivity of `≤` in `P`.

Thus we see that `w` satisfies the definition of the product of `x` and `y`.

By a similar argument, the coproduct of `x` and `y` is the least upper bound of `x` and `y`, if one exists. This is also known as the _join_ of `x` and `y`.