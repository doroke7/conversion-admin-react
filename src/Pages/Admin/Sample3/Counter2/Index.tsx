import React, { useState, useCallback } from 'react';
const functionsCounter = new Set();

const Counter = () => {
  const [count, setCount] = useState(0);
  const [otherCounter, setOtherCounter] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const incrementOtherCounter = () => {
    setOtherCounter(otherCounter + 1);
  };

  functionsCounter.add(increment);
  functionsCounter.add(decrement);
  functionsCounter.add(incrementOtherCounter);

  // NOTE：这种函数有缺点， 每次 render 都会从新建立
  console.log(functionsCounter.size);

  return (
    <>
      Counter2: {count},{otherCounter}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementOtherCounter}>incrementOtherCounter</button>
    </>
  );
};

export default Counter;
