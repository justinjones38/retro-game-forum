import styles from "./Navbar.module.css";
import { IoLogoGameControllerA } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Navbar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const {windowWidth} = useWindowWidth();

  return (
    <nav>
      <div className={styles.contentWrapper}>
        <Link to="." className={styles.leftNav}>
          <IoLogoGameControllerA className={styles.icon} />
          <h1 className={styles.title}>byte&bits</h1>
        </Link>
        <div className={styles.rightNav}>
          <GiHamburgerMenu
            className={`${styles.icon} ${styles.hamburgerMenu}`}
            onClick={() => setIsMenuShown(true)}
          />
          <div
            className={
              isMenuShown && windowWidth < 600
                ? `${styles["navMenu"]} ${styles["show"]}`
                : `${styles["navMenu"]}`
            }
          >
            <IoMdClose
              className={`${styles.icon} ${styles.closeBtn}`}
              onClick={() => setIsMenuShown(false)}
            />
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink 
                  to="#" 
                  className={styles.navLink}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  My Posts
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <Link 
                  to="#" 
                  className={styles.navLink}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  Create New Post
                </Link>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="#" 
                  className={styles.navLink}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  View Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
