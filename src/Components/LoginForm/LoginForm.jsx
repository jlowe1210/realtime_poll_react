import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { useLoginMutation } from "../../Slices/authApiSlice";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import useQuery from "../../Hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Slices/authSlice";
import { useEffect } from "react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const [responseError, setResponseError] = useState("");
  const [login, { data, isLoading, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();
  const auth = useSelector((state) => {
    return state.auth.userInfo;
  });

  const onSubmit = async (data) => {
    reset();
    try {
      const response = await login(data).unwrap();

      dispatch(setCredentials(response));
      navigate("/profile");
    } catch (error) {
      const errorMessage = error.data.errors.message;
      setResponseError(errorMessage);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, [auth]);

  watch(() => {
    if (responseError) {
      setResponseError("");
    }
  });

  return (
    <>
      {!auth ? (
        <div className={styles.formcontainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {responseError && (
              <p className={styles.response_error}>
                Invalid username or password
              </p>
            )}
            {query.has("usercreated") &&
              query.get("usercreated") === "true" && (
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  User created
                </p>
              )}
            <input
              type={"text"}
              placeholder="Username"
              {...register("username", { required: true })}
            />
            <input
              type={"password"}
              placeholder="Password"
              {...register("password", { required: true })}
            />

            <button
              disabled={!isValid || isLoading}
              className={styles.submit_btn}
              type="submit"
            >
              {isLoading ? "Logging in" : "Login"}
            </button>

            <p style={{ textAlign: "right" }}>forgot password?</p>
            <p>
              Don't have a account?{" "}
              <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                <Link style={{ color: "#60dcfb" }} to={"/signup"}>
                  Sign up!
                </Link>
              </span>
            </p>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default LoginForm;
