import { useProfileQuery } from "../Slices/authApiSlice";

function useSelectedProfilePoll(pollId) {
  const { data } = useProfileQuery();

  const selectedPoll = data.Polls.find((poll) => {
    return poll.id === pollId;
  });

  return { selectedPoll: selectedPoll || null };
}

export default useSelectedProfilePoll;
