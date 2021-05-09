import * as React from "react";

import "../../styles/ProgressBar.css";

export var ProgressBar = (props) => {
  const width = props.width;
  const percent = props.percent;

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * width * 0.01);
  });

  return (
    <div className={"progressComp"}>
      {/* <h1 className="percent-number">{status}</h1> */}
      <div className="progress-div" style={{ width: width, marginTop: '5%'}}>
      <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
}
