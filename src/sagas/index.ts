import { all } from 'redux-saga/effects';
// import { venueActionWatcher } from './venue'
// import { authenticationActionWatcher } from './authentication'
// import { dashboardActionWatcher } from './dashboard'

export default function* rootSaga() {
  yield all([
    // venueActionWatcher(),
    // authenticationActionWatcher(),
    // dashboardActionWatcher(),
  ]);
}
