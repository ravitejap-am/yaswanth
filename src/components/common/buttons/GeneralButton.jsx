import { Button } from 'antd';
const GeneralButton = ({ buttonProps, buttonHandler }) => {
  console.log(buttonProps);
  return (
    <Button
      type={buttonProps.type}
      htmlType="submit"
      className="center"
      onClick={buttonHandler}
      style={{
        color: buttonProps.color,
        backgroundColor: buttonProps.backgroundColor,
        width: buttonProps.width,
        height: buttonProps.height,
      }}
    >
      {buttonProps.name}
    </Button>
  );
};
export default GeneralButton;
