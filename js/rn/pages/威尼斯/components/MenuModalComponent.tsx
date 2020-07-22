import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import Modal from 'react-native-modal'

interface MenuModalComponentProps {
  menus: any[];
  renderMenu: () => any;
}

const MenuModalComponent = ({ menus, renderMenu }: MenuModalComponentProps, ref: any) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
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
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {
            menus?.map(renderMenu)
          }
        </View>
      </View>
    </Modal>
  )
}

export default forwardRef(MenuModalComponent)
