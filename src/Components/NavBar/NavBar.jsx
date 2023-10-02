import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import ContentContainer from "../ContentContainer/ContentContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../Slices/authApiSlice";
import { logout as clientLogout } from "../../Slices/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import DropDownNav from "../DropDownNav/DropDownNav";
import { useEffect } from "react";
import { useRef } from "react";

function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();

  const auth = useSelector((state) => {
    return state.auth.userInfo;
  });

  async function userLogout() {
    setShowUserMenu(false);
    navigate("/");
    try {
      await logout().unwrap();
    } catch (error) {
      dispatch(clientLogout());
    }
  }

  useEffect(() => {
    function closeUserMenuWhenClickedOutsideOfIt(e) {
      if (e.target.nextSibling !== userMenuRef.current) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("click", closeUserMenuWhenClickedOutsideOfIt);

    return () => {
      return document.removeEventListener(
        "click",
        closeUserMenuWhenClickedOutsideOfIt
      );
    };
  }, [showUserMenu]);

  return (
    <div className={styles.navbar_container}>
      <ContentContainer>
        <div className={styles.navbar}>
          <div
            className={styles.logo}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="/poll.png" width={35} height={35} />
            <p className={styles.logo_text}>iiPoll</p>
          </div>
          {!auth ? (
            <div className={styles.signin_links}>
              <Link className={styles.login_btn} to="login">
                Log in
              </Link>
              <Link className={styles.signup_btn} to="signup">
                Sign up
              </Link>
            </div>
          ) : (
            <div
              style={{
                alignSelf: "center",
                position: "relative",
              }}
            >
              <p
                className={styles.user}
                onClick={() =>
                  setShowUserMenu((state) => {
                    return !state;
                  })
                }
                style={{
                  cursor: "pointer",
                  fontSize: "22px",
                }}
              >
                {auth.username}
              </p>

              {showUserMenu ? (
                <DropDownNav ref={userMenuRef} handleLogOut={userLogout} />
              ) : null}
            </div>
          )}
        </div>
      </ContentContainer>
    </div>
  );
}

export default NavBar;
