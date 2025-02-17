import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const HomePage = () => {
  //   const userData = FetchUserData("IMART_SESSION");

  return (
    <div className="" style={{ minHeight: "100vh", width: "100vw" }}>
      <NavBar activePage="home" />
      hello World
    </div>
  );
};

export default HomePage;
