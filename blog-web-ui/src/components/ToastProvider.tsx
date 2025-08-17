"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        // transition={Flip}
        draggable={"touch"}
        theme={theme}
        // theme={"colored"}
      />
    </>
  );
};

export default ToastProvider;
