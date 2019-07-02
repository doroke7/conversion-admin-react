import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  counter,
} from '@/reducers/';

const oReducer = combineReducers({
  count: counter,
});

const oStore = createStore(
  oReducer,
  // applyMiddleware(
  //   thunkMiddleware
  // )
);

export default oStore;