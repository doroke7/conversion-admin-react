import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/admin/reducers/index';

let oStore = createStore(
  combineReducers({
    auhorization: reducers.authorization,
    adminUser: reducers.adminUser,
    adminUsers: reducers.adminUsers,

  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default oStore;
