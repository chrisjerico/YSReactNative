import { useDimensions } from '@react-native-community/hooks'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import React from 'react'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const MarqueePopupView = ({ content, show, onPress, onDismiss }) => {
  const { width, height } = useDimensions().screen
  if (show) {
    return (
      <View style={{
        width,
        height,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        marginBottom: 10,
      }}>
        <View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
          <View style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
            <UGText style={{ fontSize: 16, fontWeight: 'bold' }}>公告详情</UGText>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AutoHeightWebView style={{ width: width * 0.9 - 20 }} source={{ html: content }} />
          </View>
          <View style={{ height: 70, paddingBottom: 10, paddingHorizontal: 5, flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={onDismiss}>
              <View style={{
                justifyContent: 'center', alignItems: 'center',
                flex: 1, height: 50, backgroundColor: 'white',
                marginRight: 8, borderRadius: 5, borderColor: 'gray', borderWidth: 0.5,
              }}>
                <UGText>取消</UGText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center', flex: 1, height: 50, marginLeft: 8,
                backgroundColor: Skin1.themeColor, borderRadius: 5,
                borderColor: 'gray', borderWidth: 0.5,
              }}>
                <UGText style={{ color: 'white' }}>确定</UGText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

      </View>
    )
  } else {
    return null
  }

}
export default MarqueePopupView
