import React from "react";
import { Link } from "react-router-dom";

const NavBarLink = ({ label, path, page, activePage }) => {
  const linkStyle = {
    color: activePage === page ? "white" : "darkgray",
  };

  return (
    <Link className="nav-link" to={path} style={linkStyle}>
      {label}
    </Link>
  );
};

export default NavBarLink;
