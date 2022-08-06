import React from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  // 使用 useSelector 取出 Store 保管的 state
  const aUsers = useSelector((oState: any) => oState.users);
  return (
    <ul>
      {aUsers.map((sUSer, iIndex) => (
        <li key={iIndex}>{sUSer}</li>
      ))}
    </ul>
  );
};

export default App;
