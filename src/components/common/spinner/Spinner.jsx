import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setFontSize(50);
      } else {
        setFontSize(100);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "transparent",display:"flex",justifyContent:"center",alignItems:"center" }}>
      <Spin
       fullscreen
        indicator={
          <LoadingOutlined
            style={{
              // height: "30vh",
              backgroundColor: "transparent",
              fontSize: `${fontSize}px`,
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
