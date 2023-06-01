export const testPromiseDelay = 500;

const asyncWithTimeout = (delay: number) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const isTestingError = delay === 997

            if (isTestingError) {
                reject(`error delay: ${delay}`)
            }

            resolve(delay)
        }, delay);
    });

export async function asyncCall<T>(arg: T) {
    console.log("call " + arg); //check console to see the order of call/result

    let result

    try {
        result = await asyncWithTimeout(arg as any);
    } catch (error) {
        result = error
    }

    console.log("result " + arg);
    return result;
}

export function sendConcurrentRequests<T>(
    values: T[],
    asyncFn: <T>(arg: T) => Promise<unknown>,
    limit: number
): Promise<unknown[]> {
    return new Promise((resolve) => {
        // copy arguments to avoid side effect
        // reverse queue as pop is faster than shift
        let argQueue = [...values].reverse();

        // collects results of Promises
        let outs: unknown[] = [];

        let count = 0;

        const pullNext = () => {
            const areAllPromisesFinished = !argQueue.length && !count

            if (areAllPromisesFinished) {
                resolve(outs);
            } else {
                while (count < limit && argQueue.length) {
                    const index = values.length - argQueue.length;

                    //removes element from queue of values
                    const arg = argQueue.pop();

                    const out = asyncFn(arg);

                    //counts concurrent Promises - 1 to compare with limit
                    count += 1;

                    const processOut = (out: unknown, index: number) => {
                        outs[index] = out;
                        count -= 1;

                        pullNext();
                    };

                    out.then((out: unknown) => processOut(out, index));
                }
            }
        };

        pullNext();
    });
}
