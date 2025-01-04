import React, { useEffect, useState } from "react";
import Card from "./components/card";
import ThemeBtn from "./components/ThemeBtn";
import { ThemeProvider } from "./context/Theme";
const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };
  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <>
      <div className="">
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
          <div className="flex justify-center items-center flex-col mt-20 h-screen">
            <h1 className="text-3xl font-bold dark:text-teal-300  duration-700">
              Toggle Theme Using Context API And Tailwind Css Class
              Functionality
            </h1>
            <ThemeBtn />
            <Card />
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;
