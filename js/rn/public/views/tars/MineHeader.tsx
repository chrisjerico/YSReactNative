import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'

interface MineHeaderProps {
  showCustomerService?: boolean;
  onPressCustomerService?: () => any;
  title?: string;
  renderHeader?: () => any;
  onPressBackBtn?: () => any;
  showBackBtn?: boolean;
}

const MineHeader = ({
  showCustomerService = false,
  onPressCustomerService,
  title,
  renderHeader,
  showBackBtn = false,
  onPressBackBtn,
}: MineHeaderProps) => {
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <TouchableWithoutFeedback onPress={onPressBackBtn}>
          <View style={{ flex: 1, alignItems: 'flex-start', height: '100%', justifyContent: 'center' }}>
            <AntDesign
              name={'left'}
              color={'#ffffff'}
              size={scale(25)}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
          <View style={{ flex: 1 }} />
        )}
      {renderHeader ? (
        renderHeader()
      ) : (
          <DefaultHeader
            title={title}
            showCustomerService={showCustomerService}
            onPressCustomerService={onPressCustomerService}
          />
        )}
    </View>
  )
}

const DefaultHeader = ({
  title,
  showCustomerService,
  onPressCustomerService,
}) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {showCustomerService ? (
        <TouchableWithoutFeedback onPress={onPressCustomerService}>
          <View style={{ flex: 1, alignItems: 'flex-end', height: '100%', justifyContent: 'center' }}>
            <Text style={styles.rightTextStyle}>{'客服'}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
          <View style={{ flex: 1 }} />
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
