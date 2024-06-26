import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";
import Router from "next/router";
import toastOptions from "../../helpers/toastOptions";
import { deletePoll } from "../../utils/api/server";
import { encrypt } from "../../helpers";

const DeleteModal = (props: { show; onHide; handleDelete }): JSX.Element => {
  const { handleDelete } = props;

  return (
    <Modal
      {...props}
      dialogClassName="modal-60w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete poll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this poll?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

const DeletePoll = (props: {
  pollID: string;
  pollTitle: string;
  secret: string;
}): JSX.Element => {
  const { pollID, pollTitle, secret } = props;
  const [modalShow, setModalShow] = useState(false);

  const handleDelete = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      let deletePollResponse;
      const deleteArgs = {
        pollID,
        secret: encrypt(secret),
      };
      deletePollResponse = await deletePoll(deleteArgs);
      if (
        deletePollResponse &&
        (deletePollResponse.statusCode === 200 ||
          deletePollResponse.statusCode === 404)
      ) {
        if (typeof window !== "undefined") {
          const samayCreatedPolls = localStorage.getItem("samayCreatedPolls");

          if (samayCreatedPolls) {
            const samayCreatedPollsJSON = JSON.parse(samayCreatedPolls);

            let newSamayCreatedPolls = {
              polls: samayCreatedPollsJSON.polls.filter(
                (poll) => Object.keys(poll)[0] !== `${pollID}-${pollTitle}`
              ),
            };

            localStorage.setItem(
              "samayCreatedPolls",
              JSON.stringify(newSamayCreatedPolls)
            );
          }
        }
        Router.push("/recent-polls");
      } else {
        toast.info("Please try again later", toastOptions);
        Router.reload();
      }
    } catch (err) {
      toast.info("Please try again later", toastOptions);
    }
  };

  return (
    <>
      <Button
        className="trash-button"
        onClick={(e) => {
          e.stopPropagation;
          e.preventDefault();
          setModalShow(true);
        }}
      >
        <Trash className="icon" />
      </Button>
      <DeleteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </>
  );
};

export default DeletePoll;
