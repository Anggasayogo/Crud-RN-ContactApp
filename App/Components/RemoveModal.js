import React, { useState, forwardRef, useImperativeHandle, memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'
import Button from './Button'

// Styles
import styles from './Styles/RemoveModalStyle'
import { apply } from '../Themes/OsmiProvider'

const RemoveModal = forwardRef((props, ref) => {
  const [modalShow, setModalShow] = useState(false)

  useImperativeHandle(ref, () => ({
    showModal() {
      setModalShow(true)
    },
    disableModal() {
      setModalShow(false)
    }
  }))

  return (
    <Modal
      isVisible={modalShow}
      onBackButtonPress={() => setModalShow(false)}
      onBackdropPress={() => setModalShow(false)}
      onSwipeComplete={() => setModalShow(false)}
      backdropTransitionOutTiming={100}
      useNativeDriver={true}
      style={apply("justify-center")}>
        <View style={apply("bg-white p-5 rounded-lg items-center justify-center")}>
          <Text style={apply("text-center font-medium text-lg px-3")}>Apakah anda yakin ingin menghapush Contact Ini ?</Text>
          <View style={apply("row items-center mt-5")}>
            <Button onPress={()=> setModalShow(false)} style={apply("border border-primary rounded rounded-md mr-4")}>
              <Text style={apply("px-5 py-2 text-primary font-medium")}>Tidak</Text>
            </Button>
            <Button style={apply("bg-primary rounded rounded-md")}>
              <Text style={apply("px-5 py-2 text-white font-medium ")}>Ya</Text>
            </Button>
          </View>
        </View>
    </Modal>
  )
})

// // Prop type warnings
// RemoveModal.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// RemoveModal.defaultProps = {
//   someSetting: false
// }

export default memo(RemoveModal)
