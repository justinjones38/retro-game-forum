import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    console.log(windowWidth);

    return () => window.removeEventListener("resize", getWindowSize);
  });

  return { windowWidth };
}
