import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getContactRequest: ['data'],
  getContactSuccess: ['data'],
  getContactFailure: ['error'],

  postContactRequest: ['data'],
  postContactSuccess: ['data'],
  postContactFailure: ['error'],

  deleteContactRequest: ['data'],
  deleteContactSuccess: ['data'],
  deleteContactFailure: ['error'],

  getDetailContactRequest: ['data'],
  getDetailContactSuccess: ['data'],
  getDetailContactFailure: ['error'],
})

export const ContactTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  contactModule: { data: [], fetching: false, error: null },
  createContact: { data: [], fetching: false, error: null },
  deleteContact: { data: [], fetching: false, error: null },
  detailContact: { data: [], fetching: false, error: null },
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

export const postContactRequest = (state, { data }) =>
  state.merge({ ...state, createContact: { ...state.createContact, fetching: true, error: null } })
export const postContactSuccess = (state, { data }) =>
  state.merge({ ...state, createContact: { ...state.createContact, data, fetching: false, error: null } })
export const postContactFailure = (state, { error }) =>
  state.merge({ ...state, createContact: { ...state.createContact, fetching: false, error } })

export const deleteContactRequest = (state, { data }) =>
  state.merge({ ...state, deleteContact: { ...state.deleteContact, fetching: true, error: null } })
export const deleteContactSuccess = (state, { data }) =>
  state.merge({ ...state, deleteContact: { ...state.deleteContact, data, fetching: false, error: null } })
export const deleteContactFailure = (state, { error }) =>
  state.merge({ ...state, deleteContact: { ...state.deleteContact, fetching: false, error } })

export const getDetailContactRequest = (state, { data }) =>
  state.merge({ ...state, detailContact: { ...state.detailContact, fetching: true, error: null } })
export const getDetailContactSuccess = (state, { data }) =>
  state.merge({ ...state, detailContact: { ...state.detailContact, data, fetching: false, error: null } })
export const getDetailContactFailure = (state, { error }) =>
  state.merge({ ...state, detailContact: { ...state.detailContact, fetching: false, error } })


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CONTACT_REQUEST]: getContactRequest,
  [Types.GET_CONTACT_SUCCESS]: getContactSuccess,
  [Types.GET_CONTACT_FAILURE]: getContactFailure,

  [Types.POST_CONTACT_REQUEST]: postContactRequest,
  [Types.POST_CONTACT_SUCCESS]: postContactSuccess,
  [Types.POST_CONTACT_FAILURE]: postContactFailure,

  [Types.DELETE_CONTACT_REQUEST]: deleteContactRequest,
  [Types.DELETE_CONTACT_SUCCESS]: deleteContactSuccess,
  [Types.DELETE_CONTACT_FAILURE]: deleteContactFailure,

  [Types.GET_DETAIL_CONTACT_REQUEST]: getDetailContactRequest,
  [Types.GET_DETAIL_CONTACT_SUCCESS]: getDetailContactSuccess,
  [Types.GET_DETAIL_CONTACT_FAILURE]: getDetailContactFailure,
})
