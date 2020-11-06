import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/reducers/';

const oReducer = combineReducers({
  jwt: reducers.jwt,
  uploaders: reducers.uploader,
  roomsMessages: reducers.roomMessage,
  words: reducers.word,
  users: reducers.user,
  usersRooms: reducers.userRoom,
  rooms: reducers.room,
  roomId: reducers.roomId
});

const oStore: any = createStore(
  oReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
    // other store enhancers if any
  )
);

export default oStore;
