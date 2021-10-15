import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

// Styles
import styles from './Styles/UserModalStyle'
import { apply } from '../Themes/OsmiProvider'

const UserModal = props => {
  return (
    <View style={styles.container}>
      <Text>UserModal Component</Text>
    </View>
  )
}

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
