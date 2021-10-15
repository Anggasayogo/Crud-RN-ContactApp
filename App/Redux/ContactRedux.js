import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getContactRequest: ['data'],
  getContactSuccess: ['data'],
  getContactFailure: ['error'],
})

export const ContactTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  contactModule: { data: null, fetching: false, error: null }
})

export const ContactSelectors = {
  getData: state => state.contact.contactModule
}

export const getContactRequest = (state, { data }) =>
  state.merge({ ...state, contactModule: { ...state.contactModule, fetching: true, error: null } })
export const getContactSuccess = (state, { data }) =>
  state.merge({ ...state, contactModule: { ...state.contactModule, data, fetching: false, error: null } })
export const getContactFailure = (state, { error }) =>
  state.merge({ ...state, contactModule: { ...state.contactModule, fetching: false, error } })


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CONTACT_REQUEST]: getContactRequest,
  [Types.GET_CONTACT_SUCCESS]: getContactSuccess,
  [Types.GET_CONTACT_FAILURE]: getContactFailure,
})
