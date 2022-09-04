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

  useEffect(() => {
    sleep(2000);
    setCount(98);
  }, []);

  return <div>{count}</div>;
}
export default UseEffect;
