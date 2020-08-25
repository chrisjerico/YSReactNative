import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import AppDefine from '../../define/AppDefine';

interface ReloadSlidingVerificationProps {
  onChange: (data: any) => void;
  containerStyle?: ViewStyle
}

const ReloadSlidingVerification = (
  { onChange, containerStyle
  }: ReloadSlidingVerificationProps,
  ref: any
) => {
  const webViewScript = `setTimeout(function() { 
    document.getElementById('app').style.background = 'transparent'
    window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); 
  }, 500);
  true;`;
  const [webviewHeight, setWebViewHeight] = useState(0)
  const hadnleMessage = (e: WebViewMessageEvent) => {
    if (typeof e?.nativeEvent?.data == 'string') {
      setWebViewHeight(parseInt(e?.nativeEvent?.data) * 1.5)
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

  return (
    <WebView
      ref={webViewRef}
      style={[{ minHeight: webviewHeight }, containerStyle]}
      javaScriptEnabled
      injectedJavaScript={webViewScript}
      startInLoadingState
      source={{ uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native` }}
      onMessage={hadnleMessage}
    />
  );
}


export default forwardRef(ReloadSlidingVerification)

  // useEffect(() => {
  //   const listener = EventRegister.addEventListener('reload', (data) => {
  //     webViewRef?.current?.reload()
  //   })
  //   return (() => EventRegister.removeEventListener(this.listener))
  // }, [])