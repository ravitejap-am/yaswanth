import { Button } from 'antd';

const GeneralButton = (props) => {
  const {
    name,
    buttonProps,
    type,
    color,
    backgroundColor,
    width,
    height,
    marginLeft, // buttonHandler,
    isCallbackData,
    boxShadow,
    // borderRadius,
    borderRadius,
    border,
    icons,
    marginTop,
  } = props;
  console.log(props);
  return (
    <Button
      type={type}
      htmlType="submit"
      className="center"
      onClick={() => {
        // alert('hi');
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
