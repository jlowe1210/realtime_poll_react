import React from "react";
import styles from "./ProfilePollsList.module.css";

function ProfilePollsList({ polls }) {
  return (
    <>
      {polls.length > 0 ? (
        <table className={styles.customers}>
          <thead>
            <tr>
              <th>POLL NAME</th>
              <th>URL</th>
              <th>SHARE</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => {
              return (
                <tr key={poll.id}>
                  <td>{poll.name}</td>
                  <td>
                    <a target="_blank" href={poll.url}>
                      Poll Link
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?url=${poll.url}&text=${poll.name} Poll at`}
                    >
                      <img
                        src="/twitter.png"
                        alt="twitter logo"
                        width="20"
                        height="20"
                      />
                    </a>
                    <a
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${poll.url}&quote=${poll.name} Poll at`}
                    >
                      <img
                        src="/facebook.png"
                        alt="twitter logo"
                        width="20"
                        height="20"
                      />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>No Polls</h1>
      )}
    </>
  );
}

export default ProfilePollsList;
