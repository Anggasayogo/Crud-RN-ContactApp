import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import Images from '../Images'

// Styles
import styles from './Styles/ContactListStyle'
import { apply } from '../Themes/OsmiProvider'

const ContactList = props => {
  const { item, isEdited } = props

  const RenderAction = () => {
    return (
      <View style={apply("row items-center")}>
        <Image source={Images.icRemove} style={apply("w-24 h-24 mr-2")}/>
        <Image source={Images.icPen} style={apply("w-24 h-24")}/>
      </View>
  )}

  const RenderNext = () => {
    return (
      <View>
        <Image source={Images.icChevRight} style={apply("w-24 h-24")}/>
      </View>
  )}

  return (
    <View style={styles.container}>
      <View style={apply("row items-cener")}>
        {
          item.photo === 'N/A' ?(
            <Image source={Images.icUserDefault} style={apply("w-60 h-60 rounded-full")}/>
          ): (
          <Image source={{ uri: item.photo }} style={apply("w-60 h-60 rounded-full")}/>)
          }
        <View style={apply("px-3 flex")}>
          <Text style={apply("font-medium text-lg")}>{item?.firstName} {item?.lastName}</Text>
          <Text style={apply("font-regular text-sm")}>Age : {item?.age} Th</Text>
        </View>
        <View style={apply("items-center justify-center")}>
          {
            isEdited ? <RenderAction/> : <RenderNext/>
          }
        </View>
      </View>
      <View style={apply("border border-gray-100 my-3")}/>
    </View>
  )
}

// // Prop type warnings
// ContactList.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// ContactList.defaultProps = {
//   someSetting: false
// }

export default memo(ContactList)
