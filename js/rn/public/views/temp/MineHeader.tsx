import React from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {scale} from '../../../public/tools/Scale'
import {anyEmpty} from "../../tools/Ext";

interface MineHeaderProps {
  showCustomerService?: boolean;
  onPressCustomerService?: () => any;
  customerTitle?: string;
  title?: string;
  titleColor?: string;
  renderHeader?: () => any;
  onPressBackBtn?: () => any;
  showBackBtn?: boolean;
}

const MineHeader = ({
                      showCustomerService = false,
                      onPressCustomerService,
                      customerTitle,
                      title,
                      titleColor,
                      renderHeader,
                      showBackBtn = false,
                      onPressBackBtn,
                    }: MineHeaderProps) => {
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <AntDesign
            name={'left'}
            color={anyEmpty(titleColor) ? '#ffffff' : titleColor}
            size={scale(25)}
            onPress={onPressBackBtn}
          />
        </View>
      ) : (
        <View style={{flex: 1}}/>
      )}
      {renderHeader ? (
        renderHeader()
      ) : (
        <DefaultHeader
          customerTitle={customerTitle}
          title={title}
          titleColor={titleColor}
          showCustomerService={showCustomerService}
          onPressCustomerService={onPressCustomerService}
        />
      )}
    </View>
  )
}

const DefaultHeader = ({
                         title,
                         customerTitle,
                         titleColor,
                         showCustomerService,
                         onPressCustomerService,
                       }) => {
  return (
    <>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={anyEmpty(titleColor)
          ? styles.headerTitle
          : [styles.headerTitle, {color: titleColor}]}>{title}</Text>
      </View>
      {showCustomerService ? (
        <TouchableWithoutFeedback onPress={onPressCustomerService}>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={anyEmpty(titleColor)
              ? styles.rightTextStyle
              : [styles.rightTextStyle, {color: titleColor}]}>{
              anyEmpty(customerTitle) ? '客服' : customerTitle
            }</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{flex: 1}}/>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
    fontWeight: '500',
  },
  rightTextStyle: {
    color: '#ffffff',
    fontSize: scale(22),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

export default MineHeader
