// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// default headers request
const headers = {
  'Content-Type': 'application/json'
}

const create = (baseURL = 'https://simple-contact-crud.herokuapp.com/') => {
  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 15000
  })

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  // cntact
  const contact = () => api.get('contact')
  const postContact = (data) => api.post('contact',data)
  const deleteContact = (param) => api.delete(`contact/${param}`)
  const getDetailContact = (param) => api.get(`contact/${param}`)
  const updateContact = (data) => api.put(`contact/${data?.param}`, data?.data)

  return {
    contact,
    getRoot,
    getRate,
    getUser,
    postContact,
    getDetailContact,
    updateContact,
    deleteContact,

    api
  }
}

// let's return back our create method as the default.
export default {
  create
}
