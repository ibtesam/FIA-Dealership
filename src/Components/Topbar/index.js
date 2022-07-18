import React from "react";
import {Layout} from "antd";
import {useLocation} from "react-router";

const {Header} = Layout;

const TopBar = () => {
  const {pathname} = useLocation()

  return (
    <Header>
      <h1 className="margin-0" style={{color: "#fff"}}>
        {pathname.split("/")[1].toUpperCase().split("-").join(" ")}
      </h1>
    </Header>
  );
};

export default TopBar;
