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

interface EmptyViewProps {
  text?: string, //提示文字
  buttonText?: string, //按钮
  buttonCallback?: () => void, //按钮回调
  style?: StyleProp<TextStyle>
}

/**
 * 空布局
 */
const EmptyView = ({
                     text,
                     buttonText,
                     buttonCallback,
                     style,
                   }: EmptyViewProps) => {

  let textContent = !anyEmpty(text) ? text : '空空如也'

  return (
    <View style={[_styles.container, style]}>
      <FastImage source={{ uri: Res.empty }}
                 resizeMode={'contain'}
                 style={_styles.empty_text_icon}/>
      <Text style={_styles.empty_text_name}>{textContent}</Text>

      {
        buttonText && <Button title={buttonText ? buttonText : '确定'}
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
    fontSize: scale(22),
    paddingTop: scale(24),
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
