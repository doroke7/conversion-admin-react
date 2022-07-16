import React, { useState, createContext, useContext, useEffect } from 'react';
import events from './../events/index';

const PositionContext = createContext('Position');

function Son() {
  const position = useContext(PositionContext);
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    // 声明一个自定义事件
    // 在组件装载完成以后
    let eventEmitter = events.addListener('click2', (sMessage) => {
      setMsg(sMessage);
    });
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('click2', (sMessage) => {
        setMsg(sMessage);
      });
    };
  }, []);
  return (
    <>
      <span>Component 5 (利用 event 传值): </span>
      <span>{'Hello' + position + '----' + (msg || '')}</span>
    </>
  );
}

export default Son;
