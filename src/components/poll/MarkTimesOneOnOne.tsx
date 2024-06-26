import { Form } from "react-bootstrap";
import { Dispatch, useState } from "react";
import { Time, Vote, PollFromDB } from "../../models/poll";
import { isTimePresentInPollTimes } from "../../helpers";

const MarkTimesOneOnOne = (props: {
  times: Time[];
  newVote: Vote;
  poll: PollFromDB;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { times, newVote, poll, setNewVote } = props;

  let availableTimes = [];

  let VotedTimes = poll.votes.map((vote) => vote.times[0]);

  poll.times.map((time) => {
    if (!isTimePresentInPollTimes(time, VotedTimes)) {
      availableTimes.push(time);
    }
  });

  const [radioButtonChecked, setRadioButtonChecked] = useState("");

  const handleMarkTimeRadioButton = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target !== e.currentTarget) return;
    const { dataset, checked } = e.target;
    const time: Time = dataset.value ? JSON.parse(dataset.value) : {};
    let newTimes = [];

    if (checked) {
      setRadioButtonChecked(JSON.stringify(time));
      newTimes.push(time);
      setNewVote({ name: newVote.name, times: newTimes });
    }
  };

  return (
    <tr>
      {availableTimes.map((time) => (
        <td
          key={JSON.stringify(time)}
          className="poll-slot-checkbox-final-cell"
        >
          <Form.Check
            data-value={JSON.stringify(time)}
            type="radio"
            className="poll-slot-checkbox-one-on-one"
            onChange={handleMarkTimeRadioButton}
            id={JSON.stringify(time)}
            checked={radioButtonChecked === JSON.stringify(time)}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkTimesOneOnOne;
