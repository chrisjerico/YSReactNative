import React, { memo } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'

interface MineHeaderProps {
  showRightTitle?: boolean
  onPressRightTitle?: () => any
  title?: string
  renderHeader?: () => any
  onPressBackBtn?: () => any
  showBackBtn?: boolean
  rightTitle?: string
  backBtnColor?: string
}

const MineHeader = ({ showRightTitle = false, onPressRightTitle, title, renderHeader, showBackBtn = false, onPressBackBtn, rightTitle, backBtnColor = '#ffffff' }: MineHeaderProps) => {
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <TouchableWithoutFeedback onPress={onPressBackBtn}>
          <View style={{ flex: 1, alignItems: 'flex-start', height: '100%', justifyContent: 'center' }}>
            <AntDesign name={'left'} color={backBtnColor} size={scale(25)} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      {renderHeader ? renderHeader() : <DefaultHeader title={title} rightTitle={rightTitle} showRightTitle={showRightTitle} onPressRightTitle={onPressRightTitle} />}
    </View>
  )
}

const DefaultHeader = ({ title, showRightTitle, onPressRightTitle, rightTitle }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {showRightTitle ? (
        <TouchableWithoutFeedback onPress={onPressRightTitle}>
          <View style={{ flex: 1, alignItems: 'flex-end', height: '100%', justifyContent: 'center' }}>
            <Text style={styles.rightTextStyle}>{rightTitle ?? '客服'}</Text>
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
    alignItems: 'center',
  },
})

export default memo(MineHeader)
