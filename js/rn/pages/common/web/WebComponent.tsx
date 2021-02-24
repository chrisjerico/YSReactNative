import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import * as React from 'react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { scale } from '../../../public/tools/Scale'
import WebView from 'react-native-webview'
import * as Progress from 'react-native-progress'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import AppDefine from '../../../public/define/AppDefine'
import { ugLog } from '../../../public/tools/UgLog'
import { WebViewErrorEvent, WebViewMessageEvent, WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes'

/**
 * 彩票功能区入参
 */
interface IBetBoardParams {
  url?: string //url
  style?: StyleProp<ViewStyle>
  onMessage?: (event: WebViewMessageEvent) => void
  onLoadEnd?: (event: WebViewNavigationEvent | WebViewErrorEvent) => void;
}

/**
 * 加载网页
 *
 * @param navigation
 * @constructor
 * @param ref
 */
const WebComponent = ({ url, style, onMessage, onLoadEnd }: IBetBoardParams, ref?: any) => {

  const [progress, setProgress] = useState(0) //进度条
  const webRef = useRef(null) //webview控制

  useImperativeHandle(ref, () => ({
    injectJavaScript: (js?: string) => {
      webRef?.current?.injectJavaScript(js)
    },
  }))

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

  ugLog('web url ======', url)

  return (
    <View key={'chat content'}
          pointerEvents={'box-none'}
          style={[
            _styles.container,
            style,
          ]}>
      <WebView ref={webRef}
               javaScriptEnabled
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
               source={{ uri: url }}
               onLoadEnd={onLoadEnd}
               onMessage={onMessage}/>

      {renderProgress()}
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
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

export default forwardRef(WebComponent)
export { IBetBoardParams }
