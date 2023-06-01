import { useState } from 'react';
import errorImg from '../no.jpg';

export const Task1 = () => {
  const [value, setValue] = useState<number | string>('');
  const [isError, setIsError] = useState(false);
  const [isErrorAnimation, setIsErrorAnimation] = useState(false);

  const updateValue = (newValue: string) => {
    const isNumberValue = +newValue;

    if (!value || !newValue || isNumberValue) {
      setIsError(false);
      setIsErrorAnimation(false);
    }

    setValue(newValue);
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
    <div className="task">
      {isError && <img src={errorImg} alt="error" />}
      <p>Task 1</p>
      <p>enter a number</p>
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
