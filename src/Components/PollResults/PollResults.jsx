import React from "react";
import usePoll from "../../Hooks/usePoll";
import styles from "./PollResults.module.css";

function PollResults({ pollId }) {
  const { data } = usePoll(pollId);

  const { Poll_votes, Polloptions } = data.poll;

  return (
    <div className={styles.results_container}>
      <h1>Results</h1>
      {calcPollResults(Polloptions, Poll_votes)}
    </div>
  );
}

function calcPollResults(options, votes) {
  const pollOptions = options.reduce((pre, cur, inx, arr) => {
    if (!pre.hasOwnProperty(arr[inx].option)) {
      pre[arr[inx].option] = 0;
    }
    return pre;
  }, {});

  const pollVotes = votes.reduce((pre, cur, inx, arr) => {
    if (!pre.hasOwnProperty(arr[inx].Polloption.voted)) {
      pre[arr[inx].Polloption.voted] = 1;
    } else {
      pre[arr[inx].Polloption.voted]++;
    }

    return pre;
  }, {});

  const PollResults = { ...pollOptions, ...pollVotes };

  return Object.keys(PollResults).map((key) => {
    return (
      <h3 key={key}>
        {key} {PollResults[key]}
      </h3>
    );
  });
}

export default PollResults;
