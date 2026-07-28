import styles from "./Layout.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
      <Footer />
    </div>
  )
}