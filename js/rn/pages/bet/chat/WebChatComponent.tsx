import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
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
    chatUrl,
    gameTabIndex,
    userInfo,
    systemInfo,
    handleMessage,
  } = UseWebChat()

  const [progress, setProgress] = useState(0) //进度条

  /**
   * 绘制进度条
   */
  const renderProgress = () => progress < 1 && <View style={_styles.web_container}>
    <Progress.Bar progress={progress}
                  borderWidth={0}
                  borderRadius={0}
                  unfilledColor="transparent"
                  color={`${Skin1.themeColor}dd`}
                  height={scale(8)}
                  width={AppDefine.width}/>
  </View>

  return (
    <View key={'chat content'}
          pointerEvents={'box-none'}
          style={[
            _styles.container,
            style,
            gameTabIndex == GameTab.CHAT ? null : { height: 0, width: 0, opacity: 0, display: 'none' }, //非彩票界面不需要显示 下注面板
          ]}>
      <WebView javaScriptEnabled
               sharedCookiesEnabled
               thirdPartyCookiesEnabled
               domStorageEnabled
               allowFileAccess
               allowsFullscreenVideo
               allowFileAccessFromFileURLs
               mixedContentMode={'always'}
               allowsInlineMediaPlayback
               allowsLinkPreview
               allowUniversalAccessFromFileURLs
               onLoadProgress={((event) => setProgress(event?.nativeEvent?.progress))}
               source={{ uri: chatUrl }}
      onMessage={handleMessage}/>
      {renderProgress()}
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
