import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { UGStore } from '../../redux/store/UGStore'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../theme/UGSkinManagers'
import AppDefine from '../define/AppDefine'
import { pop, popToRoot, push } from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { anyEmpty } from '../tools/Ext'
import { ugLog } from '../tools/UgLog'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import DropDownPicker from 'react-native-dropdown-picker';
import { scale } from '../tools/Scale'
import PushHelper, { UGLinkPositionType } from '../define/PushHelper'
import { PageName } from '../navigation/Navigation'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'


const levelArray = [
  { value: 0, label: '返回首页' },
  { value: 1, label: '存款' },
  { value: 2, label: '取款' },
  { value: 3, label: '游戏大厅' },
];

let guestToken;

export const OnlineService = () => {
  const [title, setTitle] = useState<string>()
  const [reload,setReload] = useState<boolean>(false)

  const systemConf = UGStore.globalProps.sysConf
  const { zxkfUrl, zxkfUrl2 } = systemConf
  const script = `(function() {
    window.ReactNativeWebView.postMessage(document.title);
  })();`

  const userToken = UGUserModel.getToken()
  const isLogin = userToken?.length

  useEffect(() => {
    // 获取试玩账号token
    if (!isLogin && !guestToken) {
      api.user.guestLogin().useSuccess(({ data }) => {
        const { "API-SID": token } = data
        ugLog('token ==', token)
        guestToken =  token;
        setReload(!reload)
      })
    }
  }, [])

 //返回最后的url
  function getWebURL() {
    let retURl: string;
    [zxkfUrl, zxkfUrl2].forEach((url) => {
      if (!anyEmpty(url && checkUrlWithString(url))) {
        //拼接URl
        const token = isLogin ? userToken : guestToken
        retURl = getRetURL(url,token);
        return
      }
    })
    if (!retURl) {
      ugLog('zxkfUrl2 链接有问题==', zxkfUrl2)
      ugLog('zxkfUrl1 链接有问题==', zxkfUrl)
    }
    ugLog('retURl 链接==', retURl)
    return retURl;
  }

  //url截取
  function getRetURL(url: string,token:string) {
    let retURl: string;
    if (!anyEmpty(url)) {
      if (checkUrlWithString(url)) {
        retURl = `${url}?from=app&hideHeader=1&token=${token}`;
      } else {
        var strArray = AppDefine.host.split('://')
        ugLog('strArray[1] ===', strArray[1])
        if (url.indexOf(strArray[1]) > 0) {
          const token = isLogin ? userToken : guestToken
          retURl = `http://${url}?from=app&hideHeader=1&token=${token}`;
        } else {
          retURl = `${AppDefine.host}/${url}?from=app&hideHeader=1&token=${token}`;
        }
      }
    }
    return retURl;
  }

  const webUrl = getWebURL()

  let capitalController //类型选择
  return (
    <View style={{ flex: 1, }}>
      {/* 下拉控件 */}
      <View style={[
        { height: scale(66), marginTop: AppDefine.safeArea.top + 5, position: 'absolute', width: '35%', marginLeft: AppDefine.width - AppDefine.width / 3 - 1 },
        Platform.OS == 'ios' ? { zIndex: 1 } : null,
      ]}>
        <DropDownPicker
          items={
            levelArray

          }
          dropDownMaxHeight={scale(260)}
          defaultValue={0}
          containerStyle={{ height: 40, width: AppDefine.width / 3 }}
          controller={instance => capitalController = instance}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={item => {
            switch (item.value) {
              case 0:
                PushHelper.pushLinkPositionType(UGLinkPositionType.返回首页)
                break;
              case 1:
                PushHelper.pushLinkPositionType(UGLinkPositionType.充值)
                break;
              case 2:
                PushHelper.pushLinkPositionType(UGLinkPositionType.提现)
                break;
              case 3:
                PushHelper.pushLinkPositionType(UGLinkPositionType.游戏大厅)
                break;
              default:
                capitalController?.toggle()
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
            <UGText style={{
              alignSelf: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              textAlign: 'center',
              fontSize: 20,
              color: Skin1.isBlack ? '#fff' : Skin1.textColor4,

            }}>{title?.length > 10 ? '在线客服' : title}</UGText>
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
      <View forceInset={{ bottom: 'never', vertical: 'never' }} style={{ flex: 1, zIndex: 0, }}>
        {(isLogin || guestToken) && <WebView
          injectedJavaScript={script}
          onMessage={(event) => {
            setTitle( anyEmpty(event.nativeEvent.title) ? '在线客服':event.nativeEvent.title)
          }}
          style={{ flex: 1, }} containerStyle={{ flex: 1, }} source={{ uri: webUrl }}
        />}
      </View>
    </View>
  )
}



//字符串中是否包含url
function checkUrlWithString(str_url: string) {
  const strRegex = "((https|http|ftp|rtsp|mms)?://)"
    + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";
  const re = new RegExp(strRegex);
  if (re.test(str_url)) {
    return true
  } else {
    return false
  }
}
