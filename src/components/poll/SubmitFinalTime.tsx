import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../../helpers/toastOptions";
import { markFinalTime } from "../../utils/api/server";
import { Time, PollFromDB } from "../../models/poll";
import { encrypt } from "../../helpers";

const SubmitFinalTime = (props: {
  finalTime: Time | undefined;
  pollID: string;
  secret: string;
  poll: PollFromDB;
}): JSX.Element => {
  const { finalTime, pollID, secret, poll } = props;

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (finalTime && (!poll.type || poll.type === "group")) {
      setDisabled(true);
      try {
        const voterArgs = {
          finalTime: {
            finalTime,
            open: false,
          },
          pollID,
          secret: encrypt(secret),
        };
        const submitFinalTimeResponse = await markFinalTime(voterArgs);
        if (submitFinalTimeResponse.statusCode === 201) {
          Router.reload();
        } else {
          setDisabled(false);
          toast.info("Please try again later", toastOptions);
          Router.reload();
        }
      } catch (err) {
        setDisabled(false);
        toast.info("Please try again later", toastOptions);
        Router.reload();
      }
    } else if (!poll.type || poll.type === "group") {
      toast.error("Please choose the final time", toastOptions);
    } else {
      setDisabled(true);
    }
  };

  if (!poll.type || poll.type === "group") {
    return (
      <>
        <Button
          className="global-primary-button submit-final-time-button"
          type="submit"
          disabled={disabled}
          onClick={handleSubmit}
        >
          {!disabled ? (
            `Finalise time`
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
  }
  return <ToastContainer />;
};

export default SubmitFinalTime;
