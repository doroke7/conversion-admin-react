import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';

import App from './App';

const ADD_USER = 'ADD_USER';

const oInitState = {
  users: ['Tom', 'Mary', 'Josh', 'Laplace']
};

const oReducer = (oState = oInitState, oAction) => {
  switch (oAction.type) {
    case ADD_USER: {
      const aUsers = oState.users.map((sUser) => sUser);
      console.info(aUsers, 'users');
      aUsers.push(oAction.payload);
      return {
        users: aUsers
      };
    }
    default:
      return oState;
  }
};

const oStore = createStore(oReducer);

/**
 * 1. 利用 createStore(), <Provider></Provider> 将 store 数据绑定在全局
 * 2. 利用 createStore(oReducer), 定义各种 "redux 事件" 数据转换的算法
 */

ReactDOM.render(
  <Provider store={oStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
