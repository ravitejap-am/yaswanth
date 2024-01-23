import { Button } from "antd";
const GeneralButton = ({
  name,
  buttonProps,
  type,
  color,
  backgroundColor,
  width,
  height,
  // buttonHandler,
  isCallbackData,
  boxShadow,
  // borderRadius,
  borderRadius,
  border,
  icons,
}) => {
  console.log(buttonProps);
  return (
    <Button
      type={type}
      htmlType="submit"
      className="center"
      onClick={() => {
        if (!!isCallbackData) {
          // buttonHandler(isCallbackData);
        } else {
          // buttonHandler();
        }
      }}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        boxShadow: boxShadow,
        borderRadius: borderRadius,
        border: border,
      }}
    >
      {name}
      <img src={icons} style={{ marginLeft: "8px" }} alt="" />
    </Button>
  );
};
export default GeneralButton;
