import React from "react";
import { useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation, useProfileQuery } from "../../Slices/authApiSlice";
import { logout } from "../../Slices/authSlice";
import ProfileNavBar from "../../Components/ProfileNavBar/ProfileNavBar";

function ProfilePage(props) {
  const { data, isError, error, isFetching, isLoading } = useProfileQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => {
    return state.auth.userInfo;
  });

  useEffect(() => {
    (async () => {
      if (!auth) {
        navigate("/login");
      }

      if (error?.status === 401) {
        await logout();
        navigate("/login");
      }
    })();
  }, [isError]);

  return (
    <>
      {isLoading && (
        <h1 className={styles.profilepage_loader}>Loading Profile</h1>
      )}
      {data && (
        <>
          <ProfileNavBar />
          <Outlet></Outlet>
        </>
      )}
    </>
  );
}

export default ProfilePage;
