import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import {
  jwt,
  counter,
  roomMessage,
  word,
} from '@/reducers/';

const oReducer = combineReducers({
  jwt: jwt,
  count: counter,
  roomMessages: roomMessage,
  words: word,
});

const oStore = createStore(
  oReducer,
  applyMiddleware(
    reduxThunk
  )
);

export default oStore;