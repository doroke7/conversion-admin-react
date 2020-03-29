import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import { jwtReducer, uploaderReducer, roomMessageReducer, wordReducer, userReducer, roomReducer } from '@/reducers/';

const oReducer = combineReducers({
  jwt: jwtReducer,
  uploaders: uploaderReducer,
  roomMessages: roomMessageReducer,
  words: wordReducer,
  users: userReducer,
  rooms: roomReducer
});

const oStore: any = createStore(
  oReducer, 
  composeWithDevTools(
    applyMiddleware(reduxThunk),
    // other store enhancers if any
  )
);

export default oStore;
