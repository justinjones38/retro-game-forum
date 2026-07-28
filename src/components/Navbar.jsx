import styles from "./Navbar.module.css"
import { IoLogoGameControllerA } from "react-icons/io";
import { Link } from "react-router";


export default function Navbar() {
  return (
    <nav>
      <div className={styles.contentWrapper}>
        <Link to="." className={styles.leftNav}>
          <IoLogoGameControllerA className={styles.logo} />
          <h1 className={styles.title}>byte&bits</h1>
        </Link>
      </div>


    </nav>
  )
}