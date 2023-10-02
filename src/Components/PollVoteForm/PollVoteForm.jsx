import { useState } from "react";
import usePoll from "../../Hooks/usePoll";
import { useVoteMutation } from "../../Slices/pollApiSlice";
import styles from "./PollVoteForm.module.css";

function PollVoteForm({ pollId, canStillVote }) {
  const { data } = usePoll(pollId);
  const options = data.poll.Polloptions;
  const [checkedOption, setCheckedOption] = useState("");
  const [vote, { data: voteData, isLoading }] = useVoteMutation();
  const [selectedOption, setSelectedOption] = useState("");

  function onOptionChange(e) {
    const id = e.target.value;
    const selectedOption = options.find((option) => {
      return option.id == id;
    });
    setCheckedOption(selectedOption.option);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const option = options.find((option) => {
      return option.option === checkedOption;
    });

    const voteObjectBody = { optionId: option.id, pollId };
    setSelectedOption(checkedOption);
    await vote(voteObjectBody).unwrap();
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        {options.map(({ option, id }) => {
          return (
            <div key={id}>
              <input
                type="radio"
                checked={checkedOption === option}
                onChange={onOptionChange}
                id={option}
                value={id}
                name="pollvote"
              />
              <label htmlFor={option}>{option.toUpperCase()}</label>
              <br></br>
            </div>
          );
        })}
        <button
          className={styles.vote_btn}
          disabled={
            !checkedOption || isLoading || checkedOption === selectedOption
          }
          type="submit"
        >
          {isLoading ? "Casting vote" : "Cast vote"}
        </button>
      </form>
    </>
  );
}

export default PollVoteForm;
