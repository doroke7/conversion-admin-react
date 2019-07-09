import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  counter,
  roomMessage,
  word,
} from '@/reducers/';

const oReducer = combineReducers({
  count: counter,
  roomMessages: roomMessage,
  words: word,
});

const oStore = createStore(
  oReducer,
  // applyMiddleware(
  //   thunkMiddleware
  // )
);

export default oStore;