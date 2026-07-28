import styles from "./Layout.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router"


export default function Layout() {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}