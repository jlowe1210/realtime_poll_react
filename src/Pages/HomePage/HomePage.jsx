import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentContainer from "../../Components/ContentContainer/ContentContainer";
import styles from "./HomePage.module.css";

function HomePage(props) {
  const auth = useSelector((state) => {
    return state.auth.userInfo;
  });
  const navigate = useNavigate();

  function redirectToCreatePollOrLogin() {
    if (auth) {
      return navigate("/profile/create", { preventScrollReset: true });
    } else {
      return navigate("/login", { preventScrollReset: true });
    }
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          borderBottom: ".1px solid #cacaca",
          marginTop: "25px",
        }}
      >
        <ContentContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "center", textAlign: "center" }}>
              <h1
                style={{
                  textAlign: "center",

                  fontSize: "25px",
                }}
              >
                CREATE YOUR POLL IN SECONDS
              </h1>
              <p
                style={{
                  textAlign: "center",
                  lineHeight: "30px",
                }}
              >
                Creating polls is a great way to gather opinions and insights
                from a group of people. With just a few clicks, you can create a
                poll and share it with your friends and followers.
              </p>
              <button
                onClick={redirectToCreatePollOrLogin}
                className={styles.create_poll_btn}
              >
                CREATE A POLL
              </button>
            </div>
            <img className={styles.svg} src="piechart.svg" height={400} />
          </div>
        </ContentContainer>
      </div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>How it works</h1>
      <ContentContainer>
        <div className={styles.steps}>
          <div className={styles.step}>
            <h2>1. Sign up</h2>
            <img src="signup.svg" width={120} />
            <p>
              Join our community of users and make your voice heard with our
              free, easy-to-use polling website!
            </p>
          </div>
          <div className={styles.step}>
            <h2>2. Create</h2>
            <img src="create.svg" width={120} />
            <p>
              Create polls on our website to gather feedback and make informed
              decisions.
            </p>
          </div>
          <div className={styles.step}>
            <h2>3. Share</h2>
            <img src="share.svg" width={120} />
            <p>
              Share your polls you create to your social media platforms to
              increase reach and engagement.
            </p>
          </div>
          <div className={styles.step}>
            <h2>4. Analyze</h2>
            <img src="stats.svg" width={120} />
            <p>
              Analyze your polls results to identify trends and gain insights
              into your audience's preferences.
            </p>
          </div>
        </div>
      </ContentContainer>
    </>
  );
}

export default HomePage;
