import './App.css';
import fontStyle from './fontStyle.css';
import './css/style.css';
import Routes from '././Routes';
import { useSelector } from 'react-redux';
import ErrorMsg from './pages/errorHandler/InternalServerError/ErrorMsg';

function App() {
  const errorMsg = useSelector(state => state?.auth?.errorMsg);
console.log("errorMsg");
console.log("show error message--->",errorMsg);
const showErrorMsg = Object.keys(errorMsg)?.length > 0

  return (
  <>
  <Routes />
  {
    showErrorMsg &&
    <ErrorMsg 
      message={errorMsg}
    >
    </ErrorMsg>
  }
  </>
  );
}

export default App;
