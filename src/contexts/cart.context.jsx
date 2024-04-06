import { createContext, useState } from "react";

const defaultState = {
  setIsCartOpen: () => {},
  isCartOpen: false,
};

export const CartContext = createContext({
  ...defaultState,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
