import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const {pathname} = useLocation();
  console.log(pathname);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0})
  }, [pathname])
}