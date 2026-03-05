import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("auraart_cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("auraart_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, selectedSize = "") => {
    setItems((prev) => {
      const index = prev.findIndex(
        (item) => item.productId === product._id && item.selectedSize === selectedSize
      );
      if (index !== -1) {
        const next = [...prev];
        next[index].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "",
          quantity: 1,
          selectedSize
        }
      ];
    });
  };

  const updateQty = (productId, selectedSize, quantity) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId, selectedSize) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.selectedSize === selectedSize))
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQty, removeItem, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
