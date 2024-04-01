import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/admin/reducers/index';

const oReducer = combineReducers({
  jwt: reducers.authenticationAuthenticator,
});

const oStore: any = createStore(
  oReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
  )
);

export default oStore;
