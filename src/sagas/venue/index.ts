import { select, put, takeLatest, call } from 'redux-saga/effects';
import {
  fetchDataService,
} from '../../actions/apis'
import {
  FETCH_VENUES,
  VENUES_RECEIVED,
} from '../../constants/actionTypes'

function* fetchVenues() {
  const state = yield select()
  const response = yield fetchDataService('/venues', state.authentication.header)
  yield put({ type: VENUES_RECEIVED, payload: response.data.data, });
}

export function* venueActionWatcher() {
  yield takeLatest( FETCH_VENUES, fetchVenues)
}