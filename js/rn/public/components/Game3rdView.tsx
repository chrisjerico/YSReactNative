import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View, Image, Alert } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { UGBasePageProps } from '../../pages/base/UGPage'
import { anyEmpty, arrayEmpty } from '../tools/Ext'
import { scale } from '../tools/Scale'
import { Skin1 } from '../theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../theme/UGThemeColor'
import EmptyView from './view/empty/EmptyView'
import { HomeRecommendModel, Data } from '../network/Model/HomeRecommendModel'
import APIRouter from '../network/APIRouter'
import { ugLog } from '../tools/UgLog'
import { Toast } from '../tools/ToastUtils'
import Modal from 'react-native-modal'
import RightMenu from './menu/RightMenu'
import Icon from 'react-native-vector-icons/FontAwesome'
import PushHelper from '../define/PushHelper'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import SafeAreaHeader from '../views/tars/SafeAreaHeader'
import { BZHThemeColor } from '../theme/colors/BZHThemeColor'
import BackBtnComponent from './tars/BackBtnComponent'
import { PageName } from '../navigation/Navigation'
import MineHeader from '../views/tars/MineHeader'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { navigate, pop } from '../navigation/RootNavigation'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { PayAisleListData } from '../network/Model/wd/PayAisleModel'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import UseGameHall from '../../pages/hall/new/UseGameHall'
import CommStyles from '../../pages/base/CommStyles'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import AppDefine from '../define/AppDefine'
import { ANHelper } from '../define/ANHelper/ANHelper'
import { CMD } from '../define/ANHelper/hp/CmdDefine'
import { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes'
import { Res } from '../../Res/icon/Res'

/**
 * 第三方遊戲畫面
 * @param navigation
 * @constructor
 */
const Game3rdView = ({ navigation, route }: UGBasePageProps) => {

  const { game, url } = route?.params

  const [path, setPath] = useState("")

  const webViewRef = useRef<WebView>()

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  useEffect(() => {
    if (url) {
      setPath(url)
      webViewRef.current.reload()
    }
    if (game) {
      updateData()
      return
    }
  }, [])

  const updateData = async () => {
    APIRouter.real_gotoGame(game.gameId).then(async ({ data: res }) => {
      if (res?.code == 0) {
        let params: any
        if (game.gameCode == -1) {
          ugLog('gameId=' + game.gameId)
          params = await APIRouter.encryptGetParams({
            id: game.gameId,
            game: ''
          })
        } else {
          ugLog('gameId=' + game.gameId + ", gameCode=" + game.gameCode)
          params = await APIRouter.encryptGetParams({
            id: game.gameId,
            game: game.gameCode
          })
        }
        ugLog("realGame: " + AppDefine.host + '/wjapp/api.php?c=real&a=gameUrl' + params)
        setPath(AppDefine.host + '/wjapp/api.php?c=real&a=gameUrl' + params )
        // setPath(resData)
        webViewRef.current.reload()
      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
    })
  }

  let state = {
    key: 1,
    isWebViewUrlChanged: false
  };

  let resetWebViewToInitialUrl = () => {
    if (state.isWebViewUrlChanged) {
      state.key = state.key + 1
      state.isWebViewUrlChanged = false
    }
  };

  let setWebViewUrlChanged = webviewState => {
    if (webviewState.url !== path) {
      state.isWebViewUrlChanged = true
      if (webviewState.url.includes('mobile/#/home')) 
        pop()
      if (webviewState.url.toString() == 'about:blank')  {
        ugLog("url: " + webviewState.url.toString())
        return
      }
      ugLog("setPath: " + webviewState.url.toString())
      setPath(webviewState.url)
      resetWebViewToInitialUrl()
    }
  };

  let onPress = () => {
    Alert.alert("提示讯息", "是否退出?", [
      { text: "取消", onPress: () => { } },
      { text: "确认", onPress: () => { pop(); }, }
    ])
  }

  return (
    <View style={[CommStyles.flex, {alignItems: 'flex-end'}]}>
      <TouchableOpacity
        onPress={onPress}>
        <Image style={{ width: scale(60), height: scale(70), resizeMode: 'stretch', position: 'relative', marginRight: 5, marginTop: 5 }} 
        source={{ uri: Res.back_home }} />
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        style={_styles.webview}
        key={ state.key }
        source={{ uri: path }}
        onMessage={(e: WebViewMessageEvent) => {
          ugLog("onMessage:" + e?.nativeEvent?.data)
        }}
        onNavigationStateChange={ setWebViewUrlChanged }
        // onLoadStart={(e: WebViewNavigationEvent) => {
        //   ugLog("onLoadStart:" + e)
        // }}
      />
    </View>
  )
}

const _styles = StyleSheet.create({
  webview: {
    width: '100%',
    height: '100%',
  }
})

export default Game3rdView
