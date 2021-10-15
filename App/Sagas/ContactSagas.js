import { call, put } from 'redux-saga/effects'
import ContactActions from '../Redux/ContactRedux'
// import { ContactSelectors } from '../Redux/ContactRedux'

export function * getContact (api, action) {
  const { data } = action

  const response = yield call(api.getMyContact, data)

  if (response.ok) {
    yield put(ContactActions.getContactSuccess(response.data))
  } else {
    yield put(ContactActions.getContactFailure(response))
  }
}
