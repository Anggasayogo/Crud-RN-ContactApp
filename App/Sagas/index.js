import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux'
import { StaticDataTypes } from '../Redux/StaticDataRedux'
import { ContactTypes } from '../Redux/ContactRedux'

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { getRoot } from './StaticDataSagas'
import {
  getContact
} from './ContactSagas'

const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ContactTypes.GET_CONTACT_REQUEST, getContact, api),
    takeLatest(StaticDataTypes.GET_ROOT_REQUEST, getRoot, api)
  ])
}