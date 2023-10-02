import { useEffect } from "react";
import { pollApiSlice } from "../Slices/pollApiSlice";
import { useDispatch } from "react-redux";
import { socket } from "../main";

function usePollUpdate(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("joinRoom", id);

    socket.on("updatedPoll", (updatedPoll) => {
      dispatch(
        pollApiSlice.util.updateQueryData("getPoll", id, (draft) => {
          return (draft = {
            poll: updatedPoll,
          });
        })
      );
    });

    return () => {
      socket.off("updatedPoll");
      socket.emit("leaveRoom", id);
    };
  }, []);
}

export default usePollUpdate;
