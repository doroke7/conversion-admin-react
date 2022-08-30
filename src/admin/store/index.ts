import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/admin/reducers/index';

const oReducer = combineReducers({
  adminJwt: reducers.jwt,
  adminRoom: reducers.room
});

const oStore: any = createStore(
  oReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
    // other store enhancers if any
  )
);

export default oStore;
