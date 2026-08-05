import styles from "./Layout.module.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("username") ? true : false,
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || null);

  useEffect(() => {
    const root = document.querySelector("html");
    if (theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);
  return (
    <div className={styles.container}>
      <header>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Outlet context={{ isLoggedIn, setIsLoggedIn, theme, setTheme }} />
      </main>
      <Footer />
    </div>
  );
}
