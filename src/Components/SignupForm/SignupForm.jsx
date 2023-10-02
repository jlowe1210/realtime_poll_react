import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { useSignupMutation } from "../../Slices/authApiSlice";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const [signup, { data, isLoading, error, isError }] = useSignupMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signup(data).unwrap();
      navigate("/login?usercreated=true");
    } catch (error) {
      for (let key in error.data.errors) {
        setError(key, { type: "server", message: error.data.errors[key] });
      }
    }
  };

  return (
    <div className={styles.formcontainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={"text"}
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors?.username?.type === "required" && (
          <p className={styles.client_error}>Username is required</p>
        )}
        {errors?.username?.type === "server" && (
          <p className={styles.client_error}>
            {errors?.username?.message?.message}
          </p>
        )}
        <input
          type={"email"}
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Email",
            },
          })}
        />
        {errors?.email?.type === "server" && (
          <p className={styles.client_error}>
            {errors?.email?.message?.message}
          </p>
        )}
        {errors?.email?.type === "required" && (
          <p className={styles.client_error}>Email is required</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p className={styles.client_error}>Invalid Email</p>
        )}
        <input
          placeholder="Password"
          {...register("password", {
            required: "required",
            minLength: {
              value: 7,
              message: "Password must be atleast 7 characters long",
            },
          })}
          type="password"
        />
        {errors?.password?.type === "server" && (
          <p className={styles.client_error}>
            {errors?.password?.message?.message}
          </p>
        )}
        {errors?.password?.type === "required" && (
          <p className={styles.client_error}>Password is required</p>
        )}
        {errors?.password?.type === "minLength" && (
          <p className={styles.client_error}>
            Password must be atleast 7 characters
          </p>
        )}
        <input
          type={"password"}
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: true,
            validate: {
              matchedPassword: (value) => {
                const password = getValues("password");
                return password === value || "Passwords must be the same";
              },
            },
          })}
        />
        {errors?.confirmPassword?.type === "server" && (
          <p className={styles.client_error}>
            {errors?.confirmPassword?.message?.message}
          </p>
        )}
        {errors?.confirmPassword?.type === "required" && (
          <p className={styles.client_error}>confirm password is required</p>
        )}
        {errors?.confirmPassword?.type === "matchedPassword" && (
          <p className={styles.client_error}>Passwords must match</p>
        )}
        <button
          disabled={!isValid || isLoading || !isEmpty(errors)}
          className={styles.submit_btn}
          type="submit"
        >
          {isLoading ? "Signing up" : "Sign up"}
        </button>
        <p>
          Already have an account?{" "}
          <Link style={{ color: "#60dcfb" }} to={"/login"}>
            Log in!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
