import React, { useState, createContext, useContext } from 'react';
import Son from './Son/Index';
import UserContext from './Contexts/User/Index';
/**
 * NOTE: Context 必须在 src/Context/Admin 里面 宣告 共用的 context 然后 在不同的 '个别' Commponet 使用
 * Example: UserContext 是成功的， PostitionContext 失效
 */

const PositionContext = createContext('Position');

function Component1() {
  const [oUser, setUser] = useState({ name: 'Joyce' });
  const [position, setPosition] = useState('秘书');

  return (
    <UserContext.Provider value={oUser}>
      <h1>{`Component 1 (直接使用值): ${oUser.name}`}</h1>
      <Component2 user={oUser} />
    </UserContext.Provider>
  );
}

function Component2(oProps: any) {
  let oUser = oProps.user;
  return (
    <>
      <span>Component 2 (利用 props 传值): </span>
      <span>{oUser.name}</span>
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
