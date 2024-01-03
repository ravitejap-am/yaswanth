
import { Button } from "antd";
const GeneralButton = ({
  name,
  buttonProps,
  type,
  color,
  backgroundColor,
  width,
  height,
  buttonHandler,
  isCallbackData,

}) => {
  console.log(buttonProps);
  return (
    <Button
      type={type}
      htmlType="submit"
      className="center"
      onClick={() => {
        if (!!isCallbackData) {
          buttonHandler(isCallbackData);
        } else {
          buttonHandler();
        }
      }}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        width: width,
        height: height,
      }}
    >
      {name}
    </Button>
  );
};
export default GeneralButton;
