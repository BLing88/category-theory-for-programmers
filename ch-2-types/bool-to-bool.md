There are 4 functions from `Bool` to `Bool`. 

In Typescript we can implement them as

1.  
   ```ts
   function id(x: boolean): boolean {
       return x;
   }
   ```

1.  
   ```ts
   function not(x: boolean): boolean {
       return !x;
   }
   ```

1.  
   ```ts
   function alwaysTrue(x: boolean): boolean {
       return true;
   }
   ```

1.  
   ```ts
   function alwaysFalse(x: boolean): boolean {
       return false;
   }
   ```

In Haskell we can implement them as

1.  
   ```haskell
   id :: Bool -> Bool
   id True = True
   id False = False
   ```

1. 
   ```haskell
   not :: Bool -> Bool
   not True = False
   not False = True
   ```

1. 
   ```haskell
   alwaysTrue :: Bool -> Bool
   alwaysTrue _ = True
   ```

1. 
   ```haskell
   alwaysFalse :: Bool -> Bool
   alwaysFalse _ = False
   ```
