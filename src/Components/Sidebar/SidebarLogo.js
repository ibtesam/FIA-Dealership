import React from "react";
import {Link} from "react-router-dom";
// import Logo from "../../assets/logo/parent-pass-logo.svg";
import MainLogo from "../../Assets/car2.svg";

const SidebarLogo = () => {
  return (
    <Link to="/vehicles" className="site-logo side-logo-container">
      <img src={MainLogo} width={50} height={50} alt="app-logo" />
      <p className="logo-text">FIA Dealership</p>
    </Link>
  );
};

export default SidebarLogo;
