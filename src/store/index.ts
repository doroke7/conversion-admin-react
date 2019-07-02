import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  member,
  counter,
} from '@/reducers/';

const oReducer = combineReducers({
  members: member,
  count: counter,
});

const oStore = createStore(
  oReducer,
  // applyMiddleware(
  //   thunkMiddleware
  // )
);

export default oStore;