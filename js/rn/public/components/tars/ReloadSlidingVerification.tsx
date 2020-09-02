import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import AppDefine from '../../define/AppDefine';

interface ReloadSlidingVerificationProps {
  onChange: (data: any) => void;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
}

const ReloadSlidingVerification = (
  { onChange, containerStyle, backgroundColor = 'transparent'
  }: ReloadSlidingVerificationProps,
  ref: any
) => {
  const webViewScript = `setTimeout(function() { 
    document.getElementById('app').style.background = '` + backgroundColor + `'
    window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); 
  }, 500);
  true;`;
  const [height, setHeight] = useState(0)
  const hadnleMessage = (e: WebViewMessageEvent) => {
    if (typeof e?.nativeEvent?.data == 'string') {
      setHeight(parseInt(e?.nativeEvent?.data) * 1.5)
    } else {
      onChange(e?.nativeEvent?.data)
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

  return (
    <WebView
      ref={webViewRef}
      style={[{ minHeight: height }, containerStyle]}
      containerStyle={height > 0 ? null : { opacity: 0 }}
      javaScriptEnabled
      injectedJavaScript={webViewScript}
      startInLoadingState
      source={{ uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native` }}
      onMessage={hadnleMessage}
    />
  )


}


export default forwardRef(ReloadSlidingVerification)