import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../../helpers/toastOptions";
import { markTimes } from "../../utils/api/server";
import { Vote, PollFromDB } from "../../models/poll";
import { isUserPresentInVotes } from "../../helpers";

const SubmitTimes = (props: {
  newVote: Vote;
  pollID: string;
  pollFromDB: PollFromDB;
}): JSX.Element => {
  const { newVote, pollID, pollFromDB } = props;

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!newVote.name) {
      toast.error("Please enter your name", toastOptions);
      return;
    }

    if (
      pollFromDB.votes &&
      isUserPresentInVotes(newVote.name, pollFromDB.votes)
    ) {
      toast.error(
        "An invitee with the same name has voted before - please choose a different name",
        toastOptions
      );

      return;
    }

    if (newVote.times.length === 0) {
      toast.error("Please select at least one time slot", toastOptions);

      return;
    }

    setDisabled(true);
    try {
      let submitTimeResponse;
      const voterArgs = {
        newVote,
        pollID,
      };
      submitTimeResponse = await markTimes(voterArgs);
      let time = JSON.stringify(newVote.times[0]);

      if (submitTimeResponse && submitTimeResponse.statusCode === 201) {
        if (typeof window !== "undefined") {
          const votedPolls = localStorage.getItem("samayVotedPolls");

          if (!votedPolls) {
            if (pollFromDB.type === "oneonone") {
              const initSamayPolls = {
                polls: [
                  {
                    [`${pollID}`]: `${pollFromDB.title}#${time}`,
                  },
                ],
              };

              localStorage.setItem(
                "samayVotedPolls",
                JSON.stringify(initSamayPolls)
              );
            } else {
              const initSamayPolls = {
                polls: [
                  {
                    [`${pollID}`]: `${pollFromDB.title}`,
                  },
                ],
              };
              localStorage.setItem(
                "samayVotedPolls",
                JSON.stringify(initSamayPolls)
              );
            }
          } else if (pollFromDB.type === "oneonone") {
            const votedPollsJSON = JSON.parse(votedPolls);

            votedPollsJSON.polls.push({
              [`${pollID}`]: `${pollFromDB.title}#${time}`,
            });

            localStorage.setItem(
              "samayVotedPolls",
              JSON.stringify(votedPollsJSON)
            );
          } else {
            const votedPollsJSON = JSON.parse(votedPolls);

            votedPollsJSON.polls.push({
              [`${pollID}`]: `${pollFromDB.title}`,
            });

            localStorage.setItem(
              "samayVotedPolls",
              JSON.stringify(votedPollsJSON)
            );
          }
        }
        Router.reload();
      } else if (submitTimeResponse && submitTimeResponse.statusCode === 404) {
        toast.error("The poll has been deleted by the creator", toastOptions);
        Router.push("/");
      } else if (submitTimeResponse && submitTimeResponse.statusCode === 400) {
        toast.error("The poll has been closed by the creator", toastOptions);
        Router.reload();
      } else {
        setDisabled(false);
        toast.info("Please try again later", toastOptions);
        Router.reload();
      }
    } catch (err) {
      setDisabled(false);
      toast.info("Please try again later", toastOptions);
    }
  };

  return (
    <>
      <Button
        className="global-primary-button mark-times-button"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {!disabled ? (
          `Mark your availability`
        ) : (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="samay-button-spinner"
            />
          </>
        )}
      </Button>
      <ToastContainer />
    </>
  );
};

export default SubmitTimes;
