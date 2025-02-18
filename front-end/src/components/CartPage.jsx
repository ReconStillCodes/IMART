import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import CartItemContainer from "./carts/CartItemContainer";
import PriceContainer from "./carts/PriceContainer";

import { fetchUserBySession } from "./utility/userUtility/fetchUserBySession";
import { fetchActiveCart } from "./utility/cartUtility/fetchActiveCart";
import { fetchCartItemByCartId } from "./utility/cartItemUtility/fetchCartItemByCartId";

const CartPage = () => {
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

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
      setLoadingCart(false);
      fetchCartItemByCartId(cart.id, setCartItems, setLoadingCartItems);
    }
  }, [cart]);

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
          <CartItemContainer cartItems={cartItems} />
          <PriceContainer />
        </div>
      )}
    </div>
  );
};

export default CartPage;
