import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { ViewStyle } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import AppDefine from '../../define/AppDefine'

interface ReloadSlidingVerificationProps {
  onChange: (data: any) => void;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  show?: boolean;
}

const ReloadSlidingVerification = (
  {
    onChange,
    containerStyle,
    backgroundColor = 'transparent',
    show,
  }: ReloadSlidingVerificationProps,
  ref: any
) => {
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
    if (typeof e?.nativeEvent?.data == 'string') {
      console.log("-------e?.nativeEvent?.data", e?.nativeEvent)
      setHeight(parseInt(e?.nativeEvent?.data))
    } else {
      onChange(eData)
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
