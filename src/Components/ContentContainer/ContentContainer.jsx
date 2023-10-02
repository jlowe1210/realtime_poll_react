import React from "react";
import styles from "./ContentContainer.module.css";

function ContentContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default ContentContainer;
