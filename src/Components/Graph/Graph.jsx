import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import usePoll from "../../Hooks/usePoll";
import { useMemo } from "react";
import PollTitlteAndAuthor from "../PollTitleAndAuthor/PollTitleAndAuthor";

ChartJS.register(ArcElement, Tooltip, Legend);

function Graph({ pollId }) {
  const { PollData, pollName, pollCreator } = usePoll(pollId);

  const doesPollHaveAnyVotes = PollData?.dataset.reduce((pre, cur) => {
    return pre + cur;
  }, 0);

  const ranColors = useMemo(() => {
    return PollData?.dataset.map((label) => {
      return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)} )`;
    });
  }, [PollData?.labels[0]]);

  let data;
  if (doesPollHaveAnyVotes) {
    data = {
      labels: PollData?.labels,
      datasets: [
        {
          data: PollData?.dataset,
          backgroundColor: ranColors,
          borderColor: ranColors,

          borderWidth: 1,
        },
      ],
    };
  } else {
    data = {
      labels: ["No votes yet"],
      datasets: [
        {
          labels: "No data",
          backgroundColor: ["#D3D3D3"],
          data: [1],
        },
      ],
    };
  }
  return (
    <>
      <PollTitlteAndAuthor pollName={pollName} pollCreator={pollCreator} />
      <div>
        <Pie
          data={data}
          height="400px"
          width="400px"
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </>
  );
}
export default Graph;
