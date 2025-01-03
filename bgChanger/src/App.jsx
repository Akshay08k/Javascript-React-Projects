import React from "react";
import { useState } from "react";

const App = () => {
  const [color, setColor] = useState("red");
  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-4">
        <div className="flex flex-wrap justify-center gap-2 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button
            className="py-4 px-8 rounded-2xl bg-red-600"
            onClick={() => setColor("red")}
          >
            Red
          </button>
          <button
            className="py-4 px-8 rounded-2xl bg-blue-600"
            onClick={() => setColor("blue")}
          >
            Blue
          </button>
          <button
            className="py-4 px-8 rounded-2xl bg-green-600"
            onClick={() => setColor("green")}
          >
            Green
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
