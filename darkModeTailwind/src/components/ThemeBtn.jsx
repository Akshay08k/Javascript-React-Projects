import React from "react";
import useTheme from "../context/Theme";

const ThemeBtn = () => {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const toggleTheme = (e) => {
    if (e.target.checked) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="theme-toggle" className="text-lg font-medium">
        Toggle Theme
      </label>
      <input
        type="checkbox"
        id="theme-toggle"
        className="toggle-checkbox hidden"
        onChange={toggleTheme}
        checked={themeMode === "dark"}
        aria-label="Toggle theme"
      />
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-1000 dark:justify-end dark:bg-black 
        }`}
        onClick={() =>
          toggleTheme({ target: { checked: themeMode !== "dark" } })
        }
      >
        <div
          className={`w-5 h-5 bg-white   rounded-full shadow-md transform transition-transform  dark:bg-white dark:translate-x-0`}
        ></div>
      </div>
    </div>
  );
};

export default ThemeBtn;
