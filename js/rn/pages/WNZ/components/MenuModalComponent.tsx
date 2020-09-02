import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FlatList, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'
import { scale } from '../../../public/tools/Scale'

interface MenuModalComponentProps {
  menus: any[];
  renderMenu: (params: RenderMenu) => any;
}

interface RenderMenu {
  item: any;
  index: number;
}

const MenuModalComponent = (
  { menus, renderMenu }: MenuModalComponentProps,
  ref: any
) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true)
    },
    close: () => {
      setVisible(false)
    }
  }))

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      style={{ width: '100%' }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false)
          }}
        >
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
          <FlatList
            keyExtractor={(item) => item?.title}
            style={{ marginTop: scale(75), backgroundColor: '#ffffff', borderRadius: scale(10), marginRight: scale(35), marginBottom: scale(100) }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={menus}
            renderItem={renderMenu}
          />
        </View>
      </View>
    </Modal>
  )
}

export default forwardRef(MenuModalComponent)
