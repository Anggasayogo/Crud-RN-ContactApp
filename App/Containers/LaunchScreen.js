import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { StatusBar, Image, View, Text, FlatList } from 'react-native'
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
  const { contact } = props
  const ModalRef = useRef()
  const RmvModalRef = useRef()
  const [edited, setEdited] = useState(false)

  useEffect(()=>{
    props.getContact()
    console.tron.log(contact)
  },[])

  const editedTouched = () => {
    setEdited(!edited)
  }

  const onAddContactTouched = () => {
    ModalRef?.current?.showModal()
  }

  const onEditContactTouched = () => {
    ModalRef?.current?.showModal()
  }

  const onRemoveContactTouched = () => {
    RmvModalRef?.current?.showModal()
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
        <FlatList
          data={contact?.data?.data}
          keyExtractor={(_,index) => index.toString()}
          renderItem={({item})=> 
            <ContactList 
            showEditModal={onEditContactTouched} 
            showRemoveModal={onRemoveContactTouched}
            isEdited={edited} 
            item={item} 
          />}
        />
      </View>
      <UserModal
        ref={ModalRef}
      />
      <RemoveModal
        ref={RmvModalRef}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  contact: state.contact.contactModule
})

const mapDispatchToProps = dispatch => ({
  getContact: () => dispatch(ContactActions.getContactRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
