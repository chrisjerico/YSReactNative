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
import WebView from 'react-native-webview'
import AppDefine from '../define/AppDefine'

/**
 * 第三方遊戲畫面
 * @param navigation
 * @constructor
 */
const Game3rdView = ({ navigation, route }: UGBasePageProps) => {

  const { game } = route?.params

  const [uri, setUri] = useState("")

  const webViewRef = useRef<WebView>()

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  useEffect(() => {
    setUri(AppDefine.host + '?c=real&a=gameUrl&id=' + game.gameId + '&game=' + game.gameCode + '&token=%s')
  }, [])
  
  return (
    <View style={CommStyles.flex}>
      <WebView
        ref={webViewRef}
        style={_styles.webview}
        javaScriptEnabled
        startInLoadingState
        source={{ uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native` }}
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
