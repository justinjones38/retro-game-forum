import styles from "./Navbar.module.css";
import { IoLogoGameControllerA } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import Modal from "../modals/Modal";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const { windowWidth } = useWindowWidth();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  console.log(Boolean(username));

  const handleLogOut = () => {
    console.log("run");
    setIsMenuShown(false);
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <nav>
      <div className={styles.contentWrapper}>
        <div className={styles.leftNav}>
          <Link to="." className={styles.leftNav}>
            <IoLogoGameControllerA className={styles.icon} />
            <h1 className={styles.title}>byte&bits</h1>
          </Link>
        </div>
        <div className={styles.rightNav}>
          {!isLoggedIn ? (
            <Link to="login" className={styles.navBtn}>Log In</Link>
          ) : (
            <>
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
                      to="my-posts"
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.navLink} ${styles.active}`
                          : `${styles.navLink}`
                      }
                      onClick={() => setIsMenuShown(false)}
                    >
                      My Posts
                    </NavLink>
                  </li>
                  <li className={styles.navItem}>
                    <NavLink
                      to="create-post"
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.navLink} ${styles.active}`
                          : `${styles.navLink}`
                      }
                      onClick={() => setIsMenuShown(false)}
                    >
                      Create New Post
                    </NavLink>
                  </li>
                  <li className={styles.navItem}>
                    <NavLink
                      to="#"
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.navLink} ${styles.active}`
                          : `${styles.navLink}`
                      }
                      onClick={() => setIsMenuShown(false)}
                    >
                      My Account
                    </NavLink>
                  </li>
                  <li className={`${styles.navItem}`}>
                    <button onClick={handleLogOut} className={styles.navBtn}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
