import React from "react";
import { useState } from "react";
import ProfilePollFilter from "../../../Components/ProfilePollFilter/ProfilePollFilter";
import ProfilePollsList from "../../../Components/ProfilePollsList/ProfilePollsList";
import { useProfileQuery } from "../../../Slices/authApiSlice";

function ProfilePollListPage() {
  const [filter, setFilter] = useState("");

  const {
    data: { Polls },
    isError,
    error,
    isFetching,
    isLoading,
  } = useProfileQuery();

  const filterList = Polls.filter((poll) => {
    return poll.name.includes(filter);
  });

  return (
    <>
      <ProfilePollFilter filter={filter} setFilter={setFilter} />
      <ProfilePollsList polls={filterList} />;
    </>
  );
}

export default ProfilePollListPage;
