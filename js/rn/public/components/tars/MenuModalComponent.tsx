import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { scale } from '../../../public/tools/Scale'
import List from '../../../public/views/tars/List'

interface MenuModalComponentProps {
  menus: any[]
  renderMenu: (params: RenderMenu) => any
  direction?: 'right' | 'left'
  listStyle?: StyleProp<ViewStyle>
}

interface RenderMenu {
  item: any
  index: number
}

const MenuModalComponent = ({ menus, renderMenu, direction = 'right', listStyle }: MenuModalComponentProps, ref: any) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true)
    },
    close: () => {
      setVisible(false)
    },
  }))

  return (
    <Modal
      isVisible={visible}
      animationIn={direction == 'right' ? 'slideInRight' : 'slideInLeft'}
      animationOut={direction == 'right' ? 'slideOutRight' : 'slideOutLeft'}
      style={{ width: '100%', margin: 0 }}
      animationInTiming={600}
      animationOutTiming={600}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {direction == 'right' ? (
          <>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(false)
              }}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
              <List uniqueKey={'MenuModalComponent'} style={[styles.rightList, listStyle]} data={menus} renderItem={renderMenu} initialNumToRender={menus?.length} />
            </View>
          </>
        ) : (
          <>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
              <List uniqueKey={'MenuModalComponent'} style={[styles.leftList, listStyle]} data={menus} renderItem={renderMenu} initialNumToRender={menus?.length} />
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
