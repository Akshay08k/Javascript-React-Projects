import React from "react";
import Message from "./Message";
const App = () => {
  return (
    <>
      <Message
        title="Countries"
        items={["India", "USA", "UK", "Australia", "canada", "japan"]}
      />
      <Message title="States" items={["Delhi", "Mumbai", "Chennai"]} />
    </>
  );
};

export default App;
