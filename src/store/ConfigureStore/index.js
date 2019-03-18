import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';

import RootReducer from '../../reducers';
import rootSaga from '../../sagas';

let configureStore = initialState => {

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
      RootReducer,
      initialState,
      applyMiddleware(thunkMiddleware, sagaMiddleware, loggerMiddleware)
  )

  sagaMiddleware.run(rootSaga);
  return store;

};
export default configureStore