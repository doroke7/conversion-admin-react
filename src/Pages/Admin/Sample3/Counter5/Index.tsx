import { count } from 'console';
import React, { useState, useCallback } from 'react';
const functionsCounter = new Set();

const Counter = () => {
  const [oState, cSetState] = useState({
    count: 0,
    other: 0
  });

  const increment = useCallback(() => {
    cSetState({ ...oState, count: oState.count + 1 });
  }, [oState.count]);

  // 传入 array, 保留 mutable (reference) varible

  const decrement = useCallback(() => {
    cSetState({ ...oState, count: oState.count - 1 });
  }, [oState.count]);

  const incrementOtherCounter = useCallback(() => {
    cSetState({ ...oState, other: oState.other + 1 });
  }, [oState.other]);

  functionsCounter.add(increment);
  functionsCounter.add(decrement);
  functionsCounter.add(incrementOtherCounter);

  console.log(functionsCounter.size);

  return (
    <>
      Counter5: {oState.count},{oState.other}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementOtherCounter}>incrementOtherCounter</button>
    </>
  );
};

export default Counter;
