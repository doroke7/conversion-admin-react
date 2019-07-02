import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {member} from '@/reducers/';

const oReducer = combineReducers({
  members: member
});

const oStore = createStore(
  oReducer,
  // applyMiddleware(
  //   thunkMiddleware
  // )
);

export default oStore;