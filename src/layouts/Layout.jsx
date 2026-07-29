import styles from "./Layout.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router"
import { useState } from "react"


export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("username") ? true : false
  );
  return (
    <div className={styles.container}>
      <header>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Outlet context={{isLoggedIn, setIsLoggedIn}} />
      </main>
      <Footer />
    </div>
  )
}