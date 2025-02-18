import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import CartItemContainer from "./carts/CartItemContainer";
import PriceContainer from "./carts/PriceContainer";

import FetchUserData from "./util/utilUsers/FetchUserData";

const CartPage = () => {
  const user = FetchUserData("IMART_SESSION");
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/userId/${user.id}/status/active`
      );

      if (!response) {
        throw new Error("Failed fetching cart by user Id and Status");
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Failed fetching cart by user Id and Status : ", err);
    } finally {
      setLoadingCart(false);
    }
  };

  const fetchCartItems = async () => {
    if (cart) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cart-items/cartId/${cart.id}`
        );

        if (!response) {
          throw new Error("Failed fetching all cart items: ");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        console.error("Failed fetching all cart items: ", err);
      } finally {
        setLoadingCartItems(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [cart]);

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
