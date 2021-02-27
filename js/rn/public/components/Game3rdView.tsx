import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View, Image, Alert, SafeAreaView } from 'react-native'
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
import PlayChoiceItem from '../../pages/common/LottoBetting/PlayVIew/comm/widgets/PlayChoiceItem'

/**
 * 第三方遊戲畫面
 * @param navigation
 * @constructor
 */
const Game3rdView = ({ navigation, route }: UGBasePageProps) => {

  const { game, url } = route?.params

  const [path, setPath] = useState(url)
  const [key, setkey] = useState(1)
  const [isWebViewUrlChanged, setIsWebViewUrlChanged] = useState(false)

  const webViewRef = useRef<WebView>()

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  useEffect(() => {
    if (url) {
      return
    }
    updateData()
  }, [])

  useEffect(() => {
    webViewRef.current.reload()  
  }, [path])

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
      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
    })
  }

  let resetWebViewToInitialUrl = () => {
    ugLog("isWebViewUrlChanged: " + isWebViewUrlChanged)
    if (isWebViewUrlChanged) {
      ugLog("key: " + key)
      if (key > 5) return
      setkey(key+1)
      setIsWebViewUrlChanged(false)
    }
  };

  let setWebViewUrlChanged = webviewState => {
    if (webviewState.url !== path) {
      setIsWebViewUrlChanged(true)
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
    <View style={_styles.container}>
      <WebView
        ref={webViewRef}
        style={_styles.webview}
        key={ key }
        source={{ uri: path }}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        originWhitelist={['*']}
        onMessage={(e: WebViewMessageEvent) => {
          ugLog("onMessage:" + e?.nativeEvent?.data)
        }}
        onNavigationStateChange={ setWebViewUrlChanged }
      />
      <View style={{position: 'absolute', right: 0, top: 0, marginRight: 5, marginTop: 5}}>
        <TouchableOpacity
          onPress={onPress}>
          <Image style={{ width: scale(60), height: scale(70), resizeMode: 'stretch'}} 
          source={{ uri: Res.back_home }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: AppDefine.width,
    height: AppDefine.height,
  }
})

export default Game3rdView
