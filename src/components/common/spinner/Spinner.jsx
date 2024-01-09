import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <div style={{ backgroundColor: "transparent",display:"flex",justifyContent:"center",alignItems:"center" }}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              height: "30vh",
              backgroundColor: "transparent",
              fontSize: 100,
            }}
            spin
          />
        }
      />
      ;
    </div>
  );
};

export default Spinner;
