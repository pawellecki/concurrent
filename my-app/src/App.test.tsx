import { sendConcurrentRequests, asyncCall } from './helpers/async';

describe('concurrent request', () => {
  test('sends more than one request at once', async () => {
    const values = [101, 102, 103, 104]; //setTimeout delays
    const limit = 2;

    const start = Date.now();
    await sendConcurrentRequests(values, asyncCall, limit);
    const end = Date.now();

    const resultTimeMs = end - start;
    const sumOfValues = values.reduce((a, b) => a + b);

    expect(resultTimeMs).toBeLessThan(sumOfValues);
  });

  test('is not sending in 3 batches', async () => {
    const values = [101, 1002, 203, 204, 105, 106];
    const limit = 2;

    const start = Date.now();
    await sendConcurrentRequests(values, asyncCall, limit);
    const end = Date.now();

    const resultTimeMs = end - start;
    const theoreticalSumOfBatches = values[1] + values[3] + values[5];

    expect(resultTimeMs).toBeGreaterThan(1002);
    expect(resultTimeMs).toBeLessThan(theoreticalSumOfBatches);
  });

  test('returns values when all resolved, works with any type of values', async () => {
    const values = ['aa', 22, null, undefined];
    const limit = 2;
    const result = await sendConcurrentRequests(values, asyncCall, limit);

    expect(result).toEqual(values);
  });

  test('shows error message in result for 997 delay', async () => {
    const values = [101, 102, 997, 104];
    const limit = 2;
    const result = await sendConcurrentRequests(values, asyncCall, limit);

    expect(result[2]).toMatch(`error delay: 997`);
  });
});
