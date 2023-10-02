import React from "react";
import { useState } from "react";
import styles from "./ProfilePollFilter.module.css";

function ProfilePollFilter({ filter, setFilter }) {
  return (
    <div className={styles.filter_search_container}>
      <input
        placeholder="Poll Search"
        className={styles.filter_search}
        name="filter"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default ProfilePollFilter;
