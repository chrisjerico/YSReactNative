import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { scale } from '../../../public/tools/Scale'
import UseWebChat from './UseWebChat'
import WebView from 'react-native-webview'
import * as Progress from 'react-native-progress'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import AppDefine from '../../../public/define/AppDefine'
import { GameTab } from '../const/LotteryConst'
import { ugLog } from '../../../public/tools/UgLog'
import WebComponent from '../../common/web/WebComponent'

/**
 * 彩票功能区入参
 */
interface IBetBoardParams {
  locked?: boolean // 是否封盘中
  lockStr?: string // 封盘文字提醒
  style?: StyleProp<ViewStyle>
}

/**
 * 彩票下注 聊天
 *
 * @param navigation
 * @constructor
 */
const WebChatComponent = ({ locked, lockStr, style }: IBetBoardParams) => {

  const {
    sharable,
    webChatRef,
    chatUrl,
    gameTabIndex,
    userInfo,
    systemInfo,
    handleMessage,
  } = UseWebChat()

  return (
    <View key={'chat content'}
          pointerEvents={'box-none'}
          style={[
            _styles.container,
            style,
            gameTabIndex == GameTab.CHAT ? null : { height: 0, width: 0, opacity: 0, display: 'none' }, //非彩票界面不需要显示 下注面板
          ]}>
      <WebComponent ref={webChatRef}
                    url={chatUrl}
                    onMessage={handleMessage}
                    />
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  web_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

export default WebChatComponent
export { IBetBoardParams }
