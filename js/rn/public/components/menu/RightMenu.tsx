import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { scale } from '../../tools/Scale'
import { UGColor } from '../../theme/UGThemeColor'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, RefObject, useImperativeHandle, useState } from 'react'
import { ugLog } from '../../tools/UgLog'
import { arrayLength } from '../../tools/Ext'
import { Skin1 } from '../../theme/UGSkinManagers'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface IRightMenu {
  menu?: Array<Array<string>> //菜单
  onMenuClick?: (index: number) => void //点击了哪个菜单
}

/**
 * 右侧菜单
 * @param menu
 * @param onMenuClick
 * @param ref
 * @constructor
 */
const RightMenu = ({ menu, onMenuClick }: IRightMenu, ref?: any) => {

  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => ({
    toggleMenu: () => {
      setShow(!show)
    },
  }))

  return (
    <View style={_styles.container}>
      <Modal isVisible={show}
             style={_styles.modal_content}
             onBackdropPress={() => setShow(false)}
             onBackButtonPress={() => setShow(false)}
             animationIn={'slideInRight'}
             animationOut={'slideOutRight'}
             backdropOpacity={0.1}>
        <View style={_styles.content}>
          <View style={_styles.item_container}>
            {
              menu?.map((item, index) =>
                <TouchableWithoutFeedback key={item.toString() + index}
                                          onPress={() => onMenuClick && onMenuClick(index)}>
                  <View key={item.toString() + index}
                        style={[_styles.item_content, index != 0 ? null : { borderTopWidth: 0 }]}>
                    {
                      arrayLength(item) == 2 ?
                        <View style={_styles.item_sub_content}>
                          <UGText style={_styles.item_name}>{item[0]}</UGText>
                          <UGText style={[_styles.item_name, {color: Skin1.themeColor}]}>{'( ' + item[1] + ' )'}</UGText>
                        </View> :
                        <UGText style={_styles.item_name}>{item[0]}</UGText>
                    }
                  </View>
                </TouchableWithoutFeedback>)
            }
          </View>
        </View>
      </Modal>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {},
  modal_content: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  content: {},
  item_container: {
    width: scale(180),
    borderRadius: scale(12),
    backgroundColor: UGColor.BackgroundColor1,
  },
  item_content: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(16),
    borderTopWidth: scale(1),
    alignItems: 'center',
    borderTopColor: UGColor.LineColor4,
  },
  item_sub_content: {
    alignItems: 'center',
  },
  item_name: {
    color: UGColor.TextColor1,
    fontSize: scale(22),
  },

})

export default forwardRef(RightMenu)

