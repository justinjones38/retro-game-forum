import styles from "./Navbar.module.css"
import { IoLogoGameControllerA } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useState } from "react";


export default function Navbar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  return (
    <nav>
      <div className={styles.contentWrapper}>
        <Link to="." className={styles.leftNav}>
          <IoLogoGameControllerA className={styles.logo} />
          <h1 className={styles.title}>byte&bits</h1>
        </Link>
        <div className={styles.rightNav}>
          <GiHamburgerMenu 
            className={styles.logo} 
            onClick={() => setIsMenuShown(true)}
          />
          <div className={isMenuShown ? `${styles["navMenu"]} ${styles["show"]}` : `${styles["navMenu"]}`}>
            <IoMdClose
              className={`${styles.logo} ${styles.closeBtn}`}
              onClick={() => setIsMenuShown(false)}
            />
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink to="#"> My Posts</NavLink>
              </li>
              <li className={styles.navItem}>
                <Link to="#">Crew New Post</Link>
              </li>
              <li className={styles.navItem}>
                <NavLink to="#"> View Settings</NavLink>
              </li>
            </ul>
          </div>

        </div>
      </div>


    </nav>
  )
}