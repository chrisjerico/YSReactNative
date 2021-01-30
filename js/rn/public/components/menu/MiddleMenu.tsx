import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { scale } from '../../tools/Scale'
import { UGColor } from '../../theme/UGThemeColor'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, RefObject, useImperativeHandle, useState } from 'react'
import { ugLog } from '../../tools/UgLog'
import { anyEmpty, arrayLength } from '../../tools/Ext'
import { Skin1 } from '../../theme/UGSkinManagers'
import { getBankIcon } from '../../../pages/bank/list/UseManageBankList'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../../pages/base/CommStyles'
import Icon from 'react-native-vector-icons/FontAwesome'


interface IMiddleMenuItem {
  title?: string //菜单名字
  subTitle?: string // 次级名字
  icon?: string //图标地址
  id?: string //识别标识
  type: string
}

interface IMiddleMenu {
  curId?: string //当前选中的识别标识
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
const MiddleMenu = ({ curId, menu, onMenuClick }: IMiddleMenu, ref?: any) => {

  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => ({
    toggleMenu: () => {
      setShow(!show)
    },
  }))

  /**
   * 绘制一个条目
   * @param item
   */
  const renderIcon = (item?: IMiddleMenuItem) => {
    const icon = item?.id == curId?.toString() ?
      <Icon size={scale(32)}
            name={'check-circle'}
            color={Skin1.themeColor}
            style={_styles.bank_name_icon2}/> :
      <Icon size={scale(32)}
            name={'circle-o'}
            style={_styles.bank_name_icon2}/>

    return (anyEmpty(item?.icon) ?
      icon :
      <FastImage source={{ uri: item.icon }}
                 resizeMode={'contain'}
                 style={_styles.bank_name_icon}/>)
  }

  return (
    <View style={_styles.container}>
      <Modal isVisible={show}
             style={_styles.modal_content}
             onBackdropPress={() => setShow(false)}
             onBackButtonPress={() => setShow(false)}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.3}>
        <View style={[
          _styles.content,
          { height: (arrayLength(menu) < 11 ? arrayLength(menu) : 10) * ITEM_HEIGHT },
        ]}>
          <ScrollView style={_styles.sv_container}
                      showsVerticalScrollIndicator={false}
                      key={'ScrollView-IMiddleMenu'}>
            {
              menu?.map((item, index) =>
                <TouchableOpacity onPress={() => onMenuClick && onMenuClick(index, item)} key={index + 'menu'}>
                  <View style={[_styles.item_content, index != 0 ? null : { borderTopWidth: 0 }]}>
                    {renderIcon(item)}
                    <View style={_styles.item_sub_content}>
                      <Text numberOfLines={1}
                            style={[
                              _styles.item_name,
                              item?.id == curId?.toString() ? {color: Skin1.themeColor} : null,
                            ]}>{item.title}</Text>
                      {
                        !anyEmpty(item.subTitle) && <Text numberOfLines={1}
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

const ITEM_HEIGHT = scale(72) //每个条目高度

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
    height: ITEM_HEIGHT,
    paddingHorizontal: scale(24),
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
    width: scale(42),
    aspectRatio: 1,
    marginRight: scale(8),
  },
  bank_name_icon2: {
    marginRight: scale(8),
  },

})

export default forwardRef(MiddleMenu)
export { IMiddleMenuItem }

