import React from "react";
import styles from "./PollTitleAndAuthor.module.css";
function PollTitlteAndAuthor({ pollName, pollCreator }) {
  return (
    <>
      <h1 className={styles.poll_title}>{pollName}</h1>
      <p style={{ textAlign: "center" }}>by {pollCreator}</p>
    </>
  );
}

export default PollTitlteAndAuthor;
