import { Image, Text, TextInput, TouchableWithoutFeedback, View, Switch, GestureResponderEvent, Platform } from "react-native";
import * as React from "react";
import { useState } from "react";
import { skin1, Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import { Button } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
import { OCHelper } from "../../../public/define/OCHelper/OCHelper";
import { Toast } from "../../../public/tools/ToastUtils";
import { CMD } from "../../../public/define/ANHelper/hp/CmdDefine";
import { ANHelper } from "../../../public/define/ANHelper/ANHelper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { img_vueTemplate } from "../../../Res/icon";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ugLog } from "../../../public/tools/UgLog";
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface JDPromotionInfoText3CP {
  title?: string,
  content?: string,
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  onValueChange?: (value: boolean) => void,
  month_real_earn?: string,//真人
  month_earn?: string,//彩票
  onRealPress?: () => void,//真人事件
  onEarnPress?: () => void,//彩票事件

}


export const JDPromotionInfoText3CP = (props: JDPromotionInfoText3CP) => {

  const [swicthValue, setSwicthValue] = useState<boolean>(false)//控制switch

  function name(params: string) {
    let number = parseFloat(params)
    if (number == 0) {
      return '¥ ' + 0;
    }
    else {
      return '¥ ' + number;
    }
  }

  function nameColor(params: string) {
    let number = parseFloat(params)
    if (number == 0) {
      return Skin1.textColor3
    }
    else {
      return Skin1.textColor1
    }

  }


  return <View style={{
    flexDirection: 'column',
    alignItems: "center",
    paddingTop: 0,
    borderBottomColor: Skin1.textColor3,
    borderBottomWidth: 1,
  }}>
    {/* 👆的界面 */}
    <View style={{
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
      paddingTop: 0,
      width: '100%',
      height: 50,
    }}>
      <UGText style={{ fontSize: scale(24), paddingVertical: scale(20), marginLeft: scale(20), color: Skin1.textColor1 }} >{props.title}</UGText>
      <TouchableOpacity onPress={() => {
        setSwicthValue(!swicthValue)
      }} style={{ alignItems: "center", marginHorizontal: scale(20), flex: 1, flexDirection: "row", }}>
        <UGText style={{ fontSize: scale(24), color: Skin1.textColor1, textAlign: props.textAlign ? props.textAlign : 'right', }} >{name(props.content)}</UGText>
        <AntDesign name={swicthValue ? 'caretup' : 'caretdown'} color={Skin1.textColor1} size={scale(25)} style={{ marginLeft: scale(20) }} />
      </TouchableOpacity>


    </View>
    {/* 👇界面 */}
    {swicthValue && <View style={{ height: 60, alignItems: 'center', flexDirection: "row", justifyContent: 'space-between', width: '100%', }}>
      <TouchableOpacity onPress={() => {
        let number = parseFloat(props.month_earn)
        if (number == 0) {
          ugLog('不能跳彩票')
        }
        else {
          props?.onEarnPress && props?.onEarnPress()
        }
      }} style={{ borderRadius: scale(5), alignItems: "center", marginHorizontal: scale(20), height: 40, paddingHorizontal: scale(20), flexDirection: "row", backgroundColor: skin1.CLBgColor }}>
        <UGText style={{ fontSize: scale(24), color: nameColor(props.month_earn), textAlign: 'left', }} >{'彩票收益: '}</UGText>
        <UGText style={{ fontSize: scale(24), color: 'green', textAlign: 'left', }} >{name(props.month_earn)}</UGText>
        <AntDesign name={'caretright'} color={nameColor(props.month_earn)} size={scale(25)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        let number = parseFloat(props.month_real_earn)
        if (number == 0) {
          ugLog('不能跳真人')
        }
        else {
          props?.onRealPress && props?.onRealPress()
        }
      }} style={{ borderRadius: scale(5), alignItems: "center", marginHorizontal: scale(20), height: 40, paddingHorizontal: scale(20), flexDirection: "row", backgroundColor: skin1.CLBgColor }}>
        <UGText style={{ fontSize: scale(24), color: nameColor(props.month_real_earn), textAlign: 'left', }} >{'真人收益: '}</UGText>
        <UGText style={{ fontSize: scale(24), color: 'green', textAlign: 'left', }} >{name(props.month_real_earn)}</UGText>
        <AntDesign name={'caretright'} color={nameColor(props.month_real_earn)} size={scale(25)} />
      </TouchableOpacity>


    </View>}
    <View style={{ height: 8, }}></View>
  </View>

}


