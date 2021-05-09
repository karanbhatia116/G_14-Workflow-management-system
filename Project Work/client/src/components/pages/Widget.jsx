import "../../styles/Widget.css";

import React from "react";

export const Widget = (props) => {
    return (
        <div
            className="widget"
            style={{ width: `${props.width}px`, height: `${props.height}px` }}
        >
            <div className="content">{props.children}</div>
        </div>
    );
};
