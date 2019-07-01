import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import memberReducer from './../reducers/member';

const IndexReducer = combineReducers({
    members: memberReducer
});

const indexStore = createStore(
    IndexReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

export default indexStore;