import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';

import reducers from '@/admin/reducers/index';

let oStore = createStore(
  combineReducers({
    authorization: reducers.authorization,
    authorizations: reducers.authorizations,
    me: reducers.me,
    adminUser: reducers.adminUser,
    adminUsers: reducers.adminUsers,
    appUsers: reducers.appUsers,
    appPipelines: reducers.appPipelines,
    appPipeline: reducers.appPipeline

  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default oStore;
