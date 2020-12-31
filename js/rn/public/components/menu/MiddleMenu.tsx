import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { scale } from '../../tools/Scale'
import { UGColor } from '../../theme/UGThemeColor'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, RefObject, useImperativeHandle, useState } from 'react'
import { ugLog } from '../../tools/UgLog'
import { arrayLength } from '../../tools/Ext'
import { Skin1 } from '../../theme/UGSkinManagers'
import { getBankIcon } from '../../../pages/bank/list/UseManageBankList'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../../pages/base/CommStyles'


interface IMiddleMenuItem {
  title?: string //菜单名字
  subTitle?: string // 次级名字
  icon?: string //图标地址
  id?: string //识别标识
}

interface IMiddleMenu {
  menu?: Array<IMiddleMenuItem> //菜单
  onMenuClick?: (index: number, item: IMiddleMenuItem) => void //点击了哪个菜单
}

/**
 * 中间菜单
 * @param menu
 * @param onMenuClick
 * @param ref
 * @constructor
 */
const MiddleMenu = ({ menu, onMenuClick }: IMiddleMenu, ref?: any) => {

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
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.1}>
        <View style={_styles.content}>
          <ScrollView style={_styles.sv_container}
                      showsVerticalScrollIndicator={false}>
            {
              menu?.map((item, index) =>
                <TouchableOpacity onPress={() => onMenuClick && onMenuClick(index, item)}>
                  <View style={[_styles.item_content, index != 0 ? null : { borderTopWidth: 0 }]}>
                    <FastImage source={{ uri: item.icon }}
                               resizeMode={'contain'}
                               style={_styles.bank_name_icon}/>
                    <View style={_styles.item_sub_content}>
                      <Text style={_styles.item_name}>{item.title}</Text>
                      {
                        item.subTitle && <Text
                          style={[_styles.item_sub_name, { color: Skin1.themeColor }]}>
                          {'( ' + item.subTitle + ' )'}
                        </Text>
                      }
                    </View>
                  </View>
                </TouchableOpacity>)
            }
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {},
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
  sv_container: {
    width: scale(460),
    borderRadius: scale(8),
    backgroundColor: UGColor.BackgroundColor1,
  },
  item_content: {
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderTopWidth: scale(1),
    alignItems: 'center',
    borderTopColor: UGColor.LineColor4,
    flexDirection: 'row',
  },
  item_sub_content: {
    flex: 1,
  },
  item_name: {
    color: UGColor.TextColor1,
    fontSize: scale(22),
  },
  item_sub_name: {
    color: UGColor.TextColor1,
    fontSize: scale(20),
  },
  bank_name_icon: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(16),
  },

})

export default forwardRef(MiddleMenu)
export { IMiddleMenuItem }

