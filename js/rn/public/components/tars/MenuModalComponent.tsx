import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { scale } from '../../../public/tools/Scale'
import List from '../../../public/views/tars/List'

interface MenuModalComponentProps {
  menus?: any[]
  renderMenuItem?: (params: RenderMenuItem) => any
  direction?: 'right' | 'left' | 'bottom'
  listStyle?: StyleProp<ViewStyle>
  renderMenu?: () => any
}

interface RenderMenuItem {
  item: any
  index: number
}

const MenuModalComponent = ({ menus, direction = 'right', listStyle, renderMenu, renderMenuItem }: MenuModalComponentProps, ref: any) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true)
    },
    close: () => {
      setVisible(false)
    },
  }))

  const animationIn = (direction: 'right' | 'left' | 'bottom') => {
    switch (direction) {
      case 'right':
        return 'slideInRight'
      case 'left':
        return 'slideInLeft'
      case 'bottom':
        return 'slideInUp'
      default:
        return 'slideInUp'
    }
  }

  const animationOut = (direction: 'right' | 'left' | 'bottom') => {
    switch (direction) {
      case 'right':
        return 'slideOutRight'
      case 'left':
        return 'slideOutLeft'
      case 'bottom':
        return 'slideOutDown'
      default:
        return 'slideOutDown'
    }
  }

  return (
    <Modal
      isVisible={visible}
      animationIn={animationIn(direction)}
      animationOut={animationOut(direction)}
      style={{ width: '100%', margin: 0 }}
      animationInTiming={600}
      animationOutTiming={600}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {direction == 'right' || direction == 'bottom' ? (
          <>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(false)
              }}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
              {renderMenu ? (
                renderMenu()
              ) : (
                <List uniqueKey={'MenuModalComponent'} style={[styles.rightList, listStyle]} data={menus} renderItem={renderMenuItem} initialNumToRender={menus?.length} scrollEnabled={true} />
              )}
            </View>
          </>
        ) : (
          <>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
              {renderMenu ? (
                renderMenu()
              ) : (
                <List uniqueKey={'MenuModalComponent'} style={[styles.leftList, listStyle]} data={menus} renderItem={renderMenuItem} initialNumToRender={menus?.length} scrollEnabled={true} />
              )}
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(false)
              }}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  rightList: {
    marginTop: scale(75),
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    marginLeft: scale(35),
    marginBottom: scale(100),
  },
  leftList: {
    marginTop: scale(75),
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    marginRight: scale(35),
    marginBottom: scale(100),
  },
})

export default forwardRef(MenuModalComponent)
