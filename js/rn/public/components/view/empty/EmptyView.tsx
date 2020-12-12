import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { scale } from '../../../tools/Scale'
import { Skin1 } from '../../../theme/UGSkinManagers'
import { UGColor } from '../../../theme/UGThemeColor'
import FastImage from 'react-native-fast-image'
import * as React from 'react'
import { Res } from '../../../../Res/icon/Res'
import { anyEmpty } from '../../../tools/Ext'

interface EmptyViewProps {
  text?: string,
  style?: StyleProp<TextStyle>
}

/**
 * 空布局
 */
const EmptyView = ({
                     text,
                     style,
                   }: EmptyViewProps) => {

  let textContent = !anyEmpty(text) ? text : '空空如也'

  return (
    <View style={[_styles.container, style]}>
      <FastImage source={{ uri: Res.empty }}
                 resizeMode={'contain'}
                 style={_styles.empty_text_icon}/>
      <Text style={_styles.empty_text_name}>{textContent}</Text>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: scale(200),
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

})

export default EmptyView
