import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import {
  jwtReducer,
  uploaderReducer,
  roomMessageReducer,
  wordReducer,
} from '@/reducers/';

const oReducer = combineReducers({
  jwt: jwtReducer,
  uploaders: uploaderReducer,
  roomMessages: roomMessageReducer,
  words: wordReducer,
});

const oStore = createStore(
  oReducer,
  applyMiddleware(
    reduxThunk
  )
);

export default oStore;