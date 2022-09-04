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

  console.info('UseEffect init');

  useEffect(() => {
    console.info('UseEffect useEffect before');

    sleep(2000);
    console.info('UseEffect useEffect after');
    setCount(98);
  }, []);

  return (
    <div>
      <div>count for useEffect :{count}</div>
    </div>
  );
}
export default UseEffect;
