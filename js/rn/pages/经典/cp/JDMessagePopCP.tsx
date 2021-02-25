import React, { useEffect, useRef, useState } from "react"
import { View, Text, ListRenderItemInfo } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppDefine from "../../../public/define/AppDefine";
import { api } from "../../../public/network/NetworkRequest1/NetworkRequest1";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { AnimationFadeView } from "../../../public/tools/animation/AnimationViews";
import { UGSignInHistoryModel } from "../../../redux/model/other/UGSignInHistoryModel";
import { Button } from 'react-native-elements';
import { hideLoading, showLoading } from "../../../public/widget/UGLoadingCP";
import { FlatList } from 'react-native-gesture-handler'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import WebView from "react-native-webview";
import { WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes";
import { ugLog } from "../../../public/tools/UgLog";

export interface JDMessagePopCP {
  showSalaryAlert?: () => void
}

interface JDSignInHistoryVars {
  show?: boolean
  name?:string //标题
  content?:string//内容
}



export const JDMessagePopCP = ({ c_ref,c_name,c_content }: { c_ref: JDMessagePopCP,c_name:string,c_content:string }) => {
  const [, setState] = useState({})
  const { current: v } = useRef<JDSignInHistoryVars>({})


  


//得到js
  function  getScript() {
    let  script:string;
    if (Skin1.isBlack||Skin1.is23) {
      script = `
      document.body.style.color='#DDD'
      document.body.style.background='#171717'
      var eles = document.getElementsByTagName('table');
      for (var i = 0; i < eles.length; i++) {
          eles[i].setAttribute("style", "border: 0.5px solid white; background:#222");
      }
      var eles = document.getElementsByTagName('td');
      for (var i = 0; i < eles.length; i++) {
          eles[i].setAttribute("style", "color:#DDD; border: 0.5px solid white; background:#222");
      }
      `
    } 
    let meta = `
    var meta = document.createElement('meta');
    meta.content='width=device-width,initial-scale=1.0,minimum-scale=.5,maximum-scale=3';
    meta.name='viewport';document.getElementsByTagName('head')[0].appendChild(meta);
    `
    let retStr =  script + meta;

    return retStr;

  }

  const script =  getScript() ;
  // 初始化
  useEffect(() => {

    c_ref &&
    (c_ref.showSalaryAlert = () =>{
        v.show = !v.show
        setState({})
    }
    )

  }, [])
  v.name = c_name;
  v.content = c_content;

  return (
    <AnimationFadeView show = {v.show}>
 <LinearGradient colors={Skin1.bgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ width: AppDefine.width - 55, height: AppDefine.height - 260, borderRadius: 10, overflow: 'hidden' }}>
        <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 50, justifyContent: 'center' }}>
          <UGText style={{ textAlign: 'center', color: Skin1.textColor2, fontSize: 16 }}>{v.name}</UGText>
        </LinearGradient>
        <View  style={{ flex: 1, }}>
        {(v.content) && <WebView
          injectedJavaScript={script}
          onMessage={(event) => {
           
          }}
          onLoadStart ={(event: WebViewNavigationEvent) => {
            ugLog('WebViewNavigationEvent =',WebViewNavigationEvent)
          }}
          style={{ flex: 1, }} containerStyle={{ flex: 1, }} source={{ html: v.content }}
        />}
      </View>
        <Button
          title="关闭"
          style={{ marginVertical: 10, marginHorizontal: 13 }}
          onPress={() => {
            v.content = undefined
            v.show = !v.show
            setState({})
          }}
        />
      </LinearGradient>
    </AnimationFadeView>
  )
}

