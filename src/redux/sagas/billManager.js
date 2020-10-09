import { call, put, takeLatest } from 'redux-saga/effects';

import billManagerActions from 'redux/actions/billManager';
import * as billManagerTypes from 'redux/actionTypes/billManager';
import { getBills } from 'apis/billManager';

function* getBillsSaga() {
  try {
    const { bills } = yield call(getBills);
    yield put(billManagerActions.getBillsSuccess(bills));
  } catch (err) {
    yield put(billManagerActions.getBillsError(err));
  }
}

export default [takeLatest(billManagerTypes.GET_BILLS, getBillsSaga)];
