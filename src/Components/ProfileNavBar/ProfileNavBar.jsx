import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProfileNavBar.module.css";

function ProfileNavBar() {
  return (
    <div style={{ backgroundColor: "#E4E4E4", padding: "5px 0" }}>
      <ul className={styles.profilepage_nav}>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#60dcfb" : "#3f3d56",
              textDecoration: "none",
            })}
            to={"create"}
          >
            Create Poll
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"polls"}
            style={({ isActive }) => ({
              color: isActive ? "#60dcfb" : "#3f3d56",
              textDecoration: "none",
            })}
          >
            My Polls
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNavBar;
