import React from 'react';
import { Button } from 'antd';

const GeneralButton = (props) => {
  const {
    name,
    buttonHandler = () => {}, // Include buttonHandler in the destructured props
    buttonProps,
    type,
    color,
    backgroundColor,
    width,
    height,
    marginLeft,
    isCallbackData,
    boxShadow,
    borderRadius,
    border,
    icons,
    marginTop,
    buttonLoading = false,
  } = props;

  return (
    <Button
      type={type}
      htmlType="submit"
      className="center"
      onClick={() => {
        if (!!isCallbackData && buttonHandler) {
          // Ensure buttonHandler is defined
          buttonHandler(isCallbackData);
        } else {
          // Handle the case where buttonHandler is not defined
          console.error('buttonHandler is not defined.');
        }
      }}
      loading={buttonLoading}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        boxShadow: boxShadow,
        borderRadius: borderRadius,
        border: border,
        marginLeft: marginLeft,
        marginTop: marginTop,
      }}
    >
      {name}
      <img src={icons} style={{ marginLeft: '8px' }} alt="" />
    </Button>
  );
};

export default GeneralButton;
