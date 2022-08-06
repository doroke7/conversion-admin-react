import React from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  // 使用 useSelector 取出 Store 保管的 state
  const todoList = useSelector((state: any) => state.todoList);
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  );
};

export default App;
