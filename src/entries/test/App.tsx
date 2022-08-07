import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  // 使用 useSelector 取出 Store 保管的 state
  const aUsers = useSelector((oStore: any) => oStore.users);
  const oDispatch = useDispatch();
  let cHandleClick = (oEvent: React.MouseEvent) => {
    let b = oDispatch({ type: 'ADD_USER', payload: 'JOE' });
    let a = b;
    let c = 1 + 1;
    console.info(b, c);
  };

  let cHandleClickWithCallback = useCallback(
    (oEvent: React.MouseEvent) => {
      let b = oDispatch({ type: 'ADD_USER', payload: 'JOE' });
    },
    [oDispatch]
  );

  return (
    <div>
      <div onClick={cHandleClickWithCallback}>CLICK ME!</div>
      <ul>
        {aUsers.map((sUser, iIndex) => (
          <li key={iIndex}>{sUser}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
