export const testPromiseDelay = 500;

const asyncFn = (delay: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve("ok");
        }, delay);
    });

export async function asyncCall<T>(arg: T) {
    console.log("call " + arg);

    const result = await asyncFn(testPromiseDelay);

    console.log("result " + arg);
    return result;
}

export function sendConcurrentRequests<T>(
    values: T[],
    fn: <T>(arg: T) => Promise<unknown>,
    limit: number
) {
    // return new Promise((resolve) => {
    // Copy arguments to avoid side effect, reverse queue as
    // pop is faster than shift
    const argQueue = [...values].reverse();
    let count = 0;
    const outs: unknown[] = [];

    const poolNext = () => {
        if (!argQueue.length && !count) {
            // resolve(outs);
            return;
        } else {
            while (count < limit && argQueue.length) {
                const index = values.length - argQueue.length;
                const arg = argQueue.pop();
                count += 1;
                const out = fn(arg);

                const processOut = (out: unknown, index: number) => {
                    outs[index] = out;
                    count -= 1;
                    poolNext();
                };

                if (typeof out === "object" && out.then) {
                    out.then((out: unknown) => processOut(out, index));
                } else {
                    processOut(out, index);
                }
            }
        }
    };
    poolNext();
    // });
}
