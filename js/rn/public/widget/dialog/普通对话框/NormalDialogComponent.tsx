import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewBase, ViewComponent } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useEffect } from 'react'
import { scale } from '../../../tools/Scale'
import UseNormalDialog from './UseNormalDialog'
import Icon from 'react-native-vector-icons/Fontisto'
import { Res } from '../../../../Res/icon/Res'
import FastImage from 'react-native-fast-image'
import { LotteryResultData } from '../../../network/Model/lottery/result/LotteryResultModel'
import LotteryZodiacAndBall from '../../../../pages/bet/widget/LotteryZodiacAndBall'
import * as Animatable from 'react-native-animatable'
import { UGColor } from '../../../theme/UGThemeColor'
import CommStyles from '../../../../pages/base/CommStyles'
import { NextIssueData } from '../../../network/Model/lottery/NextIssueModel'
import { AnimZoomInOut, AnimZoomOutIn } from '../../../../pages/bet/anim/BetAnim'
import { Skin1 } from '../../../theme/UGSkinManagers'
import { arrayLength } from '../../../tools/Ext'
import { number } from 'prop-types'

interface INormalDialogComponent {
  title?: string //标题
  content?: string //提示内容
  button?: INormalDialogButton[] //按钮
  customView?: () => any //自定义布局
  onClosingDialog?: () => void //窗口 关闭时 回调
}

interface INormalDialogButton {
  text?: string //标题
  highlighted?: boolean //高度显示
  clickCallback?: (button?: string) => void //窗口 是否显示 回调
}

/**
 * 对话框
 * @param menu
 * @param ref
 * @constructor
 */
const NormalDialogComponent = ({
                                 title,
                                 content,
                                 button,
                                 customView,
                                 onClosingDialog,
                               }: INormalDialogComponent, ref?: any) => {

  const {
    windowShow,
    setWindowShow,
  } = UseNormalDialog()

  //窗口关闭时回调
  useEffect(() => {
    !windowShow && onClosingDialog && onClosingDialog()
  }, [windowShow])

  /**
   * 绘制按钮
   * @param item
   * @param index
   */
  const renderButton = (item?: INormalDialogButton, index?: number) =>
    <View key={'dialog=' + item?.text + ',' + index}
          style={[
            [
              _styles.button_container,
              item?.highlighted ? { backgroundColor: Skin1.themeColor } : null,
            ],
            { width: scale(440) / arrayLength(button) },
          ]}>
      <Text style={[
        _styles.button_1,
        item?.highlighted ? { color: 'white' } : null,
      ]}>{item?.text}</Text>
    </View>

  return (
    <View style={_styles.container}>
      <Modal isVisible={true}
             onBackdropPress={() => setWindowShow(false)}
             onBackButtonPress={() => setWindowShow(false)}
             style={_styles.modal_content}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.5}>
        <View style={_styles.content}>
          <Text style={[
            _styles.title_text,
            { backgroundColor: Skin1.themeColor },
          ]}>{title ?? '提示'}</Text>
          {
            (customView && customView()) ?? <Text style={_styles.content_text}>{content}</Text>
          }
          <View style={_styles.button_parent}>
            {
              button?.map((item, index) => (renderButton(item, index)))
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: scale(480),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UGColor.BackgroundColor2,
    borderRadius: scale(16),
  },
  content_default: {
    width: '100%',
    alignItems: 'center',
  },
  title_text: {
    width: '100%',
    height: scale(56),
    color: 'white',
    fontSize: scale(26),
    fontWeight: 'bold',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: scale(16),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  content_text: {
    color: UGColor.TextColor7,
    fontSize: scale(22),
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
  },
  button_parent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(12),
  },
  button_container: {
    height: scale(56),
    borderRadius: scale(8),
    paddingHorizontal: scale(16),
    marginHorizontal: scale(4),
    borderColor: UGColor.LineColor2,
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_1: {
    color: UGColor.TextColor2,
    fontSize: scale(26),
    textAlign: 'center',
    textAlignVertical: 'center',
  },

})

export default NormalDialogComponent
export { INormalDialogButton }

