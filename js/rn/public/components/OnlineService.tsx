import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { UGStore } from '../../redux/store/UGStore'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../theme/UGSkinManagers'
import AppDefine from '../define/AppDefine'
import { pop } from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/AntDesign'

export const OnlineService = () => {
  const [title, setTitle] = useState<string>()
  const systemConf = UGStore.globalProps.sysConf
  const { zxkfUrl, zxkfUrl2 } = systemConf
  const script = `(function() {
    window.ReactNativeWebView.postMessage(document.title);
  })();`

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView style={{
          flexDirection: 'row',
        }}>
          <View style={{
            width: AppDefine.width,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
            <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
              <Icon size={28} name={'left'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
            </TouchableOpacity>
            <Text style={{
              alignSelf: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              textAlign: 'center',
              fontSize: 20,
              color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
            }}>{title || '在线客服'}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <SafeAreaView forceInset={{ bottom: 'never', vertical: 'never' }} style={{ flex: 1 }}>
        <WebView
          injectedJavaScript={script}
          onMessage={(event) => {
            setTitle(event.nativeEvent.title)
          }}
          style={{ flex: 1 }} containerStyle={{ flex: 1 }} source={{ uri: zxkfUrl || zxkfUrl2 || '' }} />
      </SafeAreaView>
    </View>
  )
}
