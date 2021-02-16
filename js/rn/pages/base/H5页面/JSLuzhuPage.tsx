import React, { useEffect, useRef } from 'react';
import WebView from 'react-native-webview';
import { Platform, View } from 'react-native';
import { UGBasePageProps } from '../UGPage';
import AppDefine from '../../../public/define/AppDefine';
import { UGStore } from '../../../redux/store/UGStore';
import { pop, replace } from '../../../public/navigation/RootNavigation';
import { UGNavigationBar } from '../../../public/widget/UGNavigationBar';
import { skin1 } from '../../../public/theme/UGSkinManagers';
import PushHelper from '../../../public/define/PushHelper';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { UGUserCenterItem, UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel';


interface H5WebVars {
  canGoBack: boolean
  gameId: string
}

// H5页面 WebPgae
export const JSLuzhuPage = ({ setProps }: UGBasePageProps) => {
  const { sessid, token, username } = UGStore?.globalProps?.userInfo
  const { current: v } = useRef<H5WebVars>({ canGoBack: false, gameId: '' })
  const webview = useRef<WebView>()

  useEffect(() => {
    setProps({
      backgroundColor: '#fff',
      didFocus: async () => {
        if (Platform.OS == 'ios') {
          // 如果上一个页面是下注页，则取出其gameId
          const cnt: number = await OCHelper.call('UGNavigationController.current.viewControllers.count')
          const gameId: string = await OCHelper.call('UGNavigationController.current.viewControllers.objectAtIndex:.gameId', [cnt - 2])
          if (gameId?.length) {
            v.gameId = gameId
            setProps()
          }
        }
      }
    });
  }, [])

  return <View style={{ flex: 1 }}>
    <UGNavigationBar title='路珠' gradientColor={skin1.navBarBgColor} back onBackPress={() => {
      pop()
    }} />
    <WebView
      ref={webview}
      style={{ flex: 1, marginTop: -44 }}
      javaScriptEnabled
      onLoad={(e) => {
        v.canGoBack = e?.nativeEvent?.canGoBack
      }}
      onShouldStartLoadWithRequest={(e) => {
        console.log('onShouldStartLoadWithRequest', e?.url);
        const routers = [
          'mobile/#/login',
        ]
        for (const i in routers) {
          if (e?.url?.indexOf(routers[i]) != -1) {
            PushHelper.pushUserCenterType(UGUserCenterType.登录页)
            return false
          }
        }
        return true
      }}
      injectedJavaScriptBeforeContentLoaded={sessid?.length ? `
      function setCookie(cookieName, value, expiresTime, path) {
        expiresTime = expiresTime || "Thu, 01-Jan-2030 00:00:01 GMT";
        path = path || "/";
        document.cookie = cookieName + "=" + encodeURIComponent(value) + "; expires=" + expiresTime + "; path=" + path;
      }
      function clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
      }
      clearAllCookie();
      setCookie('loginsessid', '${sessid}');
      setCookie('logintoken', '${token}');
      setCookie('username', '${username}');
      ` : undefined}
      source={{ uri: AppDefine.host + '/mobile/#/' + 'lottery/luZhu/' + v.gameId }}
    />
  </View>
}
