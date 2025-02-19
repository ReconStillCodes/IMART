import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import CartItemContainer from "./carts/CartItemContainer";
import PriceContainer from "./carts/PriceContainer";

import { useCart } from "./carts/CartContext/CartContext";

import { fetchUserBySession } from "./utility/userUtility/fetchUserBySession";
import { fetchActiveCart } from "./utility/cartUtility/fetchActiveCart";
import { fetchCartItemByCartId } from "./utility/cartItemUtility/fetchCartItemByCartId";
import { putCartCalculateTotalPrice } from "./utility/cartUtility/putCartCalculateTotalPrice";

const CartPage = () => {
  const [user, setUser] = useState(null);

  const {
    cart,
    setCart,
    loadingCart,
    setLoadingCart,
    cartItems,
    setCartItems,
    loadingCartItems,
    setLoadingCartItems,
  } = useCart();

  useEffect(() => {
    fetchUserBySession("IMART_SESSION", setUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchActiveCart(user.id, setCart);
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      const fetchData = async () => {
        try {
          await putCartCalculateTotalPrice(cart.id, setCart);
          await fetchCartItemByCartId(cart.id, setCartItems);
        } finally {
          setLoadingCart(false);
        }
      };
      fetchData();
    }
  }, [cart?.id]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setLoadingCartItems(false);
    }
  }, [cartItems]);

  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <NavBar activePage="cart" />

      {loadingCart && loadingCartItems ? (
        <div></div>
      ) : (
        <div
          className="w-100 container d-flex flex-row gap-5 "
          style={{ paddingTop: "80px" }}
        >
          <CartItemContainer />
          <PriceContainer />
        </div>
      )}
    </div>
  );
};

export default CartPage;
