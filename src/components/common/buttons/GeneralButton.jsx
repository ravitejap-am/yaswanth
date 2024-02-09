import { Button } from "antd";

const GeneralButton = (props) => {
  const {
    name,
    buttonHandler,
    type,
    color,
    backgroundColor,
    width,
    height,
    marginLeft,
    boxShadow,
    borderRadius,
    border,
    icons,
    marginTop,
    buttonLoading = false,
  } = props;

  const handleClick = () => {
    console.log("buttonHandler:", buttonHandler);
    if (buttonHandler) {
      buttonHandler();
    } else {
      console.error("buttonHandler is not defined.");
    }
  };

  return (
    <Button
      type={type}
      htmlType="submit"
      className="center"
      onClick={handleClick}
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
      {icons && <img src={icons} style={{ marginLeft: "8px" }} alt="" />}
    </Button>
  );
};

export default GeneralButton;
 