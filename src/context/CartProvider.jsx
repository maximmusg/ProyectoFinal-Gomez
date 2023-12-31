import { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);

  const addItem = (product, quantity) => {
    if (isInCart(product.id)) {
      const newProducts = products.map((item) => {
        if (item.id === product.id) {
          const newQuantity = item.quantity + quantity;
          if (newQuantity <= product.stock) {
            return {
              ...item,
              quantity: newQuantity,
            };
          } else {
            alert(
              "Stock insuficiente! Ya hay cantidad de este producto agregado en el carrito!"
            );
            return item;
          }
        }
        return item;
      });
      setProducts(newProducts);
    } else {
      quantity <= product.stock
        ? setProducts([...products, { ...product, quantity }])
        : console.log("No hay stock");
    }
  };

  const clear = () => {
    setProducts([]);
  };

  const removeItem = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const isInCart = (id) => {
    return products.some((product) => product.id === id);
  };

  useEffect(() => {
    setProductQuantity(
      products.reduce((acc, product) => acc + product.quantity, 0),
      0
    );
  }, [products]);

  return (
    <CartContext.Provider
      value={{ products, addItem, productQuantity, clear, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
