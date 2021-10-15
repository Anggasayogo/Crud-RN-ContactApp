import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { StatusBar, Image, View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContactActions from '../Redux/ContactRedux'
import Images from '../Images'

// Components
import Button from '../Components/Button'
import UserModal from '../Components/UserModal'
import RemoveModal from '../Components/RemoveModal'
import ContactList from '../Components/ContactList'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { apply } from '../Themes/OsmiProvider'

const LaunchScreen = props => {
  const { contact, contactAdd, contactDeleted, detailContact, updateContacts } = props
  const ModalRef = useRef()
  const RmvModalRef = useRef()
  const [refresh, setRefreshing] = useState(false)
  const [edited, setEdited] = useState(false)
  const [idContact, setIdContact] = useState(null)

  useEffect(()=>{
    props.getContact()
  },[])

  const editedTouched = () => {
    setEdited(!edited)
  }

  const onAddContactTouched = () => {
    ModalRef?.current?.resetValues()
    ModalRef?.current?.showModal('post')
  }

  const onEditContactTouched = (val) => {
    props.getDetailContact({
      data: val?.id,
      next : () => {
        ModalRef?.current?.showModal('put')
      }
    })
  }

  const onRemoveContactTouched = (val) => {
    setIdContact(val?.id)
    RmvModalRef?.current?.showModal()
  }

  const onActionRemoveContct = () => {
    props.deleteContact({
      data : idContact,
      next : () => {
        RmvModalRef?.current?.disableModal()
      }
    })
  }

  const addAnewContact = (val) => {
    props.postContact({
      data : JSON.stringify({
        firstName: val?.firstname,
        lastName: val?.lastName,
        age: val?.age,
        photo: val?.imageUrl
      }),
      next : () => {
        ModalRef?.current?.disableModal()
      }
    })
  }

  const updateNewContact = (val) => {
    props.updateContact({
      data : JSON.stringify({
        firstName: val?.firstname,
        lastName: val?.lastName,
        age: val?.age,
        photo: val?.imageUrl
      }),
      param: val?.id,
      next : () => {
        ModalRef?.current?.disableModal()
      }
    })
  } 

  const onRefressh = () => {
    setRefreshing(true)
    props.getContact()
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={apply('primary')} />
      <View style={apply("row items-center px-5 py-10")}>
        <Image source={Images.icUserGroup} style={apply("w-35 h-35 mr-2")}/>
        <Text style={apply("text-white font-medium text-3xl flex")}>My Contact</Text>
        <Button onPress={onAddContactTouched}>
          <Image source={Images.icPlus } style={apply("w-35 h-35")}/>
        </Button>
        <Button onPress={editedTouched}>
          <Image source={Images.icEdit} style={apply("w-30 h-30")}/>
        </Button>
      </View>
      <View style={apply("flex bg-white rounded-t-solid p-5")}>
        {
          contact?.fetching ? (
            <Text style={apply("text-lg font-medium text-center my-4")}>Loading...</Text>
          ) : (
            <FlatList
              data={contact?.data?.data}
              keyExtractor={(_,index) => index.toString()}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefressh}/>}
              renderItem={({item})=> 
                <ContactList 
                showEditModal={onEditContactTouched} 
                showRemoveModal={onRemoveContactTouched}
                isEdited={edited} 
                item={item} 
              />}
            />
          )
        }
      </View>
      <UserModal
        ref={ModalRef}
        onSubmitingContact={(val)=> addAnewContact(val)}
        onUpdatingContact={(val)=> updateNewContact(val)}
        postDispatching={contactAdd?.fetching}
        updateDispatching={updateContacts?.fetching}
        defaultValue={detailContact}
      />
      <RemoveModal
        ref={RmvModalRef}
        onRemove={onActionRemoveContct}
        deleteDispatching={contactDeleted?.fetching}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  contact: state.contact.contactModule,
  contactAdd: state.contact.createContact,
  contactDeleted: state.contact.deleteContact,
  detailContact: state.contact.detailContact,
  updateContacts: state.contact.updateContact
})

const mapDispatchToProps = dispatch => ({
  getContact: () => dispatch(ContactActions.getContactRequest()),
  postContact: (val) => dispatch(ContactActions.postContactRequest(val)),
  deleteContact: (val) => dispatch(ContactActions.deleteContactRequest(val)),
  getDetailContact: (val) => dispatch(ContactActions.getDetailContactRequest(val)),
  updateContact: (val) => dispatch(ContactActions.updateContactRequest(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
