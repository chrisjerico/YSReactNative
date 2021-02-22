import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { UGStore } from '../../redux/store/UGStore'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../theme/UGSkinManagers'
import AppDefine from '../define/AppDefine'
import { pop } from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { anyEmpty } from '../tools/Ext'
import { ugLog } from '../tools/UgLog'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import DropDownPicker from 'react-native-dropdown-picker';
export const OnlineService = () => {
  const [title, setTitle] = useState<string>()
  const systemConf = UGStore.globalProps.sysConf
  const { zxkfUrl, zxkfUrl2 } = systemConf
  const script = `(function() {
    window.ReactNativeWebView.postMessage(document.title);
  })();`

  //字符串中是否包含url
  function checkUrlWithString(str_url: string) {
    var strRegex = "((https|http|ftp|rtsp|mms)?://)"
      + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";
    var re = new RegExp(strRegex);
    if (re.test(str_url)) {
      return true
    } else {
      return false
    }
  }

  //拼接URl
  function pjUrl(url: string) {
    // let pjStr = url + '?' + 'from=app' + '&hideHeader=1' + '&token=' + UGUserModel.getToken();
    // return pjStr;

    return url


  }

  //返回最后的url
  function name() {
    let zzURl: string = '';
    if (!anyEmpty(zxkfUrl && checkUrlWithString(zxkfUrl))) {
      zzURl = pjUrl(zxkfUrl)
    } else {
      if (!anyEmpty(zxkfUrl2 && checkUrlWithString(zxkfUrl2))) {
        zzURl = pjUrl(zxkfUrl2)
      } else {
        ugLog('zxkfUrl2 链接有问题==', zxkfUrl2)
        ugLog('zxkfUrl2 链接有问题==', zxkfUrl2)
      }
    }

    ugLog('zzURl 链接==', zzURl);
    return zzURl;
  }



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
            <TouchableOpacity style={{ width: 30, position: 'absolute', left: AppDefine.width -50 }} onPress={() => pop()}>
              <Icon size={28} name={'bars'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <SafeAreaView forceInset={{ bottom: 'never', vertical: 'never' }} style={{ flex: 1 }}>
        <WebView
          injectedJavaScript={script}
          onMessage={(event) => {
            setTitle(event.nativeEvent.title)
          }}
          style={{ flex: 1 }} containerStyle={{ flex: 1 }} source={{ uri: name() }} />
      </SafeAreaView>
    </View>
  )
}
