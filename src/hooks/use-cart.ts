import { useState } from "react";
import { CartLineItem } from "app/types";

export const useCart = () => {
  const [cart, setCart] = useState<CartLineItem[]>([]);

  const updateCart = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
      return;
    }
    if (cart.map((item) => item.productId).includes(productId)) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? {
                productId,
                quantity,
              }
            : item
        )
      );
      return;
    }
    setCart((prevCart) => [...prevCart, { productId, quantity }]);
  };

  return {
    cart,
    updateCart,
  };
};
