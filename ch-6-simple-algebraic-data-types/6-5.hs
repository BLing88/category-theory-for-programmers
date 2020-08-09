-- a + a corresponds to Either a a and 2 * a corresponds to (Bool, a)
sumToProduct :: Either a a -> (Bool, a)
sumToProduct (Left a) = (True, a)
sumToProduct (Right a) = (False, a)

productToSum :: (Bool, a) -> Either a a
productToSum (True, a) = Left a
productToSum (False, a) = Right a

alternativeSumToProduct :: Either a a -> (Bool, a)
alternativeSumToProduct (Left a) = (False, a)
alternativeSumToProduct (Right a) = (True, a)

alternativeProductToSum :: (Bool, a) -> Either a a
alternativeProductToSum (True, a) = Right a
alternativeProductToSum (False, a) = Left a