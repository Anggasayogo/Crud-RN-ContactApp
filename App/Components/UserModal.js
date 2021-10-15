import React, { useState, forwardRef, useImperativeHandle, memo } from 'react'
import Modal from 'react-native-modal'
import { View, Text, TextInput } from 'react-native'
import Button from './Button'

// Styles
import styles from './Styles/UserModalStyle'
import { apply } from '../Themes/OsmiProvider'

const UserModal =  forwardRef((props, ref) => {
  const [modalShow, setModalShow] = useState(false)
  const [firstname, setfirstname] = useState('')
  const [lastName, setlastName] = useState('')
  const [age, setage] = useState('')
  const [imageUrl, setimageUrl] = useState('')

  useImperativeHandle(ref, () => ({
    showModal() {
      setModalShow(true)
    },
    disableModal() {
      setModalShow(false)
    }
  }))

  const onSubmitingContact = () => {

  }

  return (
    <Modal
      isVisible={modalShow}
      onBackButtonPress={() => setModalShow(false)}
      onBackdropPress={() => setModalShow(false)}
      onSwipeComplete={() => setModalShow(false)}
      backdropTransitionOutTiming={100}
      useNativeDriver={true}
      style={apply("m-0 justify-end")}>
      <View style={apply("bg-white rounded-t-match px-5 pt-2 pb-7 p-4")}>
        <Button
          onPress={() => setModalShow(false)}
          activeOpacity={0.9}
          style={apply("w-80 h-5 rounded-15 self-center mb-8 bg-gray-200")}
        />
        <Text style={apply("font-medium text-lg mb-3")}>Create Contact</Text>
        <TextInput
          onChangeText={(val) => setfirstname(val) }
          value={firstname} 
          style={apply("border border-gray-300 rounded rounded-lg px-5 my-2")}
          placeholder="Fistname"
        />
        <TextInput 
          onChangeText={(val) => setlastName(val)}
          value={lastName} 
          style={apply("border border-gray-300 rounded rounded-lg px-5 my-2")}
          placeholder="Lastname"
        />
        <TextInput
          onChangeText={(val) => setage(val) } 
          value={age}
          style={apply("border border-gray-300 rounded rounded-lg px-5 my-2")}
          placeholder="Age"
          keyboardType="numeric"
        />
        <TextInput 
          onChangeText={(val) => setimageUrl(val)}
          value={imageUrl}
          style={apply("border border-gray-300 rounded rounded-lg px-5 my-2")}
          placeholder="Image Url ex http://example.com/image.png"
        />
        <Button
          onPress={onSubmitingContact}
          style={apply("bg-primary rounded rounded-lg my-2 h-50 items-center justify-center")}
        >
          <Text style={apply("text-white font-medium text-md")}>Submit</Text>
        </Button>
      </View>
    </Modal>
  )
})

// // Prop type warnings
// UserModal.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// UserModal.defaultProps = {
//   someSetting: false
// }

export default memo(UserModal)
