import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';

function sleep(duration) {
  const start = Date.now();
  let end = start;
  while (end < start + duration) {
    end = Date.now();
  }
}

function UseEffect(oProps: any): any {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  useLayoutEffect(() => {
    sleep(2000);
    setCount(98);
  }, []);

  useLayoutEffect(() => {
    sleep(2000);
    setNumber(99);
  }, []);

  return (
    <div>
      <div>count for useLayoutEffect :{count}</div>
      <div>number for useLayoutEffect :{number}</div>
    </div>
  );
}
export default UseEffect;
