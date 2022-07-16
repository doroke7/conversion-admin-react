import React, { useState, createContext, useContext } from 'react';
import Son from './Son/Index';
import events from './events/index';

function Component1() {
  const [oUser, setUser] = useState({ name: 'Joyce' });

  return (
    <>
      <h1>{`Component 1 (直接使用值): ${oUser.name}`}</h1>
      <Component2 user={oUser} />
    </>
  );
}

function Component2(oProps: any) {
  let oUser = oProps.user;
  let cHandleClick = () => {
    events.emit('click2', 'FUCK');
  };
  return (
    <>
      <span onClick={cHandleClick}>Component 2 (利用 event-emitter 传值): </span>
      <span>{oUser.name || ''}</span>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Son />
    </>
  );
}

export default Component1;
