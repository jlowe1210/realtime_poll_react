import { useState } from "react";
import { useParams } from "react-router-dom";
import CountDown from "../../Components/CountDown/CountDown";
import Graph from "../../Components/Graph/Graph";
import PollResults from "../../Components/PollResults/PollResults";
import PollVoteForm from "../../Components/PollVoteForm/PollVoteForm";
import usePoll from "../../Hooks/usePoll";
import usePollUpdate from "../../Hooks/usePollUpdate";

function PollPage() {
  const { id } = useParams();
  const { PollData, isError, error, data } = usePoll(id);
  const [didPollExpire, setDidPollExpire] = useState(false);

  usePollUpdate(id);

  function handlePollExpire() {
    setDidPollExpire(true);
  }

  return (
    <>
      {isError && error && (
        <h1
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Poll Not Found{" "}
        </h1>
      )}
      {!PollData && !error ? (
        <h1
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading Poll
        </h1>
      ) : null}
      {PollData && !error ? (
        <>
          <Graph pollId={id} />
          {didPollExpire ? (
            <PollResults pollId={id} />
          ) : (
            <PollVoteForm pollId={id} />
          )}

          <CountDown pollId={id} handlePollExpire={handlePollExpire} />
        </>
      ) : null}
    </>
  );
}

export default PollPage;
