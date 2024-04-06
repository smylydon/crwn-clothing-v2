import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

const addCartItem = (cartItems, productToAdd) => {
  const item = cartItems.find((item) => {
    return productToAdd.id === item.id;
  });

  if (item) {
    item.quantity++;

    return cartItems.map((item) => {
      return item.id === productToAdd
        ? { ...productToAdd, quantity: item.product + 1 }
        : item;
    });
  }

  return [
    {
      ...productToAdd,
      quantity: 1,
    },
    ...cartItems,
  ];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
