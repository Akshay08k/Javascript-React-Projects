import React from "react";
import useTheme from "../context/Theme";

const Card = () => {
  const { themeMode } = useTheme();

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`flex justify-between mb-3 p-10 rounded-lg shadow-lg transition duration-300 bg-white text-black dark:text-white dark:bg-black`}
      >
        <img
          src="https://img.freepik.com/premium-vector/computer-technology-pc-screen-desktop-isolated-internet-monitor-laptop-display-digital-bu_1013341-45835.jpg"
          alt="Computer"
          height={300}
          width={300}
          className="rounded-lg"
        />
        <div className="card-body ml-10">
          <h5 className="card-title text-3xl mt-5">Computer</h5>
          <p className="card-text max-w-md mt-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
            possimus commodi beatae inventore quia. Expedita ad odit veniam
            placeat eum iure voluptatem perferendis suscipit. Laudantium
            delectus tempore officiis fuga natus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
