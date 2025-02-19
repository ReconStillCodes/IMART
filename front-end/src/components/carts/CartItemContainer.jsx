import React, { useState, useEffect } from "react";

import CartDivider from "./CartItemComponents/CartDivider";
import CartItem from "./CartItemComponents/CartItem";

import { useCart } from "./CartContext/CartContext";

import { putCartItemUpdateQuantity } from "../utility/cartItemUtility/putCartItemUpdateQuantity";
import { deleteCartItem } from "../utility/cartItemUtility/deleteCartItem";

const CartItemContainer = () => {
  const { cartItems, setCartItems } = useCart();
  const [updatedItem, setUpdatedItem] = useState(null);

  const handleUpdateQuantity = async (itemId, change) => {
    try {
      await putCartItemUpdateQuantity(itemId, change, setUpdatedItem);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    if (updatedItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? {
                ...item,
                quantity: updatedItem.quantity,
                totalPrice: updatedItem.totalPrice,
              }
            : item
        )
      );
    }
  }, [updatedItem?.quantity]);

  const handleDeleteCartItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (err) {
      console.error("Error deleting item  ", err);
    }
  };

  return (
    <div className="d-flex flex-column " style={{ width: "55%" }}>
      <CartDivider />

      {cartItems.map((item) => (
        <span key={item.id}>
          <CartItem
            item={item}
            handleUpdateQuantity={handleUpdateQuantity}
            handleDeleteCartItem={handleDeleteCartItem}
          />

          <CartDivider />
        </span>
      ))}
    </div>
  );
};

export default CartItemContainer;
