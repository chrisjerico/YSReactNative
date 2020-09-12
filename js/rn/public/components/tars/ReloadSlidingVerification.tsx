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
    // if (typeof e?.nativeEvent?.data == 'string') {
    //   setWebViewHeight(parseInt(e?.nativeEvent?.data) * 1.5)
    // } else {
    //   onChange(e?.nativeEvent?.data)
    // }
    let eData = e?.nativeEvent?.data;
    console.log("sliding response: " + eData)

    if (eData?.startsWith('{')
      && eData?.endsWith('}')) {
      onChange(JSON.parse(eData))
    } else if (typeof eData == 'string') {
      setHeight(parseInt(eData) * 1.5)
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
