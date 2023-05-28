import { useState } from 'react';

export const Task1 = () => {
  const [value, setValue] = useState<number | string>('');
  const [isError, setIsError] = useState(false);
  const [isErrorAnimation, setIsErrorAnimation] = useState(false);

  const updateValue = (value: string) => {
    if (!value) {
      setIsError(false);
    }

    setIsErrorAnimation(false);
    setValue(value);
  };

  const validate = () => {
    const isNumberValue = +value;

    if (isNumberValue) {
      return alert(value);
    }

    setIsError(true);
    setIsErrorAnimation(true);
  };

  return (
    <div>
      <p>Task 1</p>
      <input
        className={`${isError ? 'isError' : ''}${isErrorAnimation ? ' isErrorAnimation' : ''}`}
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
      <button onClick={validate} disabled={!value.toString().length}>
        submit
      </button>
    </div>
  );
};
