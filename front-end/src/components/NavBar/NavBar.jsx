import React, { act, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBarLink from "./NavBarLink";

import { fetchUserBySession } from "../utility/userUtility/fetchUserBySession";

const NavBar = ({ activePage }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserBySession("IMART_SESSION", setUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("IMART_SESSION");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ps-5 pe-5 "
      style={{
        backgroundColor: "#384B70",
        position: "fixed",
        width: "100vw",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        {/* Logo Section */}
        <Link className="navbar-brand fw-bold " to="/">
          IMART
        </Link>

        {/* Link Section */}

        <div
          className="d-flex flex-row justify-content-center gap-3 "
          id="navbarNav"
        >
          <NavBarLink
            label="Home"
            path="/"
            page="home"
            activePage={activePage}
          />

          {userData && userData.role === "user" && (
            <NavBarLink
              label="Products"
              path="/products"
              page="products"
              activePage={activePage}
            />
          )}

          {userData && userData.role === "user" && (
            <NavBarLink
              label="Cart"
              path="/cart"
              page="cart"
              activePage={activePage}
            />
          )}

          {userData && userData.role === "admin" && (
            <NavBarLink
              label="Inventory"
              path="/inventory"
              page="inventory"
              activePage={activePage}
            />
          )}

          {userData && userData.role === "admin" && (
            <NavBarLink
              label="Transactions"
              path="/transactions"
              page="transactions"
              activePage={activePage}
            />
          )}

          {userData && userData.role === "admin" && (
            <NavBarLink
              label="Promotions"
              path="/promotions"
              page="promotions"
              activePage={activePage}
            />
          )}

          <NavBarLink
            label="SmartBot"
            path="/smartbot"
            page="smartbot"
            activePage={activePage}
          />
        </div>

        {/* Profile Section */}

        <div className="d-flex gap-2">
          {userData && (
            <Link
              className="btn fw-bold"
              style={{ color: "white" }}
              to="/profile"
            >
              {userData.username}
            </Link>
          )}

          {userData && (
            <button
              className="btn fw-bold rounded-pill bg-light"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          {!userData && (
            <Link
              className="btn fw-bold"
              style={{ color: "white" }}
              to="/register"
            >
              Sign Up
            </Link>
          )}

          {!userData && (
            <Link
              className="btn fw-bold rounded-pill bg-light"
              style={{}}
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
