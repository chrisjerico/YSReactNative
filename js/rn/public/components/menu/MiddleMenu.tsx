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
  type?: string
}

interface IMiddleMenu {
  curId?: string //当前选中的识别标识
  menuTitle?: string //菜单标题
  menu?: Array<IMiddleMenuItem> //菜单
  showMenu?: boolean //是否直接显示菜单
  onMenuClick?: (index: number, item: IMiddleMenuItem) => void //点击了哪个菜单
  onClose?: () => void // 关闭了窗口回调
}

/**
 * 中间菜单
 */
const MiddleMenu = ({ curId, menuTitle, showMenu = false, menu, onMenuClick, onClose }: IMiddleMenu, ref?: any) => {

  const [show, setShow] = useState(showMenu)

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

  /**
   * 关闭窗口
   */
  const closeWindow = () => {
    setShow(false)
    onClose()
  }

  return (
    <View style={_styles.container}>
      <Modal isVisible={show}
             style={_styles.modal_content}
             onBackdropPress={() => closeWindow()}
             onBackButtonPress={() => closeWindow()}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.5}>
        <View style={[
          _styles.content,
          { height: (arrayLength(menu) < 12 ? arrayLength(menu) : 11) * ITEM_HEIGHT },
        ]}>
          {
            !anyEmpty(menuTitle) && <Text numberOfLines={1}
                                          style={[
                                            _styles.menu_title,
                                            { color: Skin1.themeColor },
                                          ]}>{menuTitle}</Text>
          }
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
                              item?.id == curId?.toString() ? { color: `${Skin1.themeColor}ee` } : null,
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
  content: {
    borderRadius: scale(8),
    backgroundColor: UGColor.BackgroundColor1,
  },
  sv_container: {},
  item_content: {
    height: ITEM_HEIGHT,
    minWidth: scale(360),
    maxWidth: scale(420),
    paddingHorizontal: scale(24),
    alignItems: 'center',
    borderTopWidth: scale(1),
    borderTopColor: UGColor.LineColor4,
    flexDirection: 'row',
  },
  menu_title: {
    color: UGColor.TextColor1,
    fontSize: scale(26),
    height: ITEM_HEIGHT,
    paddingHorizontal: scale(24),
    textAlignVertical: 'center',
    borderBottomWidth: scale(2),
    borderBottomColor: UGColor.LineColor4,
    fontWeight: 'bold',

  },
  item_sub_content: {},
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

