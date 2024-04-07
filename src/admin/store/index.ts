import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/admin/reducers/index';

let oStore: any = createStore(
  combineReducers({
    auhorization: reducers.authenticationAuthenticator
  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default oStore;
