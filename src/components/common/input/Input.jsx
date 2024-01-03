import React, { useState } from "react";
import Style from "./input.module.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Input = ({ type, placeholder, iconClass ,onChange,required }) => {
  const [visible, setVisible] = useState(false);
  const handleOnClick = () => {
    setVisible(!visible);
  };
 
  return (
    <div className={Style.groupform}>
      <div className={Style.inputgroup}>
        {iconClass ? (
          <span className={Style.inputgrouptext1}>
            <i>{iconClass ? iconClass : null}</i>
          </span>
        ) : null}
        {type === "password" ? (
          <span className={Style.inputgrouptext}>
            <i onClick={handleOnClick}>
              {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </i>
          </span>
        ) : null}

        <input
          type={visible ? "text" : type}
          className="form-control"
          placeholder={placeholder}
          // value
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default Input;
