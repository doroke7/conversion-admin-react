import React, {useState, useEffect, useLayoutEffect } from 'react';

function sleep(duration) {
  const start = Date.now();
  let end = start;
  while (end < start + duration) {
    end = Date.now();
  }
}

/**
 *
 * NOTE： 少用 useLayoutEffect, 会造成 SPA 同步阻塞渲染， 而且这个阻塞 会阻塞 全部的 DOM
 */

function UseLayoutEffect(oProps: any): any {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  console.info('UseLayoutEffect init');

  useLayoutEffect(() => {
    console.info('UseLayoutEffect UseLayoutEffect before');

    sleep(2000);
    console.info('UseLayoutEffect UseLayoutEffect after');

    setNumber(99);
  }, []);

  return (
    <div>
      <div>number for useLayoutEffect :{number}</div>
    </div>
  );
}
export default UseLayoutEffect;
