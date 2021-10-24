import { useState } from "react";

export default function Progress(props) {
  const prog = props.val + "%";
  return (
    <div style={{ marginBottom: 30 }}>
      <div className="progress-full">
        <div
          style={{
            height: 10,
            background: "#37CC69",
            marginTop: 5,
            borderRadius: 4,
            width: prog,
            maxWidth: "50vw",
          }}
        ></div>
      </div>
    </div>
  );
}
