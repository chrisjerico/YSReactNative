import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Platform, ViewStyle, StyleProp } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import AppDefine from '../../define/AppDefine'
import { stringToNumber } from '../../tools/tars';
import {ugLog} from "../../tools/UgLog";

interface ReloadSlidingVerificationProps {
  onChange: (data: any) => void
  containerStyle?: StyleProp<ViewStyle>
  backgroundColor?: string
  show?: boolean
}

const ReloadSlidingVerification = ({ onChange, containerStyle, backgroundColor = 'transparent', show }: ReloadSlidingVerificationProps, ref: any) => {
  const webViewScript =
    `setTimeout(function() { 
    document.getElementById('app').style.background = '` +
    backgroundColor +
    `'
    window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); 
  }, 500);
  true;`
  const [height, setHeight] = useState(0)

  const hadnleMessage = (e: WebViewMessageEvent) => {
    const data = e?.nativeEvent?.data
    switch (Platform.OS) {
      case 'ios':
        if (typeof data == 'string') {
          setHeight(stringToNumber(data))
        } else {
          onChange(data)
        }
        break
      case 'android':
        if (data?.startsWith('{') && data?.endsWith('}')) {
          onChange(JSON.parse(data))
        } else if (typeof data == 'string') {
          setHeight(stringToNumber(data) * 1.5)
        } else {
          onChange(data)
        }
    }
  }

  const webViewRef = useRef<WebView>()

  useImperativeHandle(ref, () => ({
    reload: () => {
      webViewRef?.current?.reload()
    },
  }))

  useEffect(() => {
    webViewRef?.current?.reload()
  }, [])

  if (show) {
    return (
      <WebView
        ref={webViewRef}
        style={[{ minHeight: height * 1.5 }, containerStyle]}
        containerStyle={height > 0 ? null : { opacity: 0 }}
        javaScriptEnabled
        injectedJavaScript={webViewScript}
        startInLoadingState
        source={{
          uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native`,
        }}
        onMessage={hadnleMessage}
      />
    )
  } else {
    return null
  }
}

export default forwardRef(ReloadSlidingVerification)
