import React from "react";
import styles from "./SideBar.module.css";
import { NavLink } from "react-router-dom";
import useAuth from "../../store/auth-context";

export default function SideBar() {
  const authCtx = useAuth();

  const navigations = [
    { route: "/", label: "Home" },
    { route: "/about", label: "About" },
    { route: "/events", label: "Events" },
    { route: "/pricing", label: "Pricing" },
  ];

  if (authCtx.isLoggedIn === true) {
    navigations.push({ route: "/tickets", label: "Tickets" });
  }
  return (
    <div className={styles["sidebar-container"]}>
      <nav className={styles["sidebar-wrapper"]}>
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
    </div>
  );
}
