import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loadingCart,
        setLoadingCart,
        cartItems,
        setCartItems,
        loadingCartItems,
        setLoadingCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
