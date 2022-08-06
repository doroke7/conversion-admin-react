import React from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  // 使用 useSelector 取出 Store 保管的 state
  const aUsers = useSelector((oState: any) => oState.users);
  return (
    <ul>
      {aUsers.map((sUser, iIndex) => (
        <li key={iIndex}>{sUser}</li>
      ))}
    </ul>
  );
};

export default App;
