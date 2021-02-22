import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { UGStore } from '../../redux/store/UGStore'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../theme/UGSkinManagers'
import AppDefine from '../define/AppDefine'
import { pop, push } from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { anyEmpty } from '../tools/Ext'
import { ugLog } from '../tools/UgLog'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import DropDownPicker from 'react-native-dropdown-picker';
import { scale } from '../tools/Scale'
import PushHelper from '../define/PushHelper'
import { PageName } from '../navigation/Navigation'
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
    let pjStr = url + '?' + 'from=app' + '&hideHeader=1' + '&token=' + UGUserModel.getToken();
    return pjStr;


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
    // ugLog('zzURl 链接==', zzURl);
    return zzURl;
  }
  const webUrl = name()
  // 返回首页/存款/取款/游戏大厅  
  let capitalController //类型选择
  let levelArray =
    [{ value: 0, label: '返回首页' },
    { value: 1, label: '存款' },
    { value: 2, label: '取款' },
    { value: 3, label: '游戏大厅' }];

  return (
    <View style={{ flex: 1 }}>
      {/* 下拉控件 */}
      <View style={{ zIndex: 1, height: scale(66), marginTop: 60, position: 'absolute', width: '35%', marginLeft: AppDefine.width - AppDefine.width / 3 - 1 }}>
        <DropDownPicker
          items={
            levelArray

          }
          defaultValue={0}
          containerStyle={{ height: 40, width: AppDefine.width / 3 }}
          controller={instance => capitalController = instance}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={item => {
            ugLog('item==', item);
            switch (item.value) {
              case 0:
                //首页
                ugLog('item.value',item.value)
                PushHelper.pushLinkPositionType(30)
                break;
              case 1:
                //存款
                ugLog('item.value',item.value)
                push(PageName.CapitalPage, { initTabIndex: 0 })
                break;
              case 2:
                //取款
                ugLog('item.value',item.value)
                push(PageName.CapitalPage, { initTabIndex: 1 })
                break;
              case 3:
                //游戏大厅
                ugLog('item.value',item.value)
                PushHelper.pushLinkPositionType(19)
                break;
             

              default:
                break;
            }
          }}
        />
      </View>
      <LinearGradient style={{ zIndex: 2 }} colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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
            <TouchableOpacity style={{ width: 30, position: 'absolute', left: AppDefine.width - 50 }} onPress={
              () => {
                capitalController?.toggle();
              }
            }>
              <Icon size={28} name={'bars'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <SafeAreaView forceInset={{ bottom: 'never', vertical: 'never' }} style={{ flex: 1, zIndex: 0 }}>
        <WebView
          injectedJavaScript={script}
          onMessage={(event) => {
            setTitle(event.nativeEvent.title)
          }}
          style={{ flex: 1 }} containerStyle={{ flex: 1 }} source={{ uri: webUrl }} />
      </SafeAreaView>



    </View>
  )
}
