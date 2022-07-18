import React from "react";
import {Spin} from "antd";
import "./index.css";

function FullPageLoader({tip, size, className, className2, indicator}) {
    return (
        <div className={`${className ? className : "loader"} ${className2}`}>
            <Spin indicator={indicator ? indicator : undefined} size={size} tip={tip} spinning />
        </div>
    );
}

export default FullPageLoader;
