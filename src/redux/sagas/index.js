import { all } from 'redux-saga/effects';

import billManagerSaga from './billManager';

export default function* rootSaga() {
  yield all([...billManagerSaga]);
}
