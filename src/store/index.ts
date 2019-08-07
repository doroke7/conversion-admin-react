import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { jwtReducer, uploaderReducer, roomMessageReducer, wordReducer, userReducer } from '@/reducers/';

const oReducer = combineReducers({
  jwt: jwtReducer,
  uploaders: uploaderReducer,
  roomMessages: roomMessageReducer,
  words: wordReducer,
  users: userReducer,
});

const oStore:  any = createStore(oReducer, applyMiddleware(reduxThunk));

export default oStore;
