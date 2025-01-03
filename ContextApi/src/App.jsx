import React from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContextProvider";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <h1>Hello</h1>
        <Login />
        <Profile />
      </UserContextProvider>
    </div>
  );
};

export default App;
