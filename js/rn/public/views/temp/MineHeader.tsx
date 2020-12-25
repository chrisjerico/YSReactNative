import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'
import { anyEmpty } from '../../tools/Ext'

interface MineHeaderProps {
  showCustomerService?: boolean
  onPressCustomerService?: () => any
  customerTitle?: string
  customerIcon?: string
  title?: string
  titleColor?: string
  renderHeader?: () => any
  onPressBackBtn?: () => any
  showBackBtn?: boolean
  backTitle?: string
}

const MineHeader = ({
  showCustomerService = false,
  onPressCustomerService,
  customerTitle,
  customerIcon,
  title,
  titleColor,
  renderHeader,
  showBackBtn = false,
  onPressBackBtn,
  backTitle,
}: MineHeaderProps) => {
  return (
    <View style={_styles.container}>
      {showBackBtn ? (
        <TouchableWithoutFeedback onPress={onPressBackBtn}>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
            <AntDesign name={'left'} color={anyEmpty(titleColor) ? '#ffffff' : titleColor} size={scale(25)} />
            <Text style={anyEmpty(titleColor) ? _styles.backTitle : [_styles.backTitle, { color: titleColor }]}>{backTitle}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      {renderHeader ? (
        renderHeader()
      ) : (
        <DefaultHeader
          customerTitle={customerTitle}
          customerIcon={customerIcon}
          title={title}
          titleColor={titleColor}
          showCustomerService={showCustomerService}
          onPressCustomerService={onPressCustomerService}
        />
      )}
    </View>
  )
}

const DefaultHeader = ({ title, customerTitle, customerIcon, titleColor, showCustomerService, onPressCustomerService }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={anyEmpty(titleColor) ? _styles.headerTitle : [_styles.headerTitle, { color: titleColor }]}>{title}</Text>
      </View>
      {showCustomerService ? (
        <TouchableWithoutFeedback onPress={onPressCustomerService}>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {!anyEmpty(customerIcon) ? (
              <AntDesign style={{ paddingHorizontal: scale(12) }} name={customerIcon} color={titleColor} size={scale(28)} onPress={onPressCustomerService} />
            ) : (
              <Text style={anyEmpty(titleColor) ? _styles.rightTextStyle : [_styles.rightTextStyle, { color: titleColor }]}>{customerTitle ?? '客服'}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </>
  )
}
const _styles = StyleSheet.create({
  backTitle: {
    color: '#ffffff',
    fontSize: scale(23),
    fontWeight: '500',
    marginLeft: scale(8),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
    fontWeight: '500',
  },
  rightTextStyle: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: scale(23),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default MineHeader
