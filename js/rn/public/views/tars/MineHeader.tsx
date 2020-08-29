import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'

interface MineHeaderProps {
  showBackBtn: boolean;
  shoeRightTool: boolean;
  onPressLeftTool?: () => any;
  onPressRightTool?: () => any;
}

const MineHeader = ({ showBackBtn, onPressLeftTool, shoeRightTool, onPressRightTool }: MineHeaderProps) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {showBackBtn ? (
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <AntDesign
            name={'left'}
            color={'#ffffff'}
            size={scale(25)}
            onPress={onPressLeftTool}
          />
        </View>
      ) : (
          <View style={{ flex: 1 }} />
        )}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.headerTitle}>{'会员中心'}</Text>
      </View>
      {
        shoeRightTool &&
        <TouchableWithoutFeedback
          onPress={onPressRightTool}
        >
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.headerTitle}>{'客服'}</Text>
          </View>
        </TouchableWithoutFeedback>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default MineHeader