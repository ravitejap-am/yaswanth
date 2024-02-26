import React, { useState } from 'react';
import Style from './input.module.css';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Input = ({
  type,
  placeholder,
  iconClass,
  onChange,
  required,
  style,
  labelName,
  defaultValue = '',
  pattern = null,
  onBlur = null,
  iconStyle,
  disabled = false,
}) => {
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
        {/* {type === "password" ? (
          <span className={Style.inputgrouptext}>
            <i onClick={handleOnClick}>
              {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </i>
          </span>
        ) : null} */}
        <div className={Style.labelStyle}>
          <label>{labelName ? labelName : null}</label>
          <input
            type={visible ? 'text' : type}
            className={Style.formStyle}
            placeholder={placeholder}
            // value
            onChange={onChange}
            required={required}
            style={style}
            defaultValue={defaultValue}
            pattern={pattern}
            onBlur={onBlur}
            disabled={disabled}
          />
        {type === "password" && (
          <span
            className={Style.inputIcon}
            style={iconStyle}
            onClick={handleOnClick}
          >
            {visible ? <Visibility  />: <VisibilityOff  />}
          </span>
        )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default Input;
