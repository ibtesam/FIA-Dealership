import React, { memo } from "react";
import MainApp from "./MainApp";

const Index = (props) => {
  return <MainApp {...props} />;
};

export default memo(Index);
