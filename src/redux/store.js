import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/reducers';
import rootSaga from 'redux/sagas';

const bindMiddlewares = (middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, bindMiddlewares([sagaMiddleware]));
sagaMiddleware.run(rootSaga);

export default store;
