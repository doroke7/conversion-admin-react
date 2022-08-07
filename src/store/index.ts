import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/reducers/';

const oReducer = combineReducers({
  adminJwt: reducers.admin.jwt,
  adminRoom: reducers.admin.room
});

const oStore: any = createStore(
  oReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
    // other store enhancers if any
  )
);

export default oStore;
