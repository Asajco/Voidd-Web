import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "./NavBar.module.css";
import useAuth from "../../store/auth-context";
import menu from "../../assets/images/menu.svg";
import SideBar from "./SideBar";
import close from "../../assets/images/close.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();

  const navigations = [
    { route: "/", label: "Home" },
    { route: "/about", label: "About" },
    { route: "/events", label: "Events" },
    { route: "/pricing", label: "Pricing" },
  ];
  const [isNavOpen, setNavIsOpen] = React.useState(false);

  const toggleNav = () => {
    setNavIsOpen((prevState) => !prevState);
  };

  if (authCtx.isLoggedIn === true) {
    navigations.push({ route: "/tickets", label: "Tickets" });
  }

  const AllTheWayUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate("/");
  };

  const loggedOutUserButtons = (
    <div className={styles["nav-login"]}>
      <button
        className={styles.btn}
        type="button"
        onClick={() => navigate("/signin")}
      >
        Sign in
      </button>
      <button
        className={`${styles["btn-outlined"]} ${styles.btn}`}
        type="button"
        onClick={() => navigate("/signup")}
      >
        Sign up
      </button>
    </div>
  );

  const loogedInUserButtons = (
    <div className={styles["nav-login"]}>
      {(authCtx.userAccountType === "premiumMonth" ||
        authCtx.userAccountType === "premiumYear") && (
        <button
          className={`${styles["btn-outlined"]} ${styles.btn}`}
          type="button"
          onClick={() => navigate("/create-event")}
        >
          Create event
        </button>
      )}
      <button
        className={`${styles["btn-outlined"]} ${styles.btn}`}
        onClick={authCtx.signOut}
      >
        Sign out
      </button>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles["nav-bar"]}>
        <img
          src={isNavOpen ? close : menu}
          alt=""
          className={styles.menu}
          onClick={toggleNav}
        ></img>
        {isNavOpen && <SideBar />}
        <button type="button" className={styles.logo} onClick={AllTheWayUp}>
          Voidd
        </button>
        <nav>
          {navigations.map((nav) => {
            return (
              <NavLink
                key={nav.route}
                to={nav.route}
                className={({ isActive }) => {
                  let finalStyle = styles["nav-link"];
                  if (isActive === true) {
                    finalStyle = `${finalStyle} ${styles.active}`;
                  } else {
                    finalStyle = `${finalStyle} ${styles.inactive}`;
                  }
                  return finalStyle;
                }}
              >
                {nav.label}
              </NavLink>
            );
          })}
        </nav>

        <SearchBar />
        {authCtx.isLoggedIn === true
          ? loogedInUserButtons
          : loggedOutUserButtons}
      </div>
    </header>
  );
};

export default NavBar;
