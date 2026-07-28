import styles from "./Layout.module.css"
import Navbar from "../components/Navbar"


export default function Layout() {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
    </div>
  )
}