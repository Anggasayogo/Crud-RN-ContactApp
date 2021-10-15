import { call, put, all } from 'redux-saga/effects'
import ContactActions from '../Redux/ContactRedux'
// import { ContactSelectors } from '../Redux/ContactRedux'

export function * getContact (api, action) {
  const { data } = action

  const response = yield call(api.contact, data)

  if (response.ok) {
    yield put(ContactActions.getContactSuccess(response.data))
  } else {
    yield put(ContactActions.getContactFailure(response))
  }
}

export function * postContact (api, action) {
  const { data } = action

  const response = yield call(api.contact, data)

  if (response.ok) {
    yield all([
      ContactActions.postContactSuccess(response.data),
      ContactActions.getContactRequest()
    ])
  } else {
    yield put(ContactActions.postContactFailure(response))
  }
}
