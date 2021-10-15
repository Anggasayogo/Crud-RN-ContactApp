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

  const response = yield call(api.postContact, data?.data)

  if (response.ok) {
    yield all([
      put(ContactActions.postContactSuccess(response.data)),
      put(ContactActions.getContactRequest())
    ])
    data?.next()
  } else {
    yield put(ContactActions.postContactFailure(response))
  }
}

export function * deleteContact (api, action) {
  const { data } = action

  const response = yield call(api.deleteContact, data?.data)

  if (response.ok) {
    yield all([
      put(ContactActions.deleteContactSuccess(response.data)),
      put(ContactActions.getContactRequest())
    ])
    data?.next()
  } else {
    yield put(ContactActions.deleteContactFailure(response))
  }
}

export function * getDetailContact (api, action) {
  const { data } = action

  const response = yield call(api.getDetailContact, data?.data)

  if (response.ok) {
    yield put(ContactActions.getDetailContactSuccess(response.data))
    data?.next()
  } else {
    yield put(ContactActions.getDetailContactFailure(response))
  }
}

export function * updateDetailContact (api, action) {
  const { data } = action

  const response = yield call(api.updateContact, data)

  if (response.ok) {
    yield all([
      put(ContactActions.getDetailContactSuccess(response.data)),
      put(ContactActions.getContactRequest())
    ])
    data?.next()
  } else {
    yield put(ContactActions.getDetailContactFailure(response))
  }
}
