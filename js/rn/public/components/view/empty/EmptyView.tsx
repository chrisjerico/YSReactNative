import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { scale } from '../../../tools/Scale'
import { Skin1 } from '../../../theme/UGSkinManagers'
import { UGColor } from '../../../theme/UGThemeColor'
import FastImage from 'react-native-fast-image'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'
import { anyEmpty } from '../../../tools/Ext'
import Button from '../../../views/tars/Button'
import { CapitalConst } from '../../../../pages/cpt/const/CapitalConst'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface EmptyViewProps {
  text?: string, //提示文字
  subText?: string, //二级提示文字
  imgUrl?: string, //图片链接
  buttonText?: string, //按钮
  buttonCallback?: () => void, //按钮回调
  style?: StyleProp<TextStyle>
}

/**
 * 空布局
 */
const EmptyView = ({
                     text,
                     subText,
                     imgUrl,
                     buttonText,
                     buttonCallback,
                     style,
                   }: EmptyViewProps) => {

  let textContent = !anyEmpty(text) ? text : '空空如也'

  return (
    <View style={[_styles.container, style]}>
      <FastImage source={{ uri: anyEmpty(imgUrl) ? Res.empty : imgUrl }}
                 resizeMode={'contain'}
                 style={_styles.empty_text_icon}/>
      <UGText style={_styles.empty_text_name}>{textContent}</UGText>
      {
        !anyEmpty(subText) && <UGText style={_styles.empty_sub_text_name}>{subText}</UGText>
      }
      {
        !anyEmpty(buttonText) && <Button title={buttonText ? buttonText : '确定'}
                              titleStyle={_styles.submit_text}
                              containerStyle={[_styles.submit_bt,
                                { backgroundColor: Skin1.themeColor }]}
                              onPress={buttonCallback}/>
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: scale(201),
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty_text_icon: {
    width: scale(100),
    height: scale(100),
  },
  empty_text_name: {
    color: UGColor.TextColor3,
    fontSize: scale(24),
    paddingTop: scale(24),
    textAlign: 'center',
  },
  empty_sub_text_name: {
    color: UGColor.TextColor4,
    fontSize: scale(22),
    paddingTop: scale(4),
    textAlign: 'center',
  },
  submit_text: {
    fontSize: scale(22),
    color: 'white',
  },
  submit_bt: {
    width: scale(320),
    // paddingHorizontal: scale(32),
    height: scale(66),
    borderRadius: scale(8),
    marginTop: scale(32),
  },

})

export default EmptyView
