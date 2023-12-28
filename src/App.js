
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPageError from "./pages/errorHandler/LoginPageError";
// import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import RegisterUser from "./pages/registerUser/RegisterUser";
// import SignIN from '.';
import SignIn from "./pages/signIn/SignIN";
import RecoveryPasswor from "./pages/recoveryPassword/RecoveryPasswor";
// import LockScreen from "./pages/lockerScreen/LockScreen";
import PageNotFound from "./pages/errorHandler/PageNotFind/PageNotFound";
import Page505 from "./pages/errorHandler/InternalServerError/Page505";
import MaintainencePage from "./pages/errorHandler/UnderMaintainence/MaintainencePage";
import ChatHome from "./pages/chat/ChatHome/ChatHome";
import { Chat } from "./pages/chat/Chat";


const addButtonProperty = {
  name: 'Adding',
  color: 'white',
  backgroundColor: '#4096f',
  type: 'primary',
};
const deleteButtonProperty = {
  name: 'Delete',
  color: 'black',
  backgroundColor: 'white',
  type: 'default',
};

const addButtonHandler = (record) => {
  console.log('adding...');
  // console.log(record.target.value);
  console.log(record);
};
const deleteButtonHandler = () => {
  console.log('deleting....');
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          buttonProps={addButtonProperty}
          buttonHandler={addButtonHandler}
          isCallbackData={record}
        />
        <Button
          buttonProps={deleteButtonProperty}
          buttonHandler={deleteButtonHandler}
        />
      </Space>
    ),
  },
];
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    tags: ['loser'],
  },
];
function App() {

  const [screen, setScreen] = useState("beforeLogin");
  const [isSidebarClicked, setSidebarClicked] = useState(false);

  const handleSidebarClick = () => {
    setSidebarClicked(!isSidebarClicked);
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} errorElement={<LoginPageError />} />
      <Route
        path="/registerUser"
        element={<RegisterUser />}
        errorElement={<LoginPageError />}
      />
      \
      <Route
        path="/signin"
        element={<SignIn />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/recoverypassword"
        element={<RecoveryPasswor />}
        errorElement={<LoginPageError />}
      />
      {/* <Route
        path="/lockscreen"
        element={<LockScreen />}
        errorElement={<LoginPageError />}
      /> */}
      <Route
        path="/pagenotfound"
        element={<PageNotFound />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/internal500"
        element={<Page505 />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/undermaintenence"
        element={<MaintainencePage />}
        errorElement={<LoginPageError />}
      />
      <Route
        path="/chat"
        element={<Chat />}

 
        errorElement={<LoginPageError />}
      />
    </Routes>
  );
}

export default App;
