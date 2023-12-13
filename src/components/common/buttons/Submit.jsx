import './buttons.css';
const Submit = ({ title, onclickHandler }) => {
  return (
    <button
      type="submit"
      onClick={onclickHandler}
      className="submitButton center butooneffect"
    >
      {title}
    </button>
  );
};
export default Submit;
