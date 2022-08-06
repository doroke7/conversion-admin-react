import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  // 使用 useSelector 取出 Store 保管的 state
  const aUsers = useSelector((oState: any) => oState.users);
  const oDispatch = useDispatch();
  let cHandleClick = (oEvent: React.MouseEvent) => {
    oDispatch({ type: 'ADD_USER', payload: 'JOE' });
  };

  return (
    <div>
      <div onClick={cHandleClick}>CLICK ME!</div>
      <ul>
        {aUsers.map((sUser, iIndex) => (
          <li key={iIndex}>{sUser}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
