import React from "react";
import { useParams } from "react-router-dom";
import useSelectedProfilePoll from "../../Hooks/useSelectedProfilePoll";

import ContentContainer from "../ContentContainer/ContentContainer";

function ProfilePollViewer() {
  const { pollId } = useParams();

  const { selectedPoll } = useSelectedProfilePoll(pollId);

  return (
    <>
      <ContentContainer>
        <div style={{ marginLeft: "23px", textAlign: "center" }}>
          <h2>{selectedPoll.name}</h2>
        </div>
      </ContentContainer>
    </>
  );
}

export default ProfilePollViewer;
