import styles from "./Navbar.module.css";
import { IoLogoGameControllerA } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Navbar({isLoggedIn, setIsLoggedIn}) {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const {windowWidth} = useWindowWidth();
  const [username, setUsername] = useState((localStorage.getItem("username")) || "");
  console.log(username)

  const handleLogOut = () => {
    setIsMenuShown(false);
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.setItem("username", JSON.stringify(null))
  }


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
              isMenuShown && windowWidth < 750
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
                  className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  My Posts
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="#" 
                  className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  Create New Post
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="#" 
                  className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  My Account
                </NavLink>
              </li>
              {!isLoggedIn ? 
              <li className={`${styles.navItem} ${styles.loginBtn}`}>
                <NavLink 
                  to="login" 
                  className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`}
                  onClick={() => setIsMenuShown(false)}
                  >
                    
                  Log in
                </NavLink>
              </li> :
              <li className={`${styles.navItem} ${styles.loginBtn}`}>
                  <button onClick={handleLogOut}>Log Out</button>
              </li>
              
            }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
