import React from "react";
import {Layout} from "antd";

export default function Footer({text, className, footerClass}) {
  const {Footer} = Layout;

  return (
    <Footer className={`${className ? className : "footer"}`}>
      <div className={`${footerClass ? footerClass : "footer"}`}>FIA DEALERSHIP INC.</div>
    </Footer>
  );
}
