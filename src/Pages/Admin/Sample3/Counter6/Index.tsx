import { count } from 'console';
import React, { useState, useCallback } from 'react';
const functionsCounter = new Set();

const Counter = () => {
  const [oState, cSetState] = useState({
    count: 0,
    other: 0
  });

  // NOTE: 每次 render Math.random 都会从新运算写入
  let iOther = oState.other + Math.random();

  const increment = () => {
    cSetState({ ...oState, count: oState.count + 1 });
  };

  const incrementOtherCounter = () => {
    cSetState({ ...oState, other: oState.other + 1 });
  };

  return (
    <>
      <div>Counter6:</div>
      <div>
        {oState.count}
        <button onClick={increment}>+</button>
      </div>
      <div>
        {iOther}
        <button onClick={incrementOtherCounter}>incrementOtherCounter</button>
      </div>
    </>
  );
};

export default Counter;
