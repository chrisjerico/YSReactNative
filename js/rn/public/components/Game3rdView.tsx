import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
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
import { ScrollView } from 'react-native-gesture-handler'
import UseGameHall from '../../pages/hall/new/UseGameHall'
import CommStyles from '../../pages/base/CommStyles'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import AppDefine from '../define/AppDefine'
import { ANHelper } from '../define/ANHelper/ANHelper'
import { CMD } from '../define/ANHelper/hp/CmdDefine'

/**
 * 第三方遊戲畫面
 * @param navigation
 * @constructor
 */
const Game3rdView = ({ navigation, route }: UGBasePageProps) => {

  const { game } = route?.params

  const [path, setPath] = useState("")

  const webViewRef = useRef<WebView>()

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  useEffect(() => {
    updateData()
  }, [])

  const updateData = async () => {
    let params = await APIRouter.encryptGetParams({
      id: game.gameId,
    })
    ugLog("realGame: " + AppDefine.host + '?c=real&a=gameUrl' + params)
    setPath(AppDefine.host + '?c=real&a=gameUrl' + params )
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
    }
  };


  return (
    <View style={CommStyles.flex}>
      <WebView
        ref={webViewRef}
        style={_styles.webview}
        key={ state.key }
        source={{ uri: path }}
        onMessage={(e: WebViewMessageEvent) => {
          ugLog("onMessage:" + e?.nativeEvent?.data)
        }}
        onNavigationStateChange={ setWebViewUrlChanged }
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
