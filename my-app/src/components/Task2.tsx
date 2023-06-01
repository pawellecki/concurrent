import { useState } from 'react';
import { asyncCall, sendConcurrentRequests } from '../helpers/async';

const limit = 3;

export const Task2 = () => {
  const [asyncResult, setAsyncResult] = useState<unknown[]>();

  const valuesNumbers = [501, 502, 503, 504, 505, 997];
  const valuesStrings = ['aa', 'bb', 'cc', 'dd', 'ee'];

  const values = valuesNumbers; //switch between valuesNumbers and valuesStrings to see different results

  const asyncFn = async (values: any, asyncCall: any, limit: any) => {
    const result = await sendConcurrentRequests(values, asyncCall, limit);

    setAsyncResult(result);
  };

  return (
    <div className="task">
      <p>Task 2</p>
      <button onClick={() => asyncFn(values, asyncCall, limit)}>send requestst</button>
      <p>result:</p>
      <p>{JSON.stringify(asyncResult)}</p>
    </div>
  );
};
