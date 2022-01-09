import { count } from 'console';
import React, { useState, useCallback } from 'react';
const functionsCounter = new Set();

const Counter = () => {
  const [oState, cSetState] = useState({
    count: 0,
    other: 0
  });

  const increment = () => {
    cSetState({ ...oState, count: oState.count + 1 });
  };

  const decrement = () => {
    cSetState({ ...oState, count: oState.count - 1 });
  };

  const incrementOtherCounter = () => {
    cSetState({ ...oState, other: oState.other + 1 });
  };

  functionsCounter.add(increment);
  functionsCounter.add(decrement);
  functionsCounter.add(incrementOtherCounter);

  console.log(functionsCounter.size);

  return (
    <>
      Counter4: {oState.count},{oState.other}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementOtherCounter}>incrementOtherCounter</button>
    </>
  );
};

export default Counter;
