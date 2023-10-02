import React, { forwardRef } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./DropDownNav.module.css";

const DropDownNav = forwardRef(function DropDownNav({ handleLogOut }, ref) {
  const navigate = useNavigate();

  return (
    <div className={styles.dropdown_container} ref={ref}>
      <ul>
        <li
          style={{ marginBottom: "15px" }}
          onClick={() => navigate("/profile")}
        >
          <img
            style={{ marginLeft: "-3px" }}
            src="/home.png"
            width={15}
            height={15}
          />{" "}
          <p>Dashboard</p>
        </li>

        <li>
          <img src="/exit.png" width={15} height={15} />
          <p onClick={() => handleLogOut()}>Sign out</p>
        </li>
      </ul>
    </div>
  );
});

export default DropDownNav;
