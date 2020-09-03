import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'

interface MineHeaderProps {
  showBackBtn: boolean;
  showRightTool: boolean;
  onPressLeftTool?: () => any;
  onPressRightTool?: () => any;
  title: string;
}

const MineHeader = ({ showBackBtn, onPressLeftTool, showRightTool, onPressRightTool, title }: MineHeaderProps) => {
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
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {
        showRightTool ?
          <TouchableWithoutFeedback
            onPress={onPressRightTool}
          >
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.rightTextStyle}>{'客服'}</Text>
            </View>
          </TouchableWithoutFeedback> : <View style={{ flex: 1 }} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
    fontWeight: '500'
  },
  rightTextStyle: {
    color: '#ffffff',
    fontSize: scale(22),
  }
})

export default MineHeader