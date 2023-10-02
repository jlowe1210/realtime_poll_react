import { useGetPollQuery } from "../Slices/pollApiSlice";
import { useMemo } from "react";

function usePoll(id) {
  const { data, isError, isLoading, isSuccess, error, isFetching, refetch } =
    useGetPollQuery(id);

  let pollOptions = useMemo(() => {
    if (data) {
      return data?.poll.Polloptions.reduce((pre, cur, inx, arr) => {
        if (!pre.hasOwnProperty(cur.option)) {
          pre[cur.option] = 0;
        }
        return pre;
      }, {});
    }
  }, [data?.poll]);

  let PollResults = useMemo(() => {
    if (data) {
      return data?.poll.Poll_votes.reduce((pre, cur, inx, arr) => {
        if (!pre.hasOwnProperty(arr[inx].Polloption.voted)) {
          pre[arr[inx].Polloption.voted] = 1;
        } else {
          pre[arr[inx].Polloption.voted]++;
        }
        return pre;
      }, {});
    }
  }, [data?.poll]);

  const PollData = { ...pollOptions, ...PollResults };

  if (data) {
    return {
      PollData: {
        labels: data ? Object.keys(PollData) : null,
        dataset: data ? Object.values(PollData) : null,
      },
      options: data?.poll.Polloptions,
      pollName: data?.poll.name,
      pollCreator: data?.poll?.User?.username,
      isLoading,
      isFetching,
      data,
      refetch,
    };
  } else {
    return { error, isError };
  }
}

export default usePoll;
