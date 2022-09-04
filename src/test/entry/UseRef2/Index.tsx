import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';

/**
 *
 * useRef 范例二： 取代 jQuery DOM 的 事件绑定
 */

function UseRef2(oProps: any): any {
  const [count, setCount] = useState(0);
  const oRef: any = useRef();

  let cHandleClick = (oEvent: any) => {
    oRef.current.focus();
  };

  return (
    <div>
      <div onClick={cHandleClick}>CLICK</div>
      <input ref={oRef} value="-"></input>
    </div>
  );
}
export default UseRef2;
