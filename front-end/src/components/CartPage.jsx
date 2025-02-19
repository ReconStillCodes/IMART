import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import CartItemContainer from "./carts/CartItemContainer";
import PriceContainer from "./carts/PriceContainer";

import { useCart } from "./carts/CartContext/CartContext";

import { fetchUserBySession } from "./utility/userUtility/fetchUserBySession";
import { fetchActiveCart } from "./utility/cartUtility/fetchActiveCart";
import { fetchCartItemByCartId } from "./utility/cartItemUtility/fetchCartItemByCartId";
import { putCartCalculateTotalPrice } from "./utility/cartUtility/putCartCalculateTotalPrice";
import { postCart } from "./utility/cartUtility/postCart";

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [isActiveChecked, setActiveChecked] = useState(false);

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
      fetchActiveCart(user.id, setCart, setActiveChecked);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (!cart) {
        postCart(user.id, 0, "active", setCart);
      }
    }
  }, [isActiveChecked]);

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
          {cartItems.length > 0 ? (
            <>
              <CartItemContainer />
              <PriceContainer />
            </>
          ) : (
            <div className="w-100 d-flex justify-content-center">
              <img src="src/assets/no-item-found.png" alt="No Item Found" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
