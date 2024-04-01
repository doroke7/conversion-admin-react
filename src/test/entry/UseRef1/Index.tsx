import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

/**
 *
 * useRef 范例一： Compoent 内 不会因为值改变，重新 Render 的 值
 */

function UseRef1(oProps: any): any {
  const [count, setCount] = useState(0);
  const oRef = useRef(0);

  useEffect(() => {
    let oInterval = setInterval(() => {
      oRef.current = oRef.current + 1;
      console.info('oRef.current=' + oRef.current);
    }, 1000);

    return () => {
      clearInterval(oInterval);
    };
  }, []);

  return (
    <div>
      <div>count for UseRef :{oRef.current}</div>
    </div>
  );
}
export default UseRef1;
