import { asyncCall, sendConcurrentRequests } from '../helpers/async';

export const Task2 = () => {
  const limit = 3;

  // set valuesNumbers or valuesStrings as values
  const valuesNumbers = [1, 2, 3, 4, 5, 6];
  // const valuesStrings = ["aa", "bb", "cc", "dd", "ee"];

  const values = valuesNumbers;

  return (
    <div>
      <p>Task 2</p>
      <button onClick={() => sendConcurrentRequests<(typeof values)[0]>(values, asyncCall, limit)}>
        send requestst
      </button>
    </div>
  );
};
