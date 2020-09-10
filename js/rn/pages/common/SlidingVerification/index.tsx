import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useState, useRef, useEffect } from "react";
import { EventRegister } from 'react-native-event-listeners'
import AppDefine from "../../../public/define/AppDefine";
import React from 'react'
const SlidingVerification = ({ onChange }: { onChange: (data: any) => void }) => {
  const webViewScript = `setTimeout(function() { 
      document.getElementById('app').style.background = 'black'
      window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); 
    }, 500);
    true;`;
  const [webviewHeight, setWebViewHeight] = useState(0)
  const hadnleMessage = (e: WebViewMessageEvent) => {
    // if (typeof e?.nativeEvent?.data == 'string') {
    //   setWebViewHeight(parseInt(e?.nativeEvent?.data) * 1.5)
    // } else {
    //   console.log("response" + JSON.stringify(e.nativeEvent.data))
    //   onChange(e?.nativeEvent?.data)
    // }
    let eData = e?.nativeEvent?.data;
    console.log("sliding response: " + eData)

    if (eData?.startsWith('{')
      && eData?.endsWith('}')) {
      onChange(JSON.parse(eData))
    } else if (typeof eData == 'string') {
      setWebViewHeight(parseInt(eData) * 1.5)
    } else {
      onChange(eData)
    }
  }
  const webViewRef = useRef<WebView>()
  useEffect(() => {
    const listener = EventRegister.addEventListener('reload', (data) => {
      webViewRef?.current?.reload()
    })
    return (() => EventRegister.removeEventListener(this.listener))
  }, [])
  return (
    <WebView
      ref={webViewRef}
      style={{ flex: 1, minHeight: webviewHeight, backgroundColor: 'black' }}
      containerStyle={{ backgroundColor: 'black' }}
      javaScriptEnabled
      injectedJavaScript={webViewScript}

      startInLoadingState
      source={{ uri: `${AppDefine.host}/dist/index.html#/swiperverify?platform=native` }}
      onMessage={hadnleMessage}
    />
  );
}
export default SlidingVerification
